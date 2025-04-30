import React, { createContext, useContext, useState } from 'react';

interface DetectionContextType {
  isDetecting: boolean;
  showConfidence: boolean;
  showAccuracy: boolean;
  toggleDetection: () => void;
  toggleConfidence: () => void;
  toggleAccuracy: () => void;
}

const DetectionContext = createContext<DetectionContextType | undefined>(undefined);

export const DetectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [showConfidence, setShowConfidence] = useState(true);
  const [showAccuracy, setShowAccuracy] = useState(true);

  const toggleDetection = () => setIsDetecting(prev => !prev);
  const toggleConfidence = () => setShowConfidence(prev => !prev);
  const toggleAccuracy = () => setShowAccuracy(prev => !prev);

  return (
    <DetectionContext.Provider value={{
      isDetecting,
      showConfidence,
      showAccuracy,
      toggleDetection,
      toggleConfidence,
      toggleAccuracy
    }}>
      {children}
    </DetectionContext.Provider>
  );
};

export const useDetection = () => {
  const context = useContext(DetectionContext);
  if (!context) throw new Error("useDetection must be used inside DetectionProvider");
  return context;
};
