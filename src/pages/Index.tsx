import { useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { motion, useAnimation } from "framer-motion";

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen bg-background"
    >
      <Hero />
      <Features />
    </motion.div>
  );
};

export default Index;