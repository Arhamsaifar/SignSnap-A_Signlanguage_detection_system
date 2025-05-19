import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

// Performance optimization: Configure query client
queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 300000, // 5 minutes
  },
});

// Get root element
const rootElement = document.getElementById("root");

// Create and render app
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <App />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}