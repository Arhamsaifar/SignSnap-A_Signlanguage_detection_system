import React from "react";
import { useConnectionStatus } from "@/hooks/useConnectionStatus";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function ConnectionStatus() {
  const { status, latency } = useConnectionStatus();

  const isConnected = status === "Connected";

  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-primary/20 animate-fadeIn border-glow">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background/60">
          {isConnected ? (
            <CheckCircle className="text-green-500 w-6 h-6" />
          ) : (
            <XCircle className="text-red-500 w-6 h-6" />
          )}
        </div>

        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-white">API Connection</h4>
          <p className="text-sm text-muted-foreground">
            Status:{" "}
            <span
              className={`font-semibold ${
                isConnected ? "text-green-400" : "text-red-400"
              }`}
            >
              {status}
            </span>{" "}
            &nbsp;Latency:{" "}
            <span className="font-mono text-primary">{latency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}