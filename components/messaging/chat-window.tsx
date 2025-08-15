"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Send, MoreVertical, Flag, UserX, Info, CheckCircle, MapPin, PoundSterling } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"

interface ChatWindowProps {
  conversation: any
  messages: any[]
  onSendMessage: (content: string) => void
}

export function ChatWindow({ conversation, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={conversation.participant.avatar || "/placeholder.svg"}
                  alt={conversation.participant.name}
                />
                <AvatarFallback>
                  {conversation.participant.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.participant.verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 h-4 w-4 text-green-600 bg-background rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{conversation.participant.name}</h3>
              <p className="text-sm text-muted-foreground">Last seen {conversation.participant.lastSeen}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Info className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="h-4 w-4 mr-2" />
                Report User
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <UserX className="h-4 w-4 mr-2" />
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Listing Info */}
        <Card className="mt-3 bg-muted/30">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">{conversation.listing.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{conversation.listing.location}</span>
                  <span>•</span>
                  <PoundSterling className="h-3 w-3" />
                  <span>£{conversation.listing.price}/month</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="bg-transparent">
                View Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isMe = message.sender === "me"
          const showTimestamp =
            index === 0 ||
            new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000 // 5 minutes

          return (
            <div key={message.id} className="space-y-2">
              {showTimestamp && (
                <div className="text-center">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {format(new Date(message.timestamp), "MMM d, h:mm a")}
                  </span>
                </div>
              )}

              <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Safety Notice */}
        <div className="mt-2 text-xs text-muted-foreground">
          <p>
            Keep conversations on RoomShare for your safety. Never share personal information like phone numbers or
            addresses until you've met in person.
          </p>
        </div>
      </div>
    </div>
  )
}
