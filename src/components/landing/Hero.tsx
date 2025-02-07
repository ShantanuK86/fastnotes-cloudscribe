import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
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
          <h1 className="mt-8 font-display text-4xl font-medium tracking-tight text-white sm:text-6xl">
            AI-Powered Note-Taking for the Modern Mind
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Transform your notes with AI-driven insights, seamless organization, and
            powerful collaboration tools. Experience note-taking reimagined for the
            future.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
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
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </section>
  );
};