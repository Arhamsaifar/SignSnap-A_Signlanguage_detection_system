import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings, Eye, History, CheckCircle2, Radio, Gauge } from "lucide-react";

interface OptionsPanelProps {
  options: {
    showConfidence: boolean;
    showHistory: boolean;
    autoCorrect: boolean;
    streamToApi: boolean;
    confidenceThreshold: number;
  };
  confidenceThreshold: number;
  onOptionChange: (option: string, value: boolean) => void;
  onThresholdChange: (value: number) => void;
}

export default function OptionsPanel({
  options,
  confidenceThreshold,
  onOptionChange,
  onThresholdChange,
}: OptionsPanelProps) {
  const handleThresholdChange = (values: number[]) => {
    onThresholdChange(values[0]);
  };

  // Helper to show threshold text label
  const getThresholdLabel = (value: number) => {
    if (value >= 90) return "Very High";
    if (value >= 75) return "High";
    if (value >= 50) return "Medium";
    if (value >= 25) return "Low";
    return "Very Low";
  };

  return (
    <Card id="options-panel" className="bg-card rounded-lg border border-primary/20 border-glow animate-fadeIn">
      <CardContent className="p-4">
        <h3 className="font-bold mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
          Detection Options
        </h3>
        <div className="space-y-4">
          {/* Toggle Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background/70 backdrop-blur-sm rounded-lg p-3 border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-primary/80" />
                  <Label htmlFor="show-confidence" className="text-sm font-medium">
                    Show Confidence
                  </Label>
                </div>
                <Switch
                  id="show-confidence"
                  checked={options.showConfidence}
                  onCheckedChange={(checked) => onOptionChange("showConfidence", checked)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-6">Display confidence scores with each detection</p>
            </div>

            <div className="bg-background/70 backdrop-blur-sm rounded-lg p-3 border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <History className="h-4 w-4 mr-2 text-primary/80" />
                  <Label htmlFor="show-history" className="text-sm font-medium">
                    Show History
                  </Label>
                </div>
                <Switch
                  id="show-history"
                  checked={options.showHistory}
                  onCheckedChange={(checked) => onOptionChange("showHistory", checked)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-6">Keep and display detection history</p>
            </div>

            <div className="bg-background/70 backdrop-blur-sm rounded-lg p-3 border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-primary/80" />
                  <Label htmlFor="auto-correct" className="text-sm font-medium">
                    Auto-Correct
                  </Label>
                </div>
                <Switch
                  id="auto-correct"
                  checked={options.autoCorrect}
                  onCheckedChange={(checked) => onOptionChange("autoCorrect", checked)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-6">Apply intelligent correction to detections</p>
            </div>

            <div className="bg-background/70 backdrop-blur-sm rounded-lg p-3 border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Radio className="h-4 w-4 mr-2 text-primary/80" />
                  <Label htmlFor="stream-api" className="text-sm font-medium">
                    Stream to API
                  </Label>
                </div>
                <Switch
                  id="stream-api"
                  checked={options.streamToApi}
                  onCheckedChange={(checked) => onOptionChange("streamToApi", checked)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-6">Send detections to API endpoint</p>
            </div>
          </div>

          {/* Minimum Confidence Threshold */}
          <div className="mt-2 bg-background/70 backdrop-blur-sm rounded-lg p-4 border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Gauge className="h-4 w-4 mr-2 text-primary/80" />
                <Label className="text-sm font-medium">
                  Confidence Threshold
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{getThresholdLabel(confidenceThreshold)}</span>
                <span className="text-primary text-sm font-semibold">{confidenceThreshold}%</span>
              </div>
            </div>
            <Slider
              defaultValue={[confidenceThreshold]}
              value={[confidenceThreshold]}
              max={100}
              min={0}
              step={1}
              onValueChange={handleThresholdChange}
              className="w-full"
            />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Lower (0%)</span>
              <span>Higher (100%)</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Adjust minimum confidence level for detection results</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}