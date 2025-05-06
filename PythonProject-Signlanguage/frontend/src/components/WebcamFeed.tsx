import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Camera, Settings, Square, Video, AlertCircle } from "lucide-react";
import { useWebcam } from "@/hooks/useWebcam";
import Webcam from "react-webcam";

interface WebcamFeedProps {
  isDetecting: boolean;
  detectedSign: string | null;
  onStart: () => void;
  onStop: () => void;
  onScreenshot: () => void;
}

export default function WebcamFeed({
  isDetecting,
  detectedSign,
  onStart,
  onStop,
  onScreenshot,
}: WebcamFeedProps) {
  const webcamRef = useRef<Webcam>(null);
  const { hasPermission, isLoading, errorMessage } = useWebcam(webcamRef);

  const handleToggleDetection = () => {
    if (isDetecting) {
      onStop();
    } else {
      onStart();
    }
  };

  const handleScreenshot = () => {
    if (webcamRef.current) {
      onScreenshot();
    }
  };

  return (
    <Card className="bg-card rounded-lg border border-primary/20 animate-fadeIn border-glow">
      <CardContent className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center">
            <Video className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.1s' }} />
            Webcam Feed
          </h3>
          {isDetecting && (
            <div className="flex items-center space-x-2 shine-effect px-3 py-1 rounded-full bg-background/30">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-custom"></div>
              <span className="text-sm text-red-400 font-semibold">LIVE</span>
            </div>
          )}
        </div>
        
        {/* Webcam Display */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 border border-primary/30 shadow-lg">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <p className="text-white bg-background/50 px-4 py-2 rounded-lg">Loading webcam...</p>
            </div>
          ) : !hasPermission ? (
            <div className="absolute inset-0 flex items-center justify-center flex-col p-4 animate-fadeIn">
              <AlertCircle className="h-12 w-12 text-destructive mb-3 animate-float" />
              <p className="text-white text-center mb-4 bg-background/80 p-3 rounded-lg">{errorMessage || "Camera access required"}</p>
              <Button 
                variant="default" 
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-accent text-white animate-scaleIn"
              >
                Grant Permission
              </Button>
            </div>
          ) : (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "user",
                  width: { min: 640, ideal: 1280 },
                  height: { min: 480, ideal: 720 },
                }}
                className="w-full h-full object-cover"
                mirrored={true}
              />
              
              {/* Detection Overlay */}
              {isDetecting && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Visual detection information */}
                  {detectedSign && (
                    <div className="absolute right-3 top-3 bg-background/80 text-primary px-3 py-2 rounded backdrop-blur-sm border border-primary/30 animate-fadeIn shadow-lg">
                      <div className="text-xs uppercase tracking-wide mb-1 text-muted-foreground">Detected Sign</div>
                      <div className="text-2xl font-bold">{detectedSign}</div>
                    </div>
                  )}
                  
                  {/* Hand tracking overlay box */}
                  <div className="absolute w-32 h-32 border-2 border-accent/70 rounded-md left-1/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-custom">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent"></div>
                  </div>
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 border border-primary/5 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20"></div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Webcam Controls */}
        <div className="flex flex-wrap gap-3 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <Button
            className={`font-bold rounded-full transition-all duration-300 flex items-center shadow-lg ${
              isDetecting
                ? "bg-destructive hover:bg-destructive/90 text-white"
                : "bg-primary hover:bg-accent text-background"
            }`}
            onClick={handleToggleDetection}
            disabled={!hasPermission}
          >
            {isDetecting ? (
              <>
                <Square className="h-4 w-4 mr-2" /> Stop Detection
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> Start Detection
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="text-white border border-primary/50 font-bold rounded-full transition-all duration-300 flex items-center hover:bg-primary/20"
            onClick={handleScreenshot}
            disabled={!hasPermission}
          >
            <Camera className="h-4 w-4 mr-2" /> Screenshot
          </Button>
          
          <Button
            variant="outline"
            className="text-white border border-primary/50 font-bold rounded-full transition-all duration-300 flex items-center hover:bg-primary/20"
          >
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </div>
        
        {/* Webcam Permission Note */}
        <div className="mt-4 text-xs text-muted-foreground text-center p-2 bg-background/50 rounded-lg animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <p>Webcam access is required for detection. Your privacy is important - no footage is stored.</p>
        </div>
      </CardContent>
    </Card>
  );
}
