"use client"

import { useState } from "react"
import { ConversationList } from "./conversation-list"
import { ChatWindow } from "./chat-window"
import { EmptyState } from "./empty-state"

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    participant: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-avatar.png",
      verified: true,
      lastSeen: "2 hours ago",
    },
    listing: {
      id: 1,
      title: "Modern Room in Shared House",
      location: "Shoreditch, London",
      price: 650,
    },
    lastMessage: {
      content: "Hi! I'm really interested in your room. When would be a good time to arrange a viewing?",
      timestamp: "2024-01-15T14:30:00Z",
      sender: "them",
      read: false,
    },
    unreadCount: 2,
  },
  {
    id: 2,
    participant: {
      name: "Mike Chen",
      avatar: "/male-professional-avatar.png",
      verified: true,
      lastSeen: "1 day ago",
    },
    listing: {
      id: 2,
      title: "Looking for Professional Roommate",
      location: "Camden, London",
      price: 800,
    },
    lastMessage: {
      content: "Thanks for getting back to me. The room sounds perfect!",
      timestamp: "2024-01-14T16:45:00Z",
      sender: "me",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: 3,
    participant: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?key=emma",
      verified: false,
      lastSeen: "5 minutes ago",
    },
    listing: {
      id: 3,
      title: "Student House Share",
      location: "Headingley, Leeds",
      price: 380,
    },
    lastMessage: {
      content: "Could you tell me more about the other housemates?",
      timestamp: "2024-01-15T17:20:00Z",
      sender: "them",
      read: false,
    },
    unreadCount: 1,
  },
]

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    content: "Hi! I saw your listing for the room in Shoreditch. It looks perfect for what I'm looking for.",
    timestamp: "2024-01-15T10:00:00Z",
    sender: "them",
    read: true,
  },
  {
    id: 2,
    content: "Hi there! Thanks for your interest. I'd be happy to tell you more about the room and arrange a viewing.",
    timestamp: "2024-01-15T10:15:00Z",
    sender: "me",
    read: true,
  },
  {
    id: 3,
    content: "That would be great! I'm available most evenings this week. What works best for you?",
    timestamp: "2024-01-15T10:30:00Z",
    sender: "them",
    read: true,
  },
  {
    id: 4,
    content: "How about tomorrow (Tuesday) around 6 PM? The house is just a 5-minute walk from Old Street station.",
    timestamp: "2024-01-15T11:00:00Z",
    sender: "me",
    read: true,
  },
  {
    id: 5,
    content: "Perfect! I'll be there at 6 PM. Should I bring anything specific or any documents?",
    timestamp: "2024-01-15T14:30:00Z",
    sender: "them",
    read: false,
  },
]

export function MessagingInterface() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [conversations, setConversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)

  const handleSelectConversation = (conversationId: number) => {
    setSelectedConversation(conversationId)
    // Mark messages as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, read: true } }
          : conv,
      ),
    )
  }

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      timestamp: new Date().toISOString(),
      sender: "me" as const,
      read: true,
    }
    setMessages((prev) => [...prev, newMessage])

    // Update conversation last message
    if (selectedConversation) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation ? { ...conv, lastMessage: { ...newMessage, sender: "me" } } : conv,
        ),
      )
    }
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="flex h-full">
      {/* Conversation List */}
      <div className="w-80 border-r bg-card flex-shrink-0">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation}
          onSelect={handleSelectConversation}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <ChatWindow conversation={selectedConv} messages={messages} onSendMessage={handleSendMessage} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
