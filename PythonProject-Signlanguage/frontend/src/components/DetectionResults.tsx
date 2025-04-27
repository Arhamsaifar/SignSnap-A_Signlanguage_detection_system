import React from 'react';
import { useDetection } from '../context/DetectionContext';

const DetectionResults: React.FC = () => {
  const { detectionResult, showConfidence, showAccuracy, isDetecting } = useDetection();

  if (!isDetecting) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Start detection to see results here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Detected Output</h3>
          <div className="text-5xl font-bold text-center p-4 border border-gray-200 rounded-lg bg-gray-50">
            {detectionResult?.letter || "..."}
          </div>
        </div>

        {showConfidence && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Confidence</h3>
            <div className="text-2xl font-semibold p-3 border border-gray-200 rounded-lg">
              {detectionResult ? `${detectionResult.confidence.toFixed(1)}%` : "..."}
            </div>
          </div>
        )}

        {showAccuracy && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Accuracy</h3>
            <div className="text-2xl font-semibold p-3 border border-gray-200 rounded-lg">
              {detectionResult ? `${detectionResult.accuracy.toFixed(1)}%` : "..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionResults;