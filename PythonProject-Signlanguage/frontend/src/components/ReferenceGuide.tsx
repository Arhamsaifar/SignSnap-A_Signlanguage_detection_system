import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Info } from "lucide-react";

// SVG components for sign language letters
const SignLanguageSVG = ({ letter, active }: { letter: string, active: boolean }) => {
  // Basic SVG hand symbols for sign language letters
  const getHandShape = (letter: string, active: boolean) => {
    const fillColor = "#121212";
    const strokeColor = active ? "#02E8FF" : "#00B4D8";
    const strokeWidth = active ? 5 : 4;
    const glowFilter = active ? 'url(#glow)' : '';
    
    const svgBase = (content: JSX.Element) => (
      <svg viewBox="0 0 100 100" className={`w-full h-full ${active ? 'animate-float' : ''}`}>
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill={fillColor} rx="10" />
        {content}
        <text x="50" y="85" fontSize="14" fill={strokeColor} fontWeight="bold" textAnchor="middle" filter={glowFilter}>{letter}</text>
      </svg>
    );
    
    switch (letter) {
      case 'A':
        return svgBase(
          <path 
            d="M50,20 L50,70 M30,45 L70,45 M40,30 L60,30 M42,60 L58,60" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            fill="none" 
            filter={glowFilter}
          />
        );
      case 'B':
        return svgBase(
          <path 
            d="M40,20 L40,75 M40,20 L60,20 M40,40 L60,40 M40,60 L60,60 M60,20 L60,75" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            fill="none" 
            filter={glowFilter}
          />
        );
      case 'C':
        return svgBase(
          <path 
            d="M65,30 A25,25 0 1,0 65,70" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            fill="none" 
            filter={glowFilter}
          />
        );
      case 'D':
        return svgBase(
          <path 
            d="M40,20 L40,75 M40,20 L55,20 M40,75 L55,75 M55,20 C70,35 70,60 55,75" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            fill="none" 
            filter={glowFilter}
          />
        );
      case 'E':
        return svgBase(
          <path 
            d="M40,20 L40,75 M40,20 L65,20 M40,40 L60,40 M40,60 L60,60 M40,75 L65,75" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            fill="none" 
            filter={glowFilter}
          />
        );
      case 'F':
        return svgBase(
          <path 
            d="M40,20 L40,75 M40,20 L65,20 M40,40 L60,40" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            fill="none" 
            filter={glowFilter}
          />
        );
      default:
        return svgBase(
          <text 
            x="50" 
            y="50" 
            fontSize="36" 
            fill={strokeColor} 
            fontWeight="bold" 
            textAnchor="middle" 
            filter={glowFilter}
          >
            {letter}
          </text>
        );
    }
  };

  return getHandShape(letter, active);
};

export default function ReferenceGuide() {
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const signLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <Card className="bg-card rounded-lg border border-primary/20 border-glow">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.4s' }} />
          Sign Language Reference
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex items-center">
          <Info className="h-4 w-4 mr-1 text-primary/70" />
          Common hand signs recognized by the system:
        </p>
        
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
          {signLetters.map((letter) => (
            <div 
              key={letter} 
              className={`bg-background rounded-lg p-2 hover-tilt transition-all duration-300 ${activeSign === letter ? 'bg-primary/10 shadow-lg' : ''}`}
              onMouseEnter={() => setActiveSign(letter)}
              onMouseLeave={() => setActiveSign(null)}
            >
              <div className="w-full aspect-square object-cover rounded mb-2 shine-effect">
                <SignLanguageSVG letter={letter} active={activeSign === letter} />
              </div>
              <div className={`text-center text-sm font-semibold ${activeSign === letter ? 'text-accent' : 'text-primary'} transition-colors duration-300`}>
                {letter}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <a href="#" className="text-primary hover:text-accent transition-colors text-sm font-medium inline-flex items-center hover:translate-x-1 transition-transform duration-300 bg-primary/10 px-3 py-1 rounded-full">
            View Complete Reference Guide <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
