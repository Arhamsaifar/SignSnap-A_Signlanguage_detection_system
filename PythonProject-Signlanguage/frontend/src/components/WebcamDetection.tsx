import React, { useEffect, useRef } from 'react';

interface Props {
  isDetecting: boolean;
}

const WebcamDetection: React.FC<Props> = ({ isDetecting }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDetecting) {
      startWebcam();
      intervalRef.current = setInterval(() => {
        captureAndSendFrame();
      }, 500);
    } else {
      stopWebcam();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDetecting]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureAndSendFrame = async () => {
    if (!videoRef.current || videoRef.current.videoWidth === 0) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageDataUrl }),
      });

      const data = await response.json();
      console.log('Prediction:', data); // For debugging
      // TODO: If needed, update global state here
    } catch (error) {
      console.error('Error sending frame to backend:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Camera Feed</h3>
      <div className="rounded-lg overflow-hidden aspect-square border-4 border-[#5C7C89]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default WebcamDetection;
