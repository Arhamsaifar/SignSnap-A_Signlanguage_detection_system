import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Activity, Zap, AlertTriangle } from "lucide-react";

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
        <h3 className="font-bold mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-primary" />
          Accuracy Metrics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Overall Accuracy */}
          <div className="bg-background/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-cyan-400" />
                <span className="text-sm font-medium">Overall Accuracy</span>
              </div>
              <span className="text-cyan-400 font-bold">{metrics.accuracy}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${metrics.accuracy}%` }}
              />
            </div>
            <div className="text-xs text-right text-gray-400">Excellent</div>
          </div>

          {/* Average Confidence */}
          <div className="bg-background/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-cyan-400" />
                <span className="text-sm font-medium">Average Confidence</span>
              </div>
              <span className="text-cyan-400 font-bold">{metrics.confidence}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${metrics.confidence}%` }}
              />
            </div>
            <div className="text-xs text-right text-gray-400">Based on {Math.floor(metrics.confidence / 10)} recent detections</div>
          </div>

          {/* Detection Speed */}
          <div className="bg-background/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-sm font-medium">Detection Speed</span>
              </div>
              <span className="text-green-400 font-bold">{metrics.speed}ms</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-green-400 transition-all duration-500"
                style={{ width: `${metrics.speed / 2}%` }}
              />
            </div>
            <div className="text-xs text-right text-gray-400">Fast response time</div>
          </div>

          {/* Error Rate */}
          <div className="bg-background/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                <span className="text-sm font-medium">Error Rate</span>
              </div>
              <span className="text-red-400 font-bold">{metrics.errorRate}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-red-400 transition-all duration-500"
                style={{ width: `${metrics.errorRate}%` }}
              />
            </div>
            <div className="text-xs text-right text-gray-400">Low error rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}