import React from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { useDetection } from '../context/DetectionContext';
import { motion } from 'framer-motion'; // NEW: Import motion

const WebcamView: React.FC = () => {
  const { videoRef } = useWebcam();
  const { isDetecting } = useDetection();

  if (!isDetecting) {
    return (
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1F4959] rounded-lg shadow-lg p-6 flex items-center justify-center aspect-square text-white"
      >
        <div className="text-center">
          <p className="mb-2">Camera inactive</p>
          <p className="text-sm">Press the Start Detection button to activate</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#1F4959] rounded-lg shadow-lg p-6 text-white"
    >
      <h3 className="text-sm font-medium mb-3">Camera Feed</h3>
      <div className="rounded-lg overflow-hidden bg-gray-900 aspect-square">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-lg border-4 border-[#5C7C89]"
        />
      </div>
    </motion.div>
  );
};

export default WebcamView;
