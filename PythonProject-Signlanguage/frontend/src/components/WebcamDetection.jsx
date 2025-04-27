import React, { useEffect, useRef, useState } from 'react';

const WebcamDetection = () => {
  const videoRef = useRef(null);
  const [prediction, setPrediction] = useState('-');
  const [confidence, setConfidence] = useState('-');

  // Start Webcam
  useEffect(() => {
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

    startWebcam();
  }, []);

  // Capture frame and send to backend every 0.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 500); // 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageDataUrl })
      });

      const data = await response.json();
      if (data.prediction) setPrediction(data.prediction);
      if (data.confidence !== undefined) setConfidence(`${data.confidence}%`);
    } catch (error) {
      console.error('Error sending frame:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '20px' }}>
      {/* Left Side: Outputs */}
      <div style={{ backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '10px', width: '300px' }}>
        <h2>Detected Output:</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{prediction}</p>

        <h2>Confidence Detected:</h2>
        <p style={{ fontSize: '20px' }}>{confidence}</p>

        <h2>Accuracy Detected:</h2>
        <p style={{ fontSize: '20px' }}>{confidence}</p>
      </div>

      {/* Right Side: Camera */}
      <div>
        <video ref={videoRef} autoPlay playsInline muted width="400" height="400" style={{ borderRadius: '10px' }} />
      </div>
    </div>
  );
};

export default WebcamDetection;
