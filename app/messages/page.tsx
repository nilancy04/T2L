"use client";

import { useState } from "react";
import { Send, User, Home } from "lucide-react";
import Link from "next/link";

const users = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?" },
  { id: 2, name: "Alice Smith", lastMessage: "Let's catch up soon!" },
  { id: 3, name: "Michael Johnson", lastMessage: "Did you check the document?" },
  { id: 4, name: "Sophia Lee", lastMessage: "I'll call you later." },
];

const messagesData: { [key: number]: { sender: string; text: string }[] } = {
  1: [
    { sender: "You", text: "Hey John!" },
    { sender: "John Doe", text: "Hey, how's it going?" },
  ],
  2: [
    { sender: "You", text: "Hi Alice!" },
    { sender: "Alice Smith", text: "Let's catch up soon!" },
  ],
  3: [
    { sender: "Michael Johnson", text: "Did you check the document?" },
    { sender: "You", text: "Yeah, I’ll review it soon!" },
  ],
  4: [
    { sender: "Sophia Lee", text: "I'll call you later." },
    { sender: "You", text: "Okay, talk soon!" },
  ],
};

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(users[0].id);
  const [messages, setMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || activeChat === null) return;

    const updatedMessages = {
      ...messages,
      [activeChat]: [...(messages[activeChat] || []), { sender: "You", text: newMessage }],
    };

    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar - Chat List */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Dashboard Button */}
          <Link href="/dashboard">
            <button className="flex items-center text-teal-400 hover:text-teal-300">
              <Home className="w-6 h-6 mr-2" />
              <span className="font-semibold">Dashboard</span>
            </button>
          </Link>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-teal-400">Messages</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-3 rounded-lg cursor-pointer hover:bg-gray-700 ${
                activeChat === user.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveChat(user.id)}
            >
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-teal-400" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.lastMessage}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Chat Window */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center">
          <User className="w-6 h-6 text-teal-400 mr-3" />
          <h2 className="text-lg font-semibold">{users.find((u) => u.id === activeChat)?.name}</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeChat &&
            messages[activeChat]?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "You" ? "bg-teal-500 text-white" : "bg-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="ml-3 p-3 bg-teal-500 rounded-lg">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
