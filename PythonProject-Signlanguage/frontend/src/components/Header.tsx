import React from "react";
import logo from "../assets/logo.png";

import { HandHelping } from "lucide-react";

export default function Header() {
  return (
    <header className="tech-background py-6 px-4 sm:px-6 lg:px-8 border-b border-primary/30">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0 animate-float">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3 shine-effect">
            <img src={logo} alt="Logo" />

            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-white">Sign</span>
              <span className="text-primary">Snap</span>
            </h1>
          </div>
          
          <nav className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Docs
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              API
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              Support
            </a>
          </nav>
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
