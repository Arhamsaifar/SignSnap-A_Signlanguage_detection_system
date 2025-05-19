import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";

// Use lazy loading for route components
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Preload main route
const preloadHome = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = '/src/pages/Home.tsx';
  document.head.appendChild(link);
};

// Trigger preload
if (typeof window !== 'undefined') {
  // Preload after initial render
  setTimeout(preloadHome, 1000);
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-primary">Loading...</div>
    </div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return <Router />;
}

export default App;