import React from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { useDetection } from '../context/DetectionContext';

const WebcamView: React.FC = () => {
  const { videoRef } = useWebcam();
  const { isDetecting } = useDetection();

  if (!isDetecting) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center aspect-square">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Camera inactive</p>
          <p className="text-sm text-gray-400">Press the Start Detection button to activate</p>
        </div>
      </div>
    );
  }

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
