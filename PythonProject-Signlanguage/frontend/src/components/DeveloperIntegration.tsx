import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Code } from "lucide-react";

export default function DeveloperIntegration() {
  return (
    <Card className="bg-card rounded-lg border border-primary/20 border-glow">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3 flex items-center">
          <Code className="mr-2 h-5 w-5 text-primary animate-float" />
          Developer Integration
        </h3>
        <p className="text-sm text-muted-foreground mb-3">Integrate sign detection into your applications:</p>
        
        <div className="bg-background rounded p-3 font-mono text-sm text-muted-foreground overflow-x-auto mb-3 shine-effect">
          <code>
{`fetch('https://api.signsnap.ai/detect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'YOUR_API_KEY' })
})
.then(response => response.json())
.then(data => console.log(data.detection))`}
          </code>
        </div>
        
        {/* Background with tech pattern */}
        <div className="mt-4 p-3 rounded-lg tech-background animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="bg-background/80 p-3 rounded-lg hover-tilt">
            <h4 className="text-primary font-semibold text-sm mb-2">Ready for Enterprise</h4>
            <p className="text-xs text-muted-foreground">
              Connect your team's design tools with our API. Full documentation available for developers.
            </p>
            <a 
              href="#" 
              className="inline-block mt-2 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium py-1 px-3 rounded transition-colors flex items-center w-fit animate-scaleIn"
            >
              Get API Keys <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
