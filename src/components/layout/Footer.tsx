import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
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
                <a href="#features" className="hover:text-foreground">Features</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground">Pricing</a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground">About</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#docs" className="hover:text-foreground">Documentation</a>
              </li>
              <li>
                <a href="#help" className="hover:text-foreground">Help Center</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-foreground">Privacy</a>
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