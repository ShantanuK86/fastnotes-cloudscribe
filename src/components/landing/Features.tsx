import { Check, Sparkles, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "AI-Powered Insights",
    description:
      "Get intelligent suggestions and automatic organization powered by cutting-edge AI technology.",
    icon: Sparkles,
  },
  {
    name: "Real-time Collaboration",
    description:
      "Work together seamlessly with your team, sharing and editing notes in real-time.",
    icon: Users,
  },
  {
    name: "Smart Organization",
    description:
      "Automatically categorize and tag your notes for effortless retrieval when you need them.",
    icon: Check,
  },
  {
    name: "Lightning Fast",
    description:
      "Experience blazing-fast performance with our optimized note-taking interface.",
    icon: Zap,
  },
];

export const Features = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-base font-semibold leading-7 text-primary"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Features that empower your workflow
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Discover how Fastnotes can transform your note-taking experience with
            powerful features designed for modern professionals.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};