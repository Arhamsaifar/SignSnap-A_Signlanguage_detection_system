import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center py-8 px-4">
<p className="text-center text-white text-lg max-w-3xl mx-auto">
  Welcome to SignSnap —
  a next-gen real-time sign language detection system. Powered by AI and computer vision, it reads ASL hand gestures instantly and translates them into text outputs. Designed for accessibility and speed, SignSnap makes everyday communication smarter, faster, and more inclusive. With SignSnap, your gestures speak for you.
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