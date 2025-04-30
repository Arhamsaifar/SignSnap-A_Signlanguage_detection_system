import React, { useRef, useEffect, useState } from 'react';
import { useDetection } from '../context/DetectionContext';

const WebcamView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isDetecting, setDetectionResult } = useDetection();

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current!.srcObject = stream;
      })
      .catch(err => console.error('Webcam error:', err));
  }, []);

  useEffect(() => {
    if (!isDetecting) return;

    const interval = setInterval(() => {
      if (!videoRef.current) return;

      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL('image/jpeg');

        fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image })
        })
          .then(res => res.json())
          .then(data => {
            if (data.prediction) {
              setDetectionResult({
                letter: data.prediction,
                confidence: data.confidence,
                accuracy: data.confidence // for now using same value
              });
            }
          })
          .catch(err => console.error('Prediction error:', err));
      }
    }, 1000); // Every 1 second

    return () => clearInterval(interval);
  }, [isDetecting]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Camera Feed</h3>
      <div className="rounded-lg overflow-hidden bg-gray-900 aspect-square">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-lg border-4 border-[#5C7C89]"
        />
      </div>
    </div>
  );
};

export default WebcamView;
