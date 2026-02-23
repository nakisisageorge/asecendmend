"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Send,
  Phone,
  MoreVertical,
  Image as ImageIcon,
  Paperclip,
  Smile,
} from "lucide-react"

const messages = [
  { id: 1, text: "Hello! How can I help you today?", sender: "doctor", time: "3:20 PM" },
  { id: 2, text: "Hi Doctor, I've been having headaches for the past few days.", sender: "user", time: "3:21 PM" },
  { id: 3, text: "I see. Can you describe the location and intensity of the headaches?", sender: "doctor", time: "3:22 PM" },
  { id: 4, text: "It's mostly on the right side, and the pain is moderate. It gets worse in the afternoon.", sender: "user", time: "3:23 PM" },
  { id: 5, text: "Thank you for the details. Have you been getting enough sleep and staying hydrated?", sender: "doctor", time: "3:24 PM" },
]

export function ChatScreen() {
  const { goBack } = useApp()
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)

  const handleSend = () => {
    if (!message.trim()) return
    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }])
    setMessage("")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-navy px-5 pt-12 pb-4 flex items-center gap-3 shrink-0">
        <button onClick={goBack} className="text-gold/80 hover:text-gold" aria-label="Go back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
          <span className="text-gold font-bold text-sm">SJ</span>
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-primary-foreground">Dr. Sarah Johnson</h2>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[11px] text-gold/60">Online</span>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center" aria-label="Call">
          <Phone className="w-4 h-4 text-gold/80" />
        </button>
        <button className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center" aria-label="More options">
          <MoreVertical className="w-4 h-4 text-gold/80" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.sender === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-card border border-border text-foreground rounded-bl-sm"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${
                msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 pb-6 pt-3 bg-card border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0" aria-label="Attach file">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="h-10 bg-secondary border-border pr-10"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Add emoji">
              <Smile className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0 hover:bg-gold-light transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-navy" />
          </button>
        </div>
      </div>
    </div>
  )
}
