"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Owner",
    text: "Turn2Law transformed how I handle legal matters. Their platform is intuitive and the lawyer matching system is exceptional.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    text: "The virtual consultations and document handling saved us countless hours. Highly recommend for any growing business.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Real Estate Agent",
    text: "As a real estate professional, legal documentation is crucial. Turn2Law makes it seamless and reliable.",
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "Tech Entrepreneur",
    text: "Their AI-powered system helped us navigate complex legal requirements with ease. It's a game-changer for startups.",
  },
]

export function DynamicTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-400">Real stories from real clients who trust Turn2Law</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-[#4FD1C5] to-[#4FD1C5]/70 text-black col-span-full lg:col-span-1">
            <CardContent className="p-8">
              <Badge className="mb-4 bg-black text-white">Popular This Month</Badge>
              <h3 className="text-3xl font-bold mb-4">Client Satisfaction</h3>
              <p className="text-lg">
                Our clients consistently rate us 4.9 out of 5 stars for our exceptional legal services and support.
              </p>
            </CardContent>
          </Card>

          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0.5,
                scale: index === activeIndex ? 1 : 0.9,
                zIndex: index === activeIndex ? 10 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 h-full">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-300 mb-6">"{testimonial.text}"</p>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-[#4FD1C5]">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

