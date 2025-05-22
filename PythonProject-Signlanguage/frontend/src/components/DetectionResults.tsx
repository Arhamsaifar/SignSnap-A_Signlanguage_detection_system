import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Fingerprint, History, CheckCircle, Clock, Percent, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface DetectionResult {
  sign: string;
  confidence: number;
  timestamp: Date;
}

interface DetectionResultsProps {
  detectedSign: string | null;
  detectionHistory: DetectionResult[];
  isDetecting?: boolean;
  handDetected?: boolean; // New prop
}

export default function DetectionResults({
  detectedSign,
  detectionHistory,
  isDetecting,
  handDetected = false
}: DetectionResultsProps) {
  const handleExport = () => {
    const data = JSON.stringify(detectionHistory, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `signsnap-detection-${format(new Date(), "yyyy-MM-dd-HH-mm")}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-400";
    if (confidence >= 85) return "text-yellow-400";
    return "text-red-400";
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 95) return "bg-green-400/10";
    if (confidence >= 85) return "bg-yellow-400/10";
    return "bg-red-400/10";
  };

  const getStatusMessage = () => {
    if (!isDetecting) {
      return "WAITING FOR DETECTION";
    }
    if (!handDetected) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Hand className="h-5 w-5 text-purple-400 animate-bounce" />
          <span>👋 Raise your hand to start detection</span>
        </div>
      );
    }
    if (!detectedSign) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>🤖 Analyzing hand gesture...</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card rounded-lg border border-primary/20 flex-grow border-glow animate-fadeIn">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center">
            <Fingerprint className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.2s' }} />
            Detection Results
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="text-sm text-primary hover:text-white hover:bg-primary/80 transition-all duration-300 rounded-full border-primary/30 animate-scaleIn"
            disabled={detectionHistory.length === 0}
          >
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>

        {/* Enhanced Results Display */}
        <div className="bg-gradient-to-r from-background to-background/80 backdrop-blur-sm text-white rounded-lg p-5 mb-5 min-h-[120px] flex items-center justify-center border border-primary/30 shadow-lg shine-effect overflow-hidden">
          {detectedSign ? (
            <div className="relative animate-fadeIn flex flex-col items-center">
              {/* Success indicator */}
              <div className="absolute -top-3 -right-3 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>

              {/* Floating particles */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 h-12 w-12 bg-primary/10 rounded-full animate-pulse-custom"></div>
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-8 w-8 bg-accent/10 rounded-full animate-pulse-custom" style={{ animationDelay: '0.5s' }}></div>

              {/* Main detected sign */}
              <div className="tracking-wide text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                {detectedSign}
              </div>

              {/* Status badge */}
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-200 font-medium">Successfully Detected</span>
              </div>
            </div>
          ) : (
            <div className="tracking-wide text-center text-muted-foreground animate-pulse">
              {getStatusMessage()}
            </div>
          )}
        </div>

        {/* Performance Indicators */}
        {isDetecting && (
          <div className="grid grid-cols-2 gap-2 mb-4 animate-fadeIn">
            <div className={`bg-background/60 rounded-lg p-2 text-center border ${
              handDetected ? 'border-green-400/30 bg-green-400/5' : 'border-orange-400/30 bg-orange-400/5'
            }`}>
              <div className="text-xs text-muted-foreground">Hand Status</div>
              <div className={`text-sm font-semibold flex items-center justify-center space-x-1 ${
                handDetected ? 'text-green-400' : 'text-orange-400'
              }`}>
                <Hand className="h-3 w-3" />
                <span>{handDetected ? 'Detected' : 'Not Found'}</span>
              </div>
            </div>

            <div className={`bg-background/60 rounded-lg p-2 text-center border ${
              detectedSign ? 'border-blue-400/30 bg-blue-400/5' : 'border-gray-400/30 bg-gray-400/5'
            }`}>
              <div className="text-xs text-muted-foreground">Recognition</div>
              <div className={`text-sm font-semibold flex items-center justify-center space-x-1 ${
                detectedSign ? 'text-blue-400' : 'text-gray-400'
              }`}>
                <Fingerprint className="h-3 w-3" />
                <span>{detectedSign ? 'Active' : 'Waiting'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Detection History */}
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center">
            <History className="h-4 w-4 mr-1.5" />
            Recent Detections:
          </h4>

          {detectionHistory.length === 0 ? (
            <div className="bg-background/60 rounded-lg p-3 text-center text-sm text-muted-foreground border border-primary/10 animate-fadeIn">
              {isDetecting ? "Waiting for hand gestures..." : "No detections yet. Start detection to see results."}
            </div>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {detectionHistory.map((detection, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-3 flex justify-between text-sm border border-primary/10 transition-all hover:border-primary/30 ${
                    index === 0 ? 'bg-primary/5 ring-1 ring-primary/20' : 'bg-background/60'
                  }`}
                  style={{
                    animationDelay: `${0.1 * index}s`,
                    opacity: 1 - (index * 0.15)
                  }}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center mr-2 border ${
                      index === 0 ? 'border-primary/40 bg-primary/10' : 'border-primary/20'
                    }`}>
                      <span className="text-primary font-bold text-xs">{detection.sign}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{detection.sign}</span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        {format(new Date(detection.timestamp), "HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getConfidenceBg(detection.confidence)}`}>
                    <Percent className="h-3 w-3 mr-1" />
                    <span className={getConfidenceColor(detection.confidence)}>
                      {detection.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}