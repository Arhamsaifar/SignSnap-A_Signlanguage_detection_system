import { useState, useEffect } from "react";

export function useConnectionStatus() {
  const [status, setStatus] = useState("Disconnected");
  const [latency, setLatency] = useState("--");

  useEffect(() => {
    const checkBackend = async () => {
      const start = performance.now();
      try {
        const res = await fetch("http://127.0.0.1:5000/predict", {
          method: "OPTIONS"
        });
        const end = performance.now();

        if (res.status === 200 || res.status === 405) {
          setStatus("Connected");
          setLatency(`${Math.round(end - start)}ms`);
        } else {
          setStatus("Disconnected");
          setLatency("--");
        }
      } catch (err) {
        setStatus("Disconnected");
        setLatency("--");
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  return { status, latency };
}
