import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AccuracyMetricsProps {
  metrics: {
    accuracy: number;
    confidence: number;
    speed: number;
    errorRate: number;
  };
}

export default function AccuracyMetrics({ metrics }: AccuracyMetricsProps) {
  return (
    <Card className="bg-card border border-primary/20 animate-fadeIn border-glow">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-4 text-primary">Accuracy Metrics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Overall Accuracy</p>
            <p className="font-bold text-foreground">{metrics.accuracy}%</p>
            <div className="h-2 mt-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${metrics.accuracy}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-muted-foreground">Average Confidence</p>
            <p className="font-bold text-foreground">{metrics.confidence}%</p>
            <div className="h-2 mt-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${metrics.confidence}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-muted-foreground">Detection Speed</p>
            <p className="font-bold text-green-400">{metrics.speed}ms</p>
          </div>

          <div>
            <p className="text-muted-foreground">Error Rate</p>
            <p className="font-bold text-red-400">{metrics.errorRate}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
