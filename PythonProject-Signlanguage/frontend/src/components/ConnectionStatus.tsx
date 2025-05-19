import React from "react";
import { useConnectionStatus } from "@/hooks/useConnectionStatus";
import { CheckCircle, XCircle, Wifi } from "lucide-react";

export default function ConnectionStatus() {
  const { status, latency } = useConnectionStatus();

  const isConnected = status === "Connected";

  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-primary/20 animate-fadeIn animate-pulse-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background/60 transition-all duration-300">
          {isConnected ? (
            <div className="relative">
              <CheckCircle className="text-green-500 w-6 h-6 animate-pulse-soft" />
              <div className="absolute inset-0 w-6 h-6 rounded-full bg-green-500/20 animate-ping opacity-75"></div>
            </div>
          ) : (
            <XCircle className="text-red-500 w-6 h-6 animate-pulse" />
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-white font-inter">API Connection</h4>
            <Wifi className={`w-4 h-4 ${isConnected ? 'text-green-400' : 'text-red-400'} ${isConnected ? 'animate-pulse-soft' : ''}`} />
          </div>

          <div className="flex gap-4 text-sm">
            <p className="text-muted-foreground">
              Status:{" "}
              <span
                className={`font-medium ${
                  isConnected ? "text-green-400" : "text-red-400"
                }`}
              >
                {status}
              </span>
            </p>
            <p className="text-muted-foreground">
              Latency:{" "}
              <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">{latency}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}