
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/?section=' + sectionId);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fastnotes</h3>
            <p className="text-sm text-muted-foreground">
              Transform your note-taking experience with AI-powered insights and seamless organization.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-foreground">Features</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-foreground">Pricing</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-foreground">About</button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollToSection('docs')} className="hover:text-foreground">Documentation</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('help')} className="hover:text-foreground">Help Center</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('privacy')} className="hover:text-foreground">Privacy</button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fastnotes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
