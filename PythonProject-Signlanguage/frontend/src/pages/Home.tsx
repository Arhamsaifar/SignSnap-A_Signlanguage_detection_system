import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConnectionStatus from "@/components/ConnectionStatus";
import DetectionResults from "@/components/DetectionResults";
import AccuracyMetrics from "@/components/AccuracyMetrics";
import OptionsPanel from "@/components/OptionsPanel";
import WebcamFeed from "@/components/WebcamFeed";
import ReferenceGuide from "@/components/ReferenceGuide";
import DeveloperIntegration from "@/components/DeveloperIntegration";
import { useSignDetection } from "@/hooks/useSignDetection";

export default function Home() {
  const {
    detectedSign,
    detectionHistory,
    isDetecting,
    metrics,
    options,
    sessionId,
    startDetection,
    stopDetection,
    captureScreenshot,
    updateOption,
    setConfidenceThreshold,
  } = useSignDetection();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Results and Controls */}
          <div className="flex flex-col space-y-6">
            <ConnectionStatus />
            
            <DetectionResults 
              detectedSign={detectedSign} 
              detectionHistory={detectionHistory} 
            />
            
            <AccuracyMetrics metrics={metrics} />
            
            <OptionsPanel 
              options={options} 
              confidenceThreshold={options.confidenceThreshold} 
              onOptionChange={updateOption}
              onThresholdChange={setConfidenceThreshold}
            />
          </div>
          
          {/* Right Column: Webcam and Reference */}
          <div className="flex flex-col space-y-6">
            <WebcamFeed 
              isDetecting={isDetecting}
              detectedSign={detectedSign}
              onStart={startDetection}
              onStop={stopDetection}
              onScreenshot={captureScreenshot}
            />
            
            <ReferenceGuide />
            
            <DeveloperIntegration />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
