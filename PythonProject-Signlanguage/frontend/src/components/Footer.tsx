import React from "react";
import { HandHelping, Globe, Heart } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 py-8 px-4 sm:px-6 lg:px-8 mt-8 tech-background animate-fadeIn">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3 shine-effect">
                <HandHelping className="text-background h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Sign</span>
                <span className="text-primary">Snap</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              © {new Date().getFullYear()} SignSnap AI. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1 max-w-xs">
              Real-time American Sign Language detection with advanced AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6">
            <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-sm font-semibold mb-2 text-primary flex items-center">
                <span className="w-4 h-0.5 bg-primary/50 mr-2"></span>
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    API
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-sm font-semibold mb-2 text-primary flex items-center">
                <span className="w-4 h-0.5 bg-primary/50 mr-2"></span>
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-sm font-semibold mb-2 text-primary flex items-center">
                <span className="w-4 h-0.5 bg-primary/50 mr-2"></span>
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-sm font-semibold mb-2 text-primary flex items-center">
                <span className="w-4 h-0.5 bg-primary/50 mr-2"></span>
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex transform duration-200">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors bg-background/30 p-2 rounded-full hover:bg-background/60">
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors bg-background/30 p-2 rounded-full hover:bg-background/60">
              <FaGithub className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors bg-background/30 p-2 rounded-full hover:bg-background/60">
              <FaLinkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors bg-background/30 p-2 rounded-full hover:bg-background/60">
              <FaYoutube className="h-4 w-4" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center">
            <Globe className="h-3 w-3 mr-1.5" />
            <span>Available worldwide</span>
            <span className="mx-2">•</span>
            <Heart className="h-3 w-3 mr-1.5 text-red-400" />
            <span>Designed for accessibility and inclusion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
