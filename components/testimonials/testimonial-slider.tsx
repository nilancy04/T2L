"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TestimonialCard } from "./testimonial-card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Owner",
    image: "/placeholder.svg?height=80&width=80",
    text: "Turn2Law transformed how I handle legal matters. Their platform is intuitive and the lawyer matching system is exceptional. The seamless experience and professional support have made managing legal requirements a breeze.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    image: "/placeholder.svg?height=80&width=80",
    text: "The virtual consultations and document handling saved us countless hours. Highly recommend for any growing business. Their AI-powered system helped us navigate complex legal requirements with ease.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Real Estate Agent",
    image: "/placeholder.svg?height=80&width=80",
    text: "As a real estate professional, legal documentation is crucial. Turn2Law makes it seamless and reliable. Their quick response times and expert advice have helped close deals faster than ever before.",
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-32 bg-gray-900 mb-32 border-b border-gray-800">
      <div className="absolute inset-0 bg-[#4FD1C5]/5" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6 text-white">What Our Clients Say</h2>
        <p className="text-xl text-gray-400">Real stories from real clients who trust Turn2Law</p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-4 mb-16">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute w-full cursor-grab active:cursor-grabbing"
          >
            <TestimonialCard {...testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
          <button
            onClick={() => paginate(-1)}
            className="pointer-events-auto w-14 h-14 rounded-full bg-[#4FD1C5] text-black flex items-center justify-center hover:bg-[#4FD1C5]/90 transition-colors transform -translate-x-6 shadow-lg"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="pointer-events-auto w-14 h-14 rounded-full bg-[#4FD1C5] text-black flex items-center justify-center hover:bg-[#4FD1C5]/90 transition-colors transform translate-x-6 shadow-lg"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#4FD1C5]" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

