import React from "react";
import logo from "../assets/logo.png";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function Header() {
  return (
    <header className="exact-match-header py-6 px-4 sm:px-6 lg:px-8 border-b border-primary/30">
      <div className="container mx-auto">
        {/* Logo and Title */}
        <div className="flex justify-center items-center mb-8">
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

        {/* Main Title with Hover Effect */}
        <div className="mt-6 max-w-6xl mx-auto text-center">
          <div className="title-shadow-container h-20 sm:h-24 md:h-28 lg:h-32">
            <TextHoverEffect
              text="AI-Powered Sign Language Detection"
              className="w-full h-full"
            />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base animate-fadeIn mt-4" style={{ animationDelay: '0.3s' }}>
            Bridging communication gaps with real-time sign language detection. Perfect for designers
            and developers to integrate accessibility features into products.
          </p>
        </div>
      </div>
    </header>
  );
}