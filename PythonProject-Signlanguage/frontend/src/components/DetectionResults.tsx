import React from 'react';
import { useDetection } from '../context/DetectionContext';
import { motion } from 'framer-motion'; // NEW: Import motion

const DetectionResults: React.FC = () => {
  const { detectionResult, showConfidence, showAccuracy, isDetecting } = useDetection();

  if (!isDetecting) {
    return (
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1F4959] rounded-lg shadow-lg p-6 h-full flex items-center justify-center text-white"
      >
        <p className="text-center">
          Start detection to see results here
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#1F4959] rounded-lg shadow-lg p-6 h-full text-white"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-1">Detected Output</h3>
          <div className="text-5xl font-bold text-center p-4 border border-gray-200 rounded-lg bg-gray-800">
            {detectionResult?.letter || "..."}
          </div>
        </div>

        {showConfidence && (
          <div>
            <h3 className="text-sm font-medium mb-1">Confidence</h3>
            <div className="text-2xl font-semibold p-3 border border-gray-200 rounded-lg bg-gray-800">
              {detectionResult ? `${detectionResult.confidence.toFixed(1)}%` : "..."}
            </div>
          </div>
        )}

        {showAccuracy && (
          <div>
            <h3 className="text-sm font-medium mb-1">Accuracy</h3>
            <div className="text-2xl font-semibold p-3 border border-gray-200 rounded-lg bg-gray-800">
              {detectionResult ? `${detectionResult.accuracy.toFixed(1)}%` : "..."}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DetectionResults;
