"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What legal services does Turn2Law offer?",
    answer:
      "Turn2Law offers a wide range of legal services including document preparation, contract review, legal consultations, and more. Our platform connects you with experienced lawyers for various legal needs.",
  },
  {
    question: "How does the lawyer matching system work?",
    answer:
      "Our AI-powered lawyer matching system analyzes your specific legal requirements and matches you with the most suitable lawyer from our network. This ensures you get expert assistance tailored to your needs.",
  },
  {
    question: "What are the pricing options for Turn2Law services?",
    answer:
      "We offer flexible pricing options including a free tier, an essential plan, and a premium plan. You can choose the option that best fits your legal needs and budget.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Absolutely. We take client confidentiality very seriously. All your information and communications are encrypted and protected under strict privacy policies.",
  },
]

const timeline = [
  { event: "Turn2Law founded" },
  { event: "Launched AI-powered lawyer matching" },
  { event: "Expanded to 20+ cities across India" },
  { event: "Introduced virtual legal consultations" },
  { event: "Reached 10,000+ successful consultations" },
]

export function FaqAndTimeline() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="container mx-auto px-4 py-24 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ backgroundColor: openFaq === index ? "rgba(79, 209, 197, 0.1)" : "rgba(31, 41, 55, 0.5)" }}
              className="rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#4FD1C5] transition-transform duration-200 ${
                    openFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <h2 className="text-4xl font-bold text-white mt-24 mb-12 text-center">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#4FD1C5]" />
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center mb-8 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"} relative`}>
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#4FD1C5] rounded-full"
                  style={{ [index % 2 === 0 ? "right" : "left"]: "-8px" }}
                />
                <h3 className="text-2xl font-bold text-[#4FD1C5] mb-2">Milestone</h3>
                <p className="text-white">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

