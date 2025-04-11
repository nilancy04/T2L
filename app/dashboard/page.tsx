"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Mail, User } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Sample search suggestions
  const helpTopics = [
    "How to create a case?",
    "How to contact a lawyer?",
    "Legal document templates",
    "Payment issues",
    "Privacy policy"
  ];

  // Update suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      setSuggestions(helpTopics.filter(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout using signOut
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  // Show loading state while session is loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Render dashboard only if authenticated
  if (status === "authenticated" && session?.user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Navbar */}
        <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <div className="text-xl font-bold text-teal-400">Dashboard</div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* Notification Icon */}
            <div className="relative" ref={notificationRef}>
              <Bell
                className="w-6 h-6 cursor-pointer hover:text-gray-400"
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              />
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-lg p-3 z-50">
                  <p className="text-sm font-medium text-gray-300">No new notifications</p>
                </div>
              )}
            </div>

            {/* Messages Icon */}
            <Mail
              className="w-6 h-6 cursor-pointer hover:text-gray-400"
              onClick={() => router.push("/messages")}
            />

            {/* Profile Icon */}
            <div className="relative" ref={profileRef}>
              <User
                className="w-6 h-6 cursor-pointer hover:text-gray-400"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-lg p-3 z-50">
                  {/* Display user info from session */}
                  <div className="mb-3 border-b border-gray-700 pb-3">
                    <p className="text-sm font-medium text-teal-400">{session.user.name || 'User'}</p>
                    <p className="text-xs text-gray-400">{session.user.email}</p>
                    {/* Add createdAt if available in session, otherwise remove */}
                    {/* <p className="text-xs text-gray-500 mt-1">
                      Member since {new Date(userData.createdAt).toLocaleDateString()}
                    </p> */}
                  </div>

                  <ul className="text-sm space-y-2">
                    <li
                      className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                      onClick={() => router.push("/settings")}
                    >
                      Settings
                    </li>
                    {/* Updated logout handler */}
                    <li
                      className="hover:bg-red-600 p-2 rounded cursor-pointer text-red-300"
                      onClick={handleLogout} // Use handleLogout
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-semibold mb-4 text-teal-400">How can we help you, {session.user.name}?</h1>

          {/* Search Box */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-lg z-50">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-700 cursor-pointer text-gray-300"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback or redirect if not authenticated (though useEffect should handle this)
  return null;
}
