"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, Book, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const resources = [
  {
    id: 1,
    title: "Legal Document Templates",
    category: "Templates",
    description: "Essential legal document templates for various business needs",
    type: "document",
    downloads: 1234,
  },
  {
    id: 2,
    title: "Understanding Indian Contract Law",
    category: "Guides",
    description: "Comprehensive guide to contract law in India",
    type: "guide",
    downloads: 856,
  },
  {
    id: 3,
    title: "Corporate Compliance Checklist",
    category: "Checklists",
    description: "Stay compliant with this detailed checklist",
    type: "document",
    downloads: 2341,
  },
  {
    id: 4,
    title: "Intellectual Property Rights",
    category: "Guides",
    description: "Everything you need to know about IP rights",
    type: "guide",
    downloads: 1567,
  },
  {
    id: 5,
    title: "Employment Contract Template",
    category: "Templates",
    description: "Customizable employment contract for businesses",
    type: "document",
    downloads: 3210,
  },
  {
    id: 6,
    title: "Guide to Indian Tax Laws",
    category: "Guides",
    description: "Comprehensive overview of Indian tax regulations",
    type: "guide",
    downloads: 1890,
  },
]

const categories = ["All", "Templates", "Guides", "Checklists"]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredResources, setFilteredResources] = useState(resources)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = resources.filter((resource) => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      setFilteredResources(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
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
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Resources</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Access our comprehensive collection of legal resources, templates, and guides
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {isLoading ? (
              // Loading skeletons
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-lg p-6 h-64 animate-pulse"
                />
              ))
            ) : filteredResources.length === 0 ? (
              <motion.div variants={itemVariants} className="col-span-full text-center py-12 text-gray-400">
                No resources found matching your criteria
              </motion.div>
            ) : (
              filteredResources.map((resource) => (
                <motion.div key={resource.id} variants={itemVariants} layout>
                  <Card className="bg-gray-900 border-gray-800 hover:border-[#4FD1C5] transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full bg-[#4FD1C5]/20 flex items-center justify-center">
                          {resource.type === "document" ? (
                            <FileText className="w-5 h-5 text-[#4FD1C5]" />
                          ) : (
                            <Book className="w-5 h-5 text-[#4FD1C5]" />
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="hover:text-[#4FD1C5] text-white">
                          <Download className="w-5 h-5" />
                        </Button>
                      </div>
                      <CardTitle className="text-xl mt-4 text-white">{resource.title}</CardTitle>
                      <CardDescription className="text-gray-400">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#4FD1C5]">{resource.category}</span>
                        <span className="text-gray-400">{resource.downloads.toLocaleString()} downloads</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

