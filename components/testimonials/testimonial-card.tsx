"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  text: string
}

export function TestimonialCard({ name, role, image, text }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, overflow: "hidden" }}
      animate={{ opacity: 1, y: 0, overflow: "visible" }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 relative"
    >
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover rounded-full border-4 border-[#4FD1C5]"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <Quote className="w-12 h-12 text-[#4FD1C5] mb-6 mx-auto md:mx-0" />
          <p className="text-xl md:text-2xl mb-6 text-gray-200 leading-relaxed">{text}</p>
          <div>
            <h4 className="text-xl font-semibold text-white mb-1">{name}</h4>
            <p className="text-lg text-[#4FD1C5]">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

