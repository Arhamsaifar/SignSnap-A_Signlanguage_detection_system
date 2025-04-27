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
    }, 500); // Every 0.5 seconds

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
      console.error('Error sending frame to backend:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '40px',
      padding: '30px',
      flexWrap: 'wrap'
    }}>

      {/* Left Side: Detection Output */}
      <div style={{
        backgroundColor: '#FFFFFF',
        color: '#011425',
        padding: '25px',
        borderRadius: '16px',
        width: '320px',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', color: '#242424' }}>Detected Output:</h2>
        <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F4959', margin: '10px 0' }}>{prediction}</p>

        <h2 style={{ fontSize: '22px', marginTop: '30px', marginBottom: '20px', color: '#242424' }}>Confidence Detected:</h2>
        <p style={{ fontSize: '28px', color: '#5C7C89', margin: '10px 0' }}>{confidence}</p>
      </div>

      {/* Right Side: Webcam */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '10px',
        borderRadius: '16px',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
        border: '4px solid #1F4959'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="420"
          height="420"
          style={{
            borderRadius: '12px',
            backgroundColor: '#FFFFFF'
          }}
        />
      </div>

    </div>
  );
};

export default WebcamDetection;
