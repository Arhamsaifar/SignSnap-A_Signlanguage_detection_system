import React from 'react';
import { Play, Square } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';
import { motion } from 'framer-motion'; // NEW: Import motion

const Sidebar: React.FC = () => {
  const {
    isDetecting,
    showConfidence,
    showAccuracy,
    toggleDetection,
    toggleConfidence,
    toggleAccuracy
  } = useDetection();

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="rounded-lg shadow-lg p-6 text-white"
      style={{ backgroundColor: '#1F4959' }}
    >
      <h2 className="text-lg font-semibold mb-6">Options</h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Display Settings</h3>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-confidence"
              checked={showConfidence}
              onChange={toggleConfidence}
              className="h-4 w-4 text-[#5C7C89] bg-white rounded transition-all duration-300 hover:scale-110"
            />
            <label htmlFor="show-confidence" className="ml-2 text-gray-300">
              Show Confidence
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-accuracy"
              checked={showAccuracy}
              onChange={toggleAccuracy}
              className="h-4 w-4 text-[#5C7C89] bg-white rounded transition-all duration-300 hover:scale-110"
            />
            <label htmlFor="show-accuracy" className="ml-2 text-gray-300">
              Show Accuracy
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Actions</h3>

          <button
            onClick={toggleDetection}
            className={`flex items-center justify-center w-full py-2 px-4 rounded-md border transition-all duration-300 ${
              isDetecting
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'bg-[#5C7C89] text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isDetecting ? (
              <>
                <Square size={18} className="mr-2" />
                Stop Detection
              </>
            ) : (
              <>
                <Play size={18} className="mr-2" />
                Start Detection
              </>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
