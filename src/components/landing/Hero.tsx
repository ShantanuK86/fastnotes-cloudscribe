
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
    <section className="relative overflow-hidden bg-background pt-20 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
      {/* Vector Flow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/005ff7de-ee3e-44b1-a99b-45543d62b51f.png')] bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-lighten transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/90" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            🎉Introducing Fastnotes
          </span>
          <h1 className="mt-8 font-display text-4xl font-medium tracking-tight text-foreground sm:text-6xl">
            AI-Powered Note-Taking for the Modern Mind
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Transform your notes with AI-driven insights, seamless organization, and
            powerful collaboration tools. Experience note-taking reimagined for the
            future.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 transition-all duration-300 hover:bg-primary-600"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Remove the old gradient div since we have the new background */}
    </section>
  );
};
