import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricsData } from "@shared/schema";
import { BarChart, Activity, Zap, AlertTriangle } from "lucide-react";

interface AccuracyMetricsProps {
  metrics: MetricsData;
}

// Custom animated progress bar component
const AnimatedProgressBar = ({ value, color, delay = 0 }: { value: number, color: string, delay?: number }) => (
  <div className="w-full bg-background/70 rounded-full h-3 overflow-hidden shadow-inner">
    <div 
      className={`h-3 rounded-full shine-effect animate-fadeIn`}
      style={{ 
        width: `${value}%`, 
        backgroundColor: color,
        animationDelay: `${delay}s`,
        transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}
    ></div>
  </div>
);

export default function AccuracyMetrics({ metrics }: AccuracyMetricsProps) {
  const { accuracy, confidence, speed, errorRate } = metrics;
  
  return (
    <Card className="bg-card rounded-lg border border-primary/20 border-glow animate-fadeIn">
      <CardContent className="p-4">
        <h3 className="font-bold mb-4 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.3s' }} />
          Accuracy Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Accuracy Meter */}
          <div className="bg-background/70 backdrop-blur-sm rounded-lg p-4 hover-tilt border border-primary/10 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1.5 text-primary/80" />
                <span className="text-sm font-medium text-muted-foreground">Overall Accuracy</span>
              </div>
              <span className="text-primary font-bold text-lg tracking-tight">{accuracy}%</span>
            </div>
            <AnimatedProgressBar value={accuracy} color="rgb(0, 180, 216)" delay={0.2} />
            <div className="mt-2 text-xs text-muted-foreground/80 text-right">
              {accuracy > 90 ? 'Excellent' : accuracy > 80 ? 'Good' : accuracy > 70 ? 'Average' : 'Needs improvement'}
            </div>
          </div>
          
          {/* Confidence Score */}
          <div className="bg-background/70 backdrop-blur-sm rounded-lg p-4 hover-tilt border border-primary/10 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1.5 text-accent/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4M12 8h.01"></path>
                </svg>
                <span className="text-sm font-medium text-muted-foreground">Average Confidence</span>
              </div>
              <span className="text-accent font-bold text-lg tracking-tight">{confidence}%</span>
            </div>
            <AnimatedProgressBar value={confidence} color="rgb(2, 232, 255)" delay={0.3} />
            <div className="mt-2 text-xs text-muted-foreground/80 text-right">
              Based on {Math.round(confidence / 10)} recent detections
            </div>
          </div>
          
          {/* Detection Speed */}
          <div className="bg-background/70 backdrop-blur-sm rounded-lg p-4 hover-tilt border border-primary/10 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-1.5 text-green-500/80" />
                <span className="text-sm font-medium text-muted-foreground">Detection Speed</span>
              </div>
              <span className="text-green-500 font-bold text-lg tracking-tight">{speed}ms</span>
            </div>
            <AnimatedProgressBar value={Math.min(100, 100 - (speed / 2))} color="rgb(34, 197, 94)" delay={0.4} />
            <div className="mt-2 text-xs text-muted-foreground/80 text-right">
              {speed < 100 ? 'Optimal' : speed < 150 ? 'Fast' : 'Average'} response time
            </div>
          </div>
          
          {/* Error Rate */}
          <div className="bg-background/70 backdrop-blur-sm rounded-lg p-4 hover-tilt border border-primary/10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1.5 text-destructive/80" />
                <span className="text-sm font-medium text-muted-foreground">Error Rate</span>
              </div>
              <span className="text-destructive font-bold text-lg tracking-tight">{errorRate}%</span>
            </div>
            <AnimatedProgressBar value={errorRate} color="rgb(239, 68, 68)" delay={0.5} />
            <div className="mt-2 text-xs text-muted-foreground/80 text-right">
              {errorRate < 5 ? 'Minimal errors' : errorRate < 10 ? 'Low error rate' : 'Needs calibration'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
