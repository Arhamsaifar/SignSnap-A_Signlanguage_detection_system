import React from 'react';
import WebcamDetection from './components/WebcamDetection';
import Layout from './components/Layout';
import { DetectionProvider } from './context/DetectionContext';

function App() {
  return (
    <DetectionProvider>
      <Layout />
      <WebcamDetection />
    </DetectionProvider>
  );
}

export default App;
