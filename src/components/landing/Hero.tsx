
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/notes');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="relative overflow-hidden bg-background min-h-screen flex items-center">
      {/* Vector Flow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/005ff7de-ee3e-44b1-a99b-45543d62b51f.png')] bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-lighten transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/90" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-8"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Take Better Notes,{" "}
              <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Transform your note-taking experience with AI-powered insights. Keep your thoughts organized and accessible anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 text-base"
              />
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="h-12 px-8 text-base font-medium"
              >
                Request Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[320px]">
              <img
                src="/lovable-uploads/96a344ed-2d4c-4047-b32c-78aadde4be71.png"
                alt="App Interface"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
