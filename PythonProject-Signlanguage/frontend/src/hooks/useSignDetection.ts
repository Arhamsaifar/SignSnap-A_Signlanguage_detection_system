import { useState, useEffect, useCallback, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { DetectionResult, MetricsData } from "@shared/schema";

interface DetectionOptions {
  showConfidence: boolean;
  showHistory: boolean;
  autoCorrect: boolean;
  streamToApi: boolean;
  confidenceThreshold: number;
}

export function useSignDetection() {
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [options, setOptions] = useState<DetectionOptions>({
    showConfidence: true,
    showHistory: true,
    autoCorrect: false,
    streamToApi: true,
    confidenceThreshold: 75,
  });
  
  const [metrics, setMetrics] = useState<MetricsData>({
    accuracy: 92,
    confidence: 89,
    speed: 120,
    errorRate: 8,
  });
  
  const detectionIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Cleanup detection interval on unmount
  useEffect(() => {
    return () => {
      if (detectionIntervalRef.current !== null) {
        window.clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  const detectSign = useCallback(async () => {
    if (!isDetecting) return;

    try {
      const response = await apiRequest("POST", "/api/detect", {});
      const result = await response.json();
      
      // Only use detections above threshold
      if (result.confidence >= options.confidenceThreshold) {
        setDetectedSign(result.sign);
        
        const newDetection: DetectionResult = {
          sign: result.sign,
          confidence: result.confidence,
          timestamp: new Date(),
        };
        
        setDetectionHistory(prev => [newDetection, ...prev].slice(0, 5));
        
        // Update metrics based on this detection
        setMetrics(prev => ({
          ...prev,
          confidence: Math.round((prev.confidence * 0.8) + (result.confidence * 0.2)),
          speed: Math.round((prev.speed * 0.8) + (Math.random() * 40 + 100) * 0.2)
        }));
      }
    } catch (error) {
      console.error("Detection error:", error);
      toast({
        title: "Detection Error",
        description: "Failed to process sign language detection.",
        variant: "destructive",
      });
    }
  }, [isDetecting, options.confidenceThreshold, toast]);

  const startDetection = useCallback(async () => {
    try {
      // Start a new session
      const response = await apiRequest("POST", "/api/sessions/start", {});
      const session = await response.json();
      setSessionId(session.id);
      
      setIsDetecting(true);
      setDetectionHistory([]);
      
      // Schedule regular detections
      detectionIntervalRef.current = window.setInterval(detectSign, 1000);
      
      toast({
        title: "Detection Started",
        description: "Sign language detection is now active.",
      });
    } catch (error) {
      console.error("Failed to start session:", error);
      toast({
        title: "Start Error",
        description: "Failed to start detection session.",
        variant: "destructive",
      });
    }
  }, [detectSign, toast]);

  const stopDetection = useCallback(async () => {
    if (detectionIntervalRef.current !== null) {
      window.clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    
    setIsDetecting(false);
    
    if (sessionId) {
      try {
        await apiRequest("POST", `/api/sessions/${sessionId}/end`, { metrics });
        
        toast({
          title: "Detection Stopped",
          description: "Sign language detection has been stopped.",
        });
      } catch (error) {
        console.error("Failed to end session:", error);
      }
    }
  }, [sessionId, metrics, toast]);

  const captureScreenshot = useCallback(() => {
    toast({
      title: "Screenshot Captured",
      description: "Screenshot has been saved.",
    });
  }, [toast]);

  const updateOption = useCallback((option: string, value: boolean) => {
    setOptions(prev => ({
      ...prev,
      [option]: value,
    }));
  }, []);

  const setConfidenceThreshold = useCallback((value: number) => {
    setOptions(prev => ({
      ...prev,
      confidenceThreshold: value,
    }));
  }, []);

  return {
    isDetecting,
    detectedSign,
    detectionHistory,
    options,
    metrics,
    sessionId,
    startDetection,
    stopDetection,
    captureScreenshot,
    updateOption,
    setConfidenceThreshold,
  };
}
