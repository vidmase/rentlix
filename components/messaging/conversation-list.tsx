"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, CheckCircle, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ConversationListProps {
  conversations: any[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.listing.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg">Messages</h2>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p>No conversations found</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedId === conversation.id ? "bg-primary/10 border border-primary/20" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
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

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium truncate">{conversation.participant.name}</h3>
                      <div className="flex items-center gap-1">
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    {/* Listing Info */}
                    <div className="text-xs text-muted-foreground mb-1">
                      <span className="font-medium">£{conversation.listing.price}/month</span>
                      <span className="mx-1">•</span>
                      <span>{conversation.listing.location}</span>
                    </div>

                    {/* Last Message */}
                    <p
                      className={`text-sm truncate ${
                        conversation.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {conversation.lastMessage.sender === "me" ? "You: " : ""}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
