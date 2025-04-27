import React from 'react';
import { Play, Square, Eye } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';

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
    <aside className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-6">Options</h2>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500">Display Settings</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-confidence"
              checked={showConfidence}
              onChange={toggleConfidence}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="show-confidence" className="ml-2 text-gray-700">
              Show Confidence
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-accuracy"
              checked={showAccuracy}
              onChange={toggleAccuracy}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="show-accuracy" className="ml-2 text-gray-700">
              Show Accuracy
            </label>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500">Actions</h3>
          
          <button
            onClick={toggleDetection}
            className={`flex items-center justify-center w-full py-2 px-4 rounded-md border transition-all duration-200 ${
              isDetecting
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
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
    </aside>
  );
};

export default Sidebar;