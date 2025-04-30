import React from 'react';
import Header from './Header';
import Introduction from './Introduction';
import DetectionResults from './DetectionResults';
import WebcamDetection from './WebcamDetection';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { useDetection } from '../context/DetectionContext';

const Layout: React.FC = () => {
  const { isDetecting } = useDetection();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#011425' }}>
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Introduction />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-3"
          >
            <Sidebar />
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-9"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetectionResults />
              <WebcamDetection isDetecting={isDetecting} />
            </div>
          </motion.div>
        </div>
      </motion.main>

      <footer
        className="py-6 text-center text-gray-400 text-sm"
        style={{ backgroundColor: '#011425' }}
      >
        <p>© 2025 SignSnap | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Layout;
