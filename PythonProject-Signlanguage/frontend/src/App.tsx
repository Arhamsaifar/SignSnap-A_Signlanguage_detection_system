import React from 'react';
import Layout from './components/Layout';
import { DetectionProvider } from './context/DetectionContext';

function App() {
  return (
    <DetectionProvider>
      <Layout />
    </DetectionProvider>
  );
}

export default App;
