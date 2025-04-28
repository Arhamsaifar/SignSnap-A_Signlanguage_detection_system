import React from 'react';
import Header from './Header';
import Introduction from './Introduction';
import DetectionResults from './DetectionResults';
import WebcamView from './WebcamView';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion'; // NEW: for smooth fade-in

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#011425' }}>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Introduction Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Introduction />
        </motion.div>

        {/* Detection Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">

          {/* Sidebar */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-3"
          >
            <Sidebar />
          </motion.div>

          {/* Detection Outputs + Camera */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-9"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetectionResults />
              <WebcamView />
            </div>
          </motion.div>

        </div>
      </motion.main>

      {/* Footer */}
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
