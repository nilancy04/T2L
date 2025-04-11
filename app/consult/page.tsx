"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  Search,
  ArrowRight,
  Moon,
  Sun,
  ExternalLink,
  Github,
  Twitter,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Profile {
  id: string
  name: string
  role: string
  image: string
  description: string
  links: {
    twitter?: string
    github?: string
    website?: string
  }
  tags: string[]
  stats: {
    followers: number
    following: number
    projects: number
  }
}

const profiles: Profile[] = [
  {
    id: "1",
    name: "alec",
    role: "musician & developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop",
    description: "crafting the next-gen builder community & fine-tuning code into musical algorithms",
    links: {
      twitter: "https://twitter.com/alec",
      github: "https://github.com/alec",
      website: "https://alec.dev",
    },
    tags: ["music", "development", "ai"],
    stats: {
      followers: 1234,
      following: 567,
      projects: 12,
    },
  },
  {
    id: "2",
    name: "kelli",
    role: "designer & creator",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop",
    description: "content creator and designer exploring the world one experience at a time",
    links: {
      twitter: "https://twitter.com/kelli",
      website: "https://kelli.design",
    },
    tags: ["design", "content", "creative"],
    stats: {
      followers: 2345,
      following: 678,
      projects: 8,
    },
  },
  {
    id: "3",
    name: "kat",
    role: "music producer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",
    description: "electronic music producer and content creator, crafting her sound in the digital space",
    links: {
      twitter: "https://twitter.com/kat",
      website: "https://kat.music",
    },
    tags: ["music", "production", "electronic"],
    stats: {
      followers: 3456,
      following: 789,
      projects: 15,
    },
  },
  {
    id: "4",
    name: "tair",
    role: "lead engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    description: "heading eng at buildspace, building sage -- a place for creators to connect",
    links: {
      twitter: "https://twitter.com/tair",
      github: "https://github.com/tair",
      website: "https://tair.dev",
    },
    tags: ["engineering", "blockchain", "web3"],
    stats: {
      followers: 4567,
      following: 890,
      projects: 23,
    },
  },
]

const suggestedTags = [
  "who's hiring ai developers?",
  "who's is making short form content?",
  "who can help me design a logo?",
  "show me fast growing projects",
  "show me hardware people",
  "looking for a marketer",
  "need a producer for",
]

export default function DiscoverPage() {
  const [isDark, setIsDark] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState(profiles)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [profilesPerPage] = useState(8)
  const [notifications, setNotifications] = useState<string[]>([])

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter profiles based on search query and selected tags
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = profiles.filter((profile) => {
        const matchesSearch =
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.role.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => profile.tags.includes(tag))

        return matchesSearch && matchesTags
      })
      setFilteredProfiles(filtered)
      setIsLoading(false)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setNotifications((prev) => [...prev, `Message sent: ${message}`])
      setMessage("")
    }
  }

  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? "bg-black" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-64 p-6 border-r ${isDark ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.1 }} className={isDark ? "text-white" : "text-black"}>
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className={isDark ? "text-white" : "text-black"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* <div className="space-y-6">
            <h2 className={isDark ? "text-gray-400" : "text-gray-600"}>discover</h2>
            <div className="space-y-4">
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                welcome to sage, a place
                <br />
                to find dope people
                <br />
                building cool shit.
              </p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                this is the place where
                <br />
                people work on ideas
                <br />
                they are passionate
                <br />
                about.
              </p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>give it a try.</p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>see you in a search soon.</p>
            </div>
          </div> */}

          <div className="space-y-2">
            <Button
              variant="outline"
              className={`w-full ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
            >
              sign up
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${isDark ? "text-white hover:bg-gray-800" : "text-black hover:bg-gray-200"}`}
            >
              log in
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-12 relative">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-7xl font-bold mb-16 ${isDark ? "text-white" : "text-black"}`}
        >
          find and
          <br />
          be found.
        </motion.h1>

        {/* Search Input */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative mb-8 flex">
          <Input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or description..."
            className={`w-full border py-6 pr-12 ${
              isDark ? "bg-transparent border-gray-800 text-white" : "bg-white border-gray-200 text-black"
            }`}
          />
          <Search
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFilterOpen(true)}
            className={`ml-2 ${isDark ? "text-white border-gray-800" : "text-black border-gray-200"}`}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-12">
          {suggestedTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge
                variant="outline"
                className={`px-4 py-2 cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : isDark
                      ? "text-gray-400 border-gray-800 hover:bg-gray-800"
                      : "text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Profiles Grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Loading skeletons
                [...Array(profilesPerPage)].map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"} aspect-square animate-pulse`}
                  />
                ))
              ) : currentProfiles.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`col-span-4 text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  No profiles found matching your criteria
                </motion.div>
              ) : (
                currentProfiles.map((profile) => (
                  <motion.div
                    key={profile.id}
                    layoutId={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() => setSelectedProfile(profile)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                      <img
                        src={profile.image || "/placeholder.svg"}
                        alt={profile.name}
                        className="object-cover w-full h-full transition-all duration-300 
                          group-hover:scale-110 group-hover:brightness-75"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                      >
                        <div className="space-x-2">
                          {profile.links.twitter && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" className="text-white hover:text-white/80">
                                    <Twitter className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Twitter</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {profile.links.github && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" className="text-white hover:text-white/80">
                                    <Github className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>GitHub</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {profile.links.website && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" className="text-white hover:text-white/80">
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Website</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className={`text-lg mb-1 ${isDark ? "text-white" : "text-black"}`}>{profile.name}</h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>{profile.role}</p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {/* Pagination */}
        {filteredProfiles.length > profilesPerPage && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.ceil(filteredProfiles.length / profilesPerPage) }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredProfiles.length / profilesPerPage)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Profile Dialog */}
        <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <DialogContent className={`sm:max-w-[425px] ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {selectedProfile && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProfile.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <img
                    src={selectedProfile.image || "/placeholder.svg"}
                    alt={selectedProfile.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>{selectedProfile.description}</p>
                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <p className="font-bold">{selectedProfile.stats.followers}</p>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{selectedProfile.stats.following}</p>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>Following</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{selectedProfile.stats.projects}</p>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>Projects</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Filter Dialog */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent className={`sm:max-w-[425px] ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <DialogHeader>
              <DialogTitle>Filter Profiles</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Message Input */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="message sage..."
            className={`w-full py-6 pr-12 ${
              isDark ? "bg-transparent border-gray-800 text-white" : "bg-white border-gray-200 text-black"
            }`}
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSendMessage}
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${
              isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Notifications */}
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${
                isDark ? "bg-gray-800 text-white" : "bg-white text-black"
              } shadow-lg`}
              style={{ zIndex: 9999 - index }}
            >
              {notification}
              <Button
                size="sm"
                variant="ghost"
                className="ml-2"
                onClick={() => setNotifications((prev) => prev.filter((_, i) => i !== index))}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

