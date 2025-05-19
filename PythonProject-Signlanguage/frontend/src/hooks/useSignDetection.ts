import { useState, useEffect, useCallback, useRef } from "react";

interface DetectionResult {
  sign: string;
  confidence: number;
  timestamp: Date;
}

interface DetectionOptions {
  showConfidence: boolean;
  showHistory: boolean;
  autoCorrect: boolean;
  streamToApi: boolean;
  confidenceThreshold: number;
}

interface MetricsData {
  accuracy: number;
  confidence: number;
  speed: number;
  errorRate: number;
}

export function useSignDetection() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  const [handBox, setHandBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const [metrics, setMetrics] = useState<MetricsData>({
    accuracy: 0,
    confidence: 0,
    speed: 0,
    errorRate: 0,
  });

  const [options, setOptions] = useState<DetectionOptions>({
    showConfidence: true,
    showHistory: true,
    autoCorrect: false,
    streamToApi: true,
    confidenceThreshold: 70,
  });

  const intervalRef = useRef<number | null>(null);

  const detectSign = useCallback(async () => {
    const video = document.querySelector("video") as HTMLVideoElement | null;
    if (!video || video.readyState < 2) return;

    const start = performance.now();

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg")
    );

    if (!blob) return;

    const formData = new FormData();
    formData.append("file", blob);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      const end = performance.now();
      const speed = end - start;

      if (result.bbox) {
        setHandBox(result.bbox);
      } else {
        setHandBox(null);
      }

      setDetectedSign(result.prediction);
      setDetectionHistory((prev) => [
        {
          sign: result.prediction,
          confidence: result.confidence,
          timestamp: new Date(),
        },
        ...prev,
      ].slice(0, 5));

      setMetrics({
        accuracy: result.accuracy || 0,
        confidence: result.confidence || 0,
        speed: speed,
        errorRate: 100 - result.accuracy || 0,
      });
    } catch (error) {
      console.error("Prediction error:", error);
    }
  }, []);

  const startDetection = () => {
    if (intervalRef.current) return;
    setIsDetecting(true);
    intervalRef.current = window.setInterval(() => {
      detectSign();
    }, 800); // ✅ Restore original smooth polling
  };

  const stopDetection = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsDetecting(false);
    setDetectedSign(null);
    setHandBox(null);
    setMetrics({
      accuracy: 0,
      confidence: 0,
      speed: 0,
      errorRate: 0,
    });
  };

  const captureScreenshot = () => {
    const video = document.querySelector("video") as HTMLVideoElement | null;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.jpg";
    link.click();
  };

  const updateOption = (option: string, value: boolean) => {
    setOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  const setConfidenceThreshold = (value: number) => {
    setOptions((prev) => ({
      ...prev,
      confidenceThreshold: value,
    }));
  };

  return {
    isDetecting,
    detectedSign,
    detectionHistory,
    metrics,
    options,
    startDetection,
    stopDetection,
    captureScreenshot,
    updateOption,
    setConfidenceThreshold,
    handBox,
  };
}
