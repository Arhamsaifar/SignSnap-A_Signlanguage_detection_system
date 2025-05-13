import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export function useWebcam(webcamRef: RefObject<Webcam>) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function requestWebcamPermission() {
      setIsLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });

        // If we got here, permission was granted
        setHasPermission(true);
        setErrorMessage(null);

        // Clean up function to stop the stream when component unmounts
        return () => {
          stream.getTracks().forEach(track => track.stop());
        };
      } catch (err) {
        console.error("Webcam access error:", err);
        setHasPermission(false);

        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setErrorMessage("Camera access denied. Please allow camera access and refresh the page.");
          } else if (err.name === "NotFoundError") {
            setErrorMessage("No camera detected. Please connect a camera and refresh the page.");
          } else {
            setErrorMessage(`Camera error: ${err.message}`);
          }
        } else {
          setErrorMessage("An unknown error occurred accessing the camera.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    requestWebcamPermission();
  }, []);

  const captureImage = (): string | null => {
    if (webcamRef.current) {
      return webcamRef.current.getScreenshot();
    }
    return null;
  };

  return {
    hasPermission,
    isLoading,
    errorMessage,
    captureImage
  };
}