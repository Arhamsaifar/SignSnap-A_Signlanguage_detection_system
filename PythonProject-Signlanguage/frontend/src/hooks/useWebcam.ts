import { useRef, useEffect } from 'react';
import { useDetection } from '../context/DetectionContext';

export const useWebcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { isDetecting, setDetectionResult } = useDetection();

  // Mock detection function (to be replaced with actual AI model)
  const mockDetection = () => {
    if (!isDetecting) return;
    
    // Simulate random ASL detection for demonstration
    const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomLetter = possibleLetters[Math.floor(Math.random() * possibleLetters.length)];
    
    setDetectionResult({
      letter: randomLetter,
      confidence: Math.random() * 100,
      accuracy: 70 + Math.random() * 30 // Random accuracy between 70-100%
    });

    // Continue detection at intervals
    setTimeout(mockDetection, 2000);
  };

  useEffect(() => {
    const startWebcam = async () => {
      try {
        if (!videoRef.current) return;
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Start mock detection after camera starts
        videoRef.current.onloadedmetadata = () => {
          mockDetection();
        };
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    const stopWebcam = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      setDetectionResult(null);
    };

    if (isDetecting) {
      startWebcam();
    } else {
      stopWebcam();
    }

    return () => {
      stopWebcam();
    };
  }, [isDetecting, setDetectionResult]);

  return { videoRef };
};