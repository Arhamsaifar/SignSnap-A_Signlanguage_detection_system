import React, { useRef, memo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Camera, Settings, Square, Video, AlertCircle, Hand } from "lucide-react";
import { useWebcam } from "@/hooks/useWebcam";
import Webcam from "react-webcam";

interface WebcamFeedProps {
  isDetecting: boolean;
  detectedSign: string | null;
  onStart: () => void;
  onStop: () => void;
  onScreenshot: () => void;
  handBox: { x: number; y: number; w: number; h: number } | null;
  handDetected?: boolean;
}

// Use React.memo to prevent unnecessary re-renders
function WebcamFeed({
  isDetecting,
  detectedSign,
  onStart,
  onStop,
  onScreenshot,
  handBox,
  handDetected = false,
}: WebcamFeedProps) {
  const webcamRef = useRef<Webcam>(null);
  const { hasPermission, isLoading, errorMessage } = useWebcam(webcamRef);

  // Use useCallback to memoize event handlers
  const handleToggleDetection = useCallback(() => {
    if (isDetecting) {
      onStop();
    } else {
      onStart();
    }
  }, [isDetecting, onStart, onStop]);

  const handleScreenshot = useCallback(() => {
    if (webcamRef.current) {
      onScreenshot();
    }
  }, [onScreenshot]);

  const scrollToOptions = useCallback(() => {
    const optionsElement = document.getElementById('options-panel');
    if (optionsElement) {
      optionsElement.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  // Memoize the handbox style to prevent recalculations
  const handBoxStyle = handBox ? {
    left: `${handBox.x}px`,
    top: `${handBox.y}px`,
    width: `${handBox.w}px`,
    height: `${handBox.h}px`,
    border: "3px solid #a020f0",
    borderRadius: "12px",
    boxShadow: "0 0 15px 3px rgba(160, 32, 240, 0.4)",
    transition: "all 0.2s ease-out",
    transform: "translateZ(0)",
    willChange: "transform",
  } : {};

  return (
    <Card className="bg-card rounded-lg border border-primary/20 animate-fadeIn border-glow">
      <CardContent className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center">
            <Video className="h-5 w-5 mr-2 text-primary animate-float" />
            Webcam Feed
          </h3>
          {isDetecting && (
            <div className="flex items-center space-x-2 shine-effect px-3 py-1 rounded-full bg-background/30">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-custom"></div>
              <span className="text-sm text-red-400 font-semibold">LIVE</span>
            </div>
          )}
        </div>

        <div
          className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 border border-primary/30 shadow-lg"
          style={{ transform: "translateZ(0)" }}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <p className="text-white bg-background/50 px-4 py-2 rounded-lg">Loading webcam...</p>
            </div>
          ) : !hasPermission ? (
            <div className="absolute inset-0 flex items-center justify-center flex-col p-4 animate-fadeIn">
              <AlertCircle className="h-12 w-12 text-destructive mb-3" />
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
                style={{ transform: "translateZ(0)" }}
              />

              {/* Center Guide Box - Larger and clearer */}
              {isDetecting && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                  <div
                    className={`w-64 h-64 rounded-xl transition-all duration-300 ${
                      handDetected
                        ? 'border-2 border-green-400 shadow-lg shadow-green-400/30'
                        : 'border-2 border-purple-500 shadow-lg shadow-purple-500/30'
                    }`}
                    style={{
                      background: handDetected
                        ? 'rgba(74, 222, 128, 0.08)'
                        : 'rgba(168, 85, 247, 0.08)',
                      backdropFilter: 'blur(0.5px)',
                    }}
                  >
                    {/* Corner indicators - more visible */}
                    <div className="relative w-full h-full">
                      {/* Top-left corner */}
                      <div className={`absolute top-0 left-0 w-8 h-8 border-l-3 border-t-3 ${
                        handDetected ? 'border-green-400' : 'border-purple-500'
                      }`} style={{ borderWidth: '3px' }}></div>
                      {/* Top-right corner */}
                      <div className={`absolute top-0 right-0 w-8 h-8 border-r-3 border-t-3 ${
                        handDetected ? 'border-green-400' : 'border-purple-500'
                      }`} style={{ borderWidth: '3px' }}></div>
                      {/* Bottom-left corner */}
                      <div className={`absolute bottom-0 left-0 w-8 h-8 border-l-3 border-b-3 ${
                        handDetected ? 'border-green-400' : 'border-purple-500'
                      }`} style={{ borderWidth: '3px' }}></div>
                      {/* Bottom-right corner */}
                      <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-3 border-b-3 ${
                        handDetected ? 'border-green-400' : 'border-purple-500'
                      }`} style={{ borderWidth: '3px' }}></div>

                      {/* Center text guidance - clearer */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                          <div className={`text-sm font-medium ${
                            handDetected ? 'text-green-300' : 'text-purple-300'
                          }`}>
                            {handDetected ? '✓ Hand Detected' : 'Position Hand Here'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hand Detection Box - Dynamic position (more prominent) */}
              {isDetecting && handBox && handDetected && (
                <div
                  className="absolute pointer-events-none z-50"
                  style={{
                    left: `${handBox.x}px`,
                    top: `${handBox.y}px`,
                    width: `${handBox.w}px`,
                    height: `${handBox.h}px`,
                    border: "3px solid #10b981",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px 4px rgba(16, 185, 129, 0.4)",
                    transition: "all 0.2s ease-out",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                >
                  {/* Active detection indicator */}
                  <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    🤖 Analyzing
                  </div>
                </div>
              )}

              {/* "Raise Your Hand" Instruction - Only show when no hand detected */}
              {isDetecting && !handDetected && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
                  <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/50 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Hand className="h-5 w-5 text-purple-400 animate-bounce" />
                      <span className="text-white font-medium text-sm">
                        👋 Raise your hand to start detection
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Success message when hand is detected */}
              {isDetecting && handDetected && detectedSign && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
                  <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/50 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-100 font-medium text-sm">
                        Detected: {detectedSign}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid overlay for better alignment */}
              {isDetecting && (
                <div className="absolute inset-0 border border-primary/5 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-10"></div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center animate-fadeIn">
          <Button
            className={`font-bold rounded-full transition-all duration-200 flex items-center shadow-lg ${
              isDetecting ? "bg-destructive hover:bg-destructive/90 text-white" : "bg-primary hover:bg-accent text-background"
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
            className="text-white border border-primary/50 font-bold rounded-full transition-all duration-200 flex items-center hover:bg-primary/20"
            onClick={handleScreenshot}
            disabled={!hasPermission}
          >
            <Camera className="h-4 w-4 mr-2" /> Screenshot
          </Button>

          <Button
            variant="outline"
            className="text-white border border-primary/50 font-bold rounded-full transition-all duration-200 flex items-center hover:bg-primary/20"
            onClick={scrollToOptions}
          >
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </div>

        <div className="mt-4 text-xs text-muted-foreground text-center p-2 bg-background/50 rounded-lg animate-fadeIn">
          <p>Webcam access is required for detection. Your privacy is important - no footage is stored.</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(WebcamFeed);