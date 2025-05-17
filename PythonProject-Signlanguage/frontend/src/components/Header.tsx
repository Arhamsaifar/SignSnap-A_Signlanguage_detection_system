import React from "react";
import logo from "../assets/logo.png";

import { HandHelping } from "lucide-react";

export default function Header() {
  return (
    <header className="tech-background py-6 px-4 sm:px-6 lg:px-8 border-b border-primary/30">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="flex items-center animate-float">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mr-4 shine-effect">
            <img src={logo} alt="Logo" className="w-17 h-17" />

            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-white">Sign</span>
              <span className="text-primary">Snap</span>
            </h1>
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-3xl font-bold mb-4 animate-fadeIn border-glow inline-block p-4 rounded-lg">
            AI-Powered Sign Language Detection Tool
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            Bridging communication gaps with real-time sign language detection. Perfect for designers
            and developers to integrate accessibility features into products.
          </p>
        </div>
      </div>
    </header>
  );
}