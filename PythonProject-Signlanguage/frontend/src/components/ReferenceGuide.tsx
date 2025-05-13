import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Info,
  X,
  Search,
  PanelLeftOpen,
  Keyboard,
  TabletSmartphone
} from "lucide-react";

// Component for sign language letters and numbers (all PNG images)
const SignLanguageDisplay = ({ sign, active }: { sign: string, active: boolean }) => {
  return (
    <div className={`w-full h-full flex justify-center items-center ${active ? 'animate-float' : ''}`}>
      <div className="bg-[#121212] w-full h-full rounded-lg flex flex-col justify-center items-center">
        <img
          src={`/images/${sign}.png`}
          alt={`Sign language ${sign}`}
          className={`w-4/5 h-4/5 object-contain ${active ? 'border-2 border-[#02E8FF]' : ''}`}
        />
        <span className={`text-sm font-bold mt-1 ${active ? 'text-[#02E8FF]' : 'text-[#00B4D8]'}`}>

        </span>
      </div>
    </div>
  );
};

// Modal Dialog for the complete reference guide
const ReferenceModal = ({
  isOpen,
  onClose,
  activeSign,
  setActiveSign
}: {
  isOpen: boolean;
  onClose: () => void;
  activeSign: string | null;
  setActiveSign: (sign: string | null) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'letters' | 'numbers'>('letters');

  // All alphabet letters
  const allLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  // All numbers
  const allNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-card rounded-lg border border-primary/30 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn"
        style={{ boxShadow: '0 0 15px rgba(0,180,216,0.3), 0 0 30px rgba(0,180,216,0.1)' }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-bold text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Complete Sign Language Reference
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-destructive/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-destructive" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border p-2 flex gap-2">
          <button
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'letters'
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-background/80 text-muted-foreground'
            }`}
            onClick={() => setActiveTab('letters')}
          >
            <Keyboard className="h-4 w-4 mr-2" />
            Alphabet (A-Z)
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'numbers'
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-background/80 text-muted-foreground'
            }`}
            onClick={() => setActiveTab('numbers')}
          >
            <TabletSmartphone className="h-4 w-4 mr-2" />
            Numbers (0-9)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-grow">
          {/* Explanatory text */}
          <p className="text-sm text-muted-foreground mb-4">
            These hand signs represent the complete American Sign Language alphabet and number system recognized by SignSnap.
            Hover over any sign to see details and practice.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
            {(activeTab === 'letters' ? allLetters : allNumbers).map((sign) => (
              <div
                key={sign}
                className={`bg-background rounded-lg p-3 hover:scale-105 transition-all duration-300
                  ${activeSign === sign ? 'bg-primary/20 shadow-lg ring-2 ring-primary/50' : 'hover:bg-background/90'}
                  border border-primary/20 hover:border-primary/50
                `}
                onMouseEnter={() => setActiveSign(sign)}
                onMouseLeave={() => setActiveSign(null)}
              >
                <div className="w-full aspect-square object-cover rounded-lg mb-2 shine-effect overflow-hidden">
                  <SignLanguageDisplay sign={sign} active={activeSign === sign} />
                </div>
                <div className="flex flex-col items-center">
                  <div className={`text-center text-sm font-semibold ${activeSign === sign ? 'text-accent' : 'text-primary'} transition-colors duration-300`}>
                    {sign}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-border p-4 bg-background/30 flex justify-between items-center">
          <div className="text-sm text-muted-foreground flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Hover over signs to see details
          </div>
          <div className="flex">
            <button
              onClick={onClose}
              className="flex items-center px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-sm"
            >
              <PanelLeftOpen className="h-4 w-4 mr-1" />
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReferenceGuide() {
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Initial letters A-F
  const initialLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <>
      <Card className="bg-card rounded-lg border border-primary/20 border-glow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary animate-float" style={{ animationDelay: '0.4s' }} />
              Sign Language Reference
            </h3>
            <button
              className="text-primary hover:text-accent transition-all duration-300 text-xs font-medium inline-flex items-center bg-primary/5 hover:bg-primary/15 px-2 py-1 rounded-full border border-primary/20 hover:border-primary/40"
              onClick={() => setIsModalOpen(true)}
            >
              View All <Search className="h-3 w-3 ml-1" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex items-center">
            <Info className="h-4 w-4 mr-1 text-primary/70" />
            Common hand signs recognized by the system:
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {initialLetters.map((letter) => (
              <div
                key={letter}
                className={`bg-background rounded-lg p-2 hover-tilt transition-all duration-300
                  ${activeSign === letter ? 'bg-primary/10 shadow-lg border-primary/50' : 'border-transparent'}
                  border
                `}
                onMouseEnter={() => setActiveSign(letter)}
                onMouseLeave={() => setActiveSign(null)}
              >
                <div className="w-full aspect-square object-cover rounded mb-2 shine-effect overflow-hidden">
                  <SignLanguageDisplay sign={letter} active={activeSign === letter} />
                </div>
                <div className={`text-center text-sm font-semibold ${activeSign === letter ? 'text-accent' : 'text-primary'} transition-colors duration-300`}>
                  {letter}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center animate-fadeIn">
            <button
              className="text-primary hover:text-accent transition-all duration-300 text-sm font-medium inline-flex items-center hover:translate-x-1 bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow"
              onClick={() => setIsModalOpen(true)}
            >
              View Complete Reference Guide <Search className="h-4 w-4 ml-2 animate-float" style={{ animationDelay: '0.2s' }} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Dialog */}
      <ReferenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeSign={activeSign}
        setActiveSign={setActiveSign}
      />
    </>
  );
}
