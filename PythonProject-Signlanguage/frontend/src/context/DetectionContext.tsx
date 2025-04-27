import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DetectionResult } from '../types';

interface DetectionContextType {
  isDetecting: boolean;
  showConfidence: boolean;
  showAccuracy: boolean;
  detectionResult: DetectionResult | null;
  toggleDetection: () => void;
  toggleConfidence: () => void;
  toggleAccuracy: () => void;
  setDetectionResult: (result: DetectionResult | null) => void;
}

const DetectionContext = createContext<DetectionContextType | undefined>(undefined);

export const useDetection = () => {
  const context = useContext(DetectionContext);
  if (context === undefined) {
    throw new Error('useDetection must be used within a DetectionProvider');
  }
  return context;
};

interface DetectionProviderProps {
  children: ReactNode;
}

export const DetectionProvider: React.FC<DetectionProviderProps> = ({ children }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [showConfidence, setShowConfidence] = useState(true);
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);

  const toggleDetection = () => {
    setIsDetecting(prev => !prev);
    // Reset detection result when stopping
    if (isDetecting) {
      setDetectionResult(null);
    }
  };

  const toggleConfidence = () => setShowConfidence(prev => !prev);
  const toggleAccuracy = () => setShowAccuracy(prev => !prev);

  return (
    <DetectionContext.Provider
      value={{
        isDetecting,
        showConfidence,
        showAccuracy,
        detectionResult,
        toggleDetection,
        toggleConfidence,
        toggleAccuracy,
        setDetectionResult,
      }}
    >
      {children}
    </DetectionContext.Provider>
  );
};