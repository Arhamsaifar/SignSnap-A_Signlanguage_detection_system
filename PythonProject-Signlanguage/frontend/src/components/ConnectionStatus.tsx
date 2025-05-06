import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { WifiIcon, Gauge, Server, AlertCircle, CheckCircle } from "lucide-react";

// Define the expected API status response type
type ApiStatusResponse = {
  status: string;
  latency: string;
  endpoint: string;
};

export default function ConnectionStatus() {
  // Use the defined type for the query response
  const { data, isLoading, isError } = useQuery<ApiStatusResponse>({
    queryKey: ["/api/status"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Default endpoint display value for SignSnap
  const defaultEndpoint = "api.signsnap.ai/v1";
  
  const getStatusColor = () => {
    if (isError) return "text-destructive";
    if (isLoading) return "text-yellow-400";
    return "text-green-400";
  };

  const getStatusBg = () => {
    if (isError) return "bg-destructive/10";
    if (isLoading) return "bg-yellow-400/10";
    return "bg-green-400/10";
  };

  // Get endpoint text, replacing old signtrack with signsnap
  const getEndpointText = () => {
    if (!data || !data.endpoint) return defaultEndpoint;
    return data.endpoint.replace('sign-track-api', 'signsnap-api');
  };

  return (
    <Card className="bg-card rounded-lg border border-primary/20 border-glow animate-fadeIn">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center">
            <WifiIcon className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.1s' }} />
            API Connection Status
          </h3>
          <div className={`flex items-center px-3 py-1 rounded-full ${getStatusBg()} animate-fadeIn shine-effect`}>
            {isLoading ? (
              <>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse-custom"></div>
                <span className="text-sm font-medium text-yellow-400">Connecting</span>
              </>
            ) : isError ? (
              <>
                <AlertCircle className="w-3 h-3 mr-2 text-destructive" />
                <span className="text-sm font-medium text-destructive">Disconnected</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                <span className="text-sm font-medium text-green-400">Connected</span>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-background/60 backdrop-blur-sm px-4 py-3 rounded-lg text-sm border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-1 text-xs text-muted-foreground">
              <Server className="h-3 w-3 mr-1" />
              ENDPOINT
            </div>
            <span className="font-mono text-primary font-medium">
              {getEndpointText()}
            </span>
          </div>
          
          <div className="bg-background/60 backdrop-blur-sm px-4 py-3 rounded-lg text-sm border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-1 text-xs text-muted-foreground">
              <Gauge className="h-3 w-3 mr-1" />
              LATENCY
            </div>
            <span className="font-mono text-primary font-medium">
              {data?.latency || "-- ms"}
            </span>
          </div>
          
          <div className="bg-background/60 backdrop-blur-sm px-4 py-3 rounded-lg text-sm border border-primary/10 transition-all duration-300 hover:border-primary/30 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center mb-1 text-xs text-muted-foreground">
              STATUS
            </div>
            <span className={`font-mono font-medium ${getStatusColor()}`}>
              {isError ? "ERROR" : isLoading ? "CONNECTING" : data?.status?.toUpperCase() || "HEALTHY"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
