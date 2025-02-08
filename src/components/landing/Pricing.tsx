
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "5 notes per day",
      "Basic AI features",
      "Standard support",
      "Mobile access"
    ]
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for professionals",
    features: [
      "Unlimited notes",
      "Advanced AI features",
      "Priority support",
      "Mobile access",
      "Collaboration tools",
      "Custom templates"
    ]
  },
  {
    name: "Enterprise",
    price: "Contact us",
    description: "For large teams",
    features: [
      "Everything in Pro",
      "Custom AI training",
      "24/7 support",
      "API access",
      "SSO integration",
      "Custom branding"
    ]
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 bg-card rounded-xl border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-3xl font-bold mb-2">{tier.price}</p>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                Get started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
