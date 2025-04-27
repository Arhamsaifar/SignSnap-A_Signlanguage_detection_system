import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center py-8 px-4">
      <p className="text-lg mb-6">
        This real-time web app detects American Sign Language (A–Z) and numbers (0–9) using your webcam.
        It uses AI with OpenCV, TensorFlow, and CVZone to recognize hand gestures.
      </p>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
        <p className="text-yellow-800 font-medium mb-2">
          Note: Your camera will activate once you click the Start Detection button.
        </p>
        <p className="text-yellow-700">
          Click Start Detection to begin. The webcam and results will appear below. Use the sidebar to toggle confidence and accuracy metrics.
        </p>
      </div>
    </div>
  );
};

export default Introduction;