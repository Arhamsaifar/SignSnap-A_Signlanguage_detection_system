// optimizedWebcam.ts - A helper to optimize webcam rendering
import { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

export function useOptimizedWebcam(webcamRef: React.RefObject<Webcam>) {
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const fpsLimit = 24; // Limit webcam to 24fps for better performance

  useEffect(() => {
    // Function to limit frame rate
    const limitFrameRate = () => {
      if (!webcamRef.current?.video) return;

      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      // Only update at specified FPS
      if (elapsed > 1000 / fpsLimit) {
        lastTimeRef.current = now;

        // Apply hardware acceleration to video element
        const videoElement = webcamRef.current.video;
        if (videoElement) {
          videoElement.style.transform = 'translateZ(0)';
          videoElement.style.backfaceVisibility = 'hidden';

          // Reduce video quality for better performance if needed
          if (navigator.userAgent.includes('Mobile')) {
            videoElement.style.objectFit = 'cover';
            videoElement.style.filter = 'contrast(1.05)'; // Slight contrast boost for efficiency
          }
        }
      }

      frameRef.current = requestAnimationFrame(limitFrameRate);
    };

    // Start the frame limiter
    frameRef.current = requestAnimationFrame(limitFrameRate);

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [webcamRef, fpsLimit]);

  // Apply more optimizations on low-end devices
  useEffect(() => {
    // Check if it's a low-end device
    const isLowEndDevice = () => {
      // Rough estimation based on hardware concurrency
      const cores = navigator.hardwareConcurrency || 4;
      return cores <= 4;
    };

    if (isLowEndDevice() && webcamRef.current?.video) {
      // Apply more aggressive optimizations
      const video = webcamRef.current.video;
      video.style.filter = 'contrast(1.05) brightness(1.02)'; // Minor quality reduction

      // Set a lower resolution for low-end devices
      const videoConstraints = {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      };

      // Update constraints if possible
      const stream = video.srcObject as MediaStream;
      if (stream) {
        const videoTracks = stream.getVideoTracks();
        if (videoTracks.length > 0) {
          try {
            videoTracks[0].applyConstraints(videoConstraints);
          } catch (e) {
            console.log('Could not apply video constraints');
          }
        }
      }
    }
  }, [webcamRef]);
}

export default useOptimizedWebcam;