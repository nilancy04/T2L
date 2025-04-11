"use client"

import { motion } from "framer-motion"
import { Check, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started with basic legal needs",
    features: [
      "Basic legal documents",
      "Limited consultations",
      "Email support",
      "Basic resources",
      "Document templates",
      "Community access",
    ],
    limitations: ["1 consultation/month", "Basic templates only", "Standard response time", "No priority support"],
  },
  {
    name: "Essential",
    price: "₹50",
    popular: true,
    description: "Ideal for growing businesses and regular legal needs",
    features: [
      "All Free features",
      "Priority support",
      "Unlimited documents",
      "Monthly consultation",
      "Advanced templates",
      "Priority email support",
      "Custom document review",
      "Legal compliance checks",
    ],
    limitations: ["4 consultations/month", "48h response time", "Basic legal research"],
  },
  {
    name: "Premium",
    price: "₹50",
    description: "Complete legal coverage for businesses and individuals",
    features: [
      "All Essential features",
      "24/7 priority access",
      "Dedicated lawyer",
      "Custom solutions",
      "Unlimited consultations",
      "Emergency support",
      "Full legal research",
      "Contract negotiations",
      "Court representation",
      "Compliance monitoring",
    ],
    limitations: [],
  },
]

export default function PricingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 font-bold">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Choose the Perfect Plan for Your Legal Needs</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-bold">
          Flexible pricing options designed to provide comprehensive legal support for individuals and businesses of all
          sizes.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 grid md:grid-cols-3 gap-8"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={cardVariants} className="font-bold">
            <Card className="relative bg-gray-900 border-gray-800 text-white">
              {plan.popular && (
                <div className="absolute -top-2 -right-2 bg-[#ECC94B] text-black text-sm px-3 py-1 rounded-full font-bold">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400 font-bold">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-white">{plan.price}</div>
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white font-bold">
                      <Check className="w-5 h-5 text-[#4FD1C5]" />
                      <span className="text-gray-300 font-bold">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-center gap-2 text-white font-bold">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-5 h-5 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-white font-bold">Limitation: {limitation}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-gray-500 font-bold">{limitation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full font-bold ${
                    plan.popular ? "bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-black" : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 mt-24 font-bold"
      >
        <div className="bg-gray-900 rounded-xl p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Need a Custom Solution?</h2>
            <p className="text-gray-400 mb-8 font-bold">
              We offer tailored legal service packages for enterprises and special requirements. Get in touch with us to
              discuss your specific needs.
            </p>
            <Button className="bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-black font-bold">Contact Sales</Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

