import React from 'react';
import Header from './Header';
import Introduction from './Introduction';
import DetectionResults from './DetectionResults';
import WebcamView from './WebcamView';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Introduction />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetectionResults />
              <WebcamView />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2025 SignSnap | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Layout;