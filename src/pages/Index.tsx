import { useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { motion, useAnimation } from "framer-motion";
import { AppBar } from "@/components/layout/AppBar";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const controls = useAnimation();
  const { user } = useAuth();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    });
  }, [controls]);

  if (user) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8">Welcome back!</h1>
          <p className="text-muted-foreground">
            Start creating and organizing your notes.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen bg-background"
    >
      <AppBar />
      <Hero />
      <Features />
    </motion.div>
  );
};

export default Index;