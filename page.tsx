"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Scale, Shield, Clock, ChevronRight, ArrowUp, Linkedin, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"

// Content data for Know About Us section
const knowAboutUsContent = {
  "What is Instant Access to Law?": `Our platform provides immediate access to legal resources, documents, and professional assistance. Through advanced technology and a network of experienced lawyers, we ensure that legal support is just a click away.`,

  "Key Statistics": `• Over 10,000 successful legal consultations
• 95% client satisfaction rate
• 24/7 availability
• Present in 20+ cities across India`,

  "Channels of Instant Legal Access": `• Online document generation
• Video consultations
• Chat support
• Emergency legal helpline
• Mobile application`,

  "Included Services": `• Legal document preparation
• Contract review and drafting
• Legal consultation sessions
• Case filing assistance
• Compliance guidance`,

  "Why choose Turn2Law": `• Instant access to legal expertise
• Cost-effective solutions
• Verified professionals
• Secure and confidential
• Transparent pricing`,

  "Meet the Team": `Our team consists of experienced legal professionals, technology experts, and customer support specialists dedicated to making legal services accessible to everyone.`,
}

export default function Page() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Animated Banner */}
      <div className="bg-[#4FD1C5] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="mx-4 text-black font-medium">100+ LAWYERS</span>
          <span className="mx-4 text-black font-medium">•</span>
          <span className="mx-4 text-black font-medium">TRUSTED BY 100+ USERS</span>
          <span className="mx-4 text-black font-medium">•</span>
          <span className="mx-4 text-black font-medium">POWERED BY AI</span>
          <span className="mx-4 text-black font-medium">•</span>
          <span className="mx-4 text-black font-medium">MADE FOR INDIA</span>
        </div>
      </div>
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-xl font-bold">Turn2Law</span>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300">
              Consult
            </a>
            <a href="#" className="hover:text-gray-300">
              Resources
            </a>
            <a href="#" className="hover:text-gray-300">
              Pricing
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-gray-300">
            Login
          </Button>
          <Button className="bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-black">Sign up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">We Simplify Legal Access for Everyone.</h1>
            <p className="text-gray-400 text-lg">
              Fast and affordable legal services that help you get legal access to what matters most.
            </p>
            <Button className="bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-black text-lg px-8 py-6">
              Get Started Today
            </Button>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-[#ECC94B]" />
            <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-[#4FD1C5]" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#4FD1C5]/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#4FD1C5]" />
            </div>
            <p className="text-sm text-gray-400">Rental and lease agreements</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#4FD1C5]/20 flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#4FD1C5]" />
            </div>
            <p className="text-sm text-gray-400">Legal Opinion</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#4FD1C5]/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#4FD1C5]" />
            </div>
            <p className="text-sm text-gray-400">Wills & Trust</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#4FD1C5]/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#4FD1C5]" />
            </div>
            <p className="text-sm text-gray-400">24/7 Support</p>
          </div>
        </div>
      </section>

      {/* What's Turn2Law Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">
              What's <span className="text-[#ECC94B]">Turn2Law</span>?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Turn2Law is a next-generation legal platform designed to simplify access to legal services for everyone.
              Whether you're facing an emergency, sorting critical documents, or seeking legal advice, Turn2Law connects
              you to trusted professionals instantly. Through our innovative approach to document handling, lawyer
              matching, and a comprehensive resource library, Turn2Law bridges the gap between legal expertise and
              accessibility. Our platform makes legal services more affordable, efficient, and effective for individuals
              and businesses alike.
            </p>
          </div>
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ECC94B]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#ECC94B]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Instant legal services</h3>
                  <p className="text-gray-400">
                    Get agreements, contracts, NDAs, and other legal forms with our automated document filing service.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ECC94B]/20 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-[#ECC94B]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Lawyer Matching System</h3>
                  <p className="text-gray-400">
                    Connect with expert lawyers tailored to your specific legal needs for seamless support.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ECC94B]/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#ECC94B]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Affordable subscriptions</h3>
                  <p className="text-gray-400">
                    Choose cost-effective plans for lawyers and clients with exclusive benefits and no hidden fees.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ECC94B]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#ECC94B]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Virtual consulting</h3>
                  <p className="text-gray-400">
                    Access expert legal advice and consultations anytime, anywhere from the comfort of your home.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Know About Us */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Know about us.</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {Object.keys(knowAboutUsContent).map((section) => (
              <div key={section} className="space-y-2">
                <button
                  onClick={() => setSelectedSection(selectedSection === section ? null : section)}
                  className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white transition-colors py-2"
                >
                  <span>{section}</span>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${selectedSection === section ? "rotate-90" : ""}`}
                  />
                </button>
                {selectedSection === section && (
                  <div className="bg-gray-900 rounded-lg p-4 text-gray-300 whitespace-pre-line">
                    {knowAboutUsContent[section]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-500">Image</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Free</h3>
              <div className="text-3xl font-bold text-white">₹0</div>
              <div className="space-y-4 text-white">
                <p className="font-semibold">• Basic legal documents</p>
                <p className="font-semibold">• Limited consultations</p>
                <p className="font-semibold">• Email support</p>
                <p className="font-semibold">• Basic resources</p>
              </div>
            </div>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-6 relative">
            <div className="absolute -top-2 -right-2 bg-[#ECC94B] text-black text-xs px-2 py-1 rounded">Popular</div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Essential</h3>
              <div className="text-3xl font-bold text-white">₹50</div>
              <div className="space-y-4 text-white">
                <p className="font-semibold">• All Free features</p>
                <p className="font-semibold">• Priority support</p>
                <p className="font-semibold">• Unlimited documents</p>
                <p className="font-semibold">• Monthly consultation</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#4A4A2D] border-gray-800 p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Premium</h3>
              <div className="text-3xl font-bold text-white">₹50</div>
              <div className="space-y-4 text-white">
                <p className="font-semibold">• All Essential features</p>
                <p className="font-semibold">• 24/7 priority access</p>
                <p className="font-semibold">• Dedicated lawyer</p>
                <p className="font-semibold">• Custom solutions</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-[#4FD1C5] aspect-square flex items-center justify-center p-6">
            <span className="text-lg font-medium text-center">Image</span>
          </Card>
          <Card className="bg-[#ECC94B] aspect-square flex items-center justify-center p-6">
            <span className="text-lg font-medium text-center">Image</span>
          </Card>
          <Card className="bg-[#4FD1C5] aspect-square flex items-center justify-center p-6">
            <span className="text-lg font-medium text-center">Image</span>
          </Card>
          <Card className="bg-white text-black aspect-square flex flex-col items-center justify-center p-6">
            <span className="text-4xl font-bold">200+</span>
            <span className="text-sm mb-2">Lawyers</span>
            <Button className="bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-black">Consult</Button>
          </Card>
        </div>
      </section>

      {/* Animated Client Count Section */}
      <section className="container mx-auto px-4 py-12 overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold"
        >
          Turn2Law has helped hundred's of clients
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#4FD1C5] rounded-lg aspect-video flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-medium">Image</span>
            </div>
            <div className="absolute bottom-1/2 right-0 transform translate-x-1/2 translate-y-1/2">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#4FD1C5]" />
              </div>
            </div>
          </div>
          <div className="bg-[#1e4e4a] rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Consult us</h2>
            <form className="space-y-4">
              <Input placeholder="Name" className="bg-[#4FD1C5]/20 border-0 text-white placeholder:text-white/60" />
              <Input placeholder="+91" className="bg-[#4FD1C5]/20 border-0 text-white placeholder:text-white/60" />
              <Input
                type="email"
                placeholder="Email"
                className="bg-[#4FD1C5]/20 border-0 text-white placeholder:text-white/60"
              />
              <Textarea
                placeholder="Describe"
                className="bg-[#4FD1C5]/20 border-0 text-white placeholder:text-white/60 min-h-[120px]"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Turn2Law</h2>
            <p className="text-gray-400">Simplifying legal access to everyone.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Support
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Get a lawyer
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  This
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  That
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Socials</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />X
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  This
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  That
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400">Copyright © 2024 Turn2Law. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#4FD1C5] text-black p-3 rounded-full shadow-lg hover:bg-[#4FD1C5]/90 transition-colors"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  )
}

