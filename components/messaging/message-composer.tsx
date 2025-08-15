"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, X } from "lucide-react"

interface MessageComposerProps {
  recipient: {
    name: string
    avatar: string
    verified: boolean
  }
  listing: {
    title: string
    location: string
    price: number
  }
  onSend: (message: string) => void
  onClose: () => void
}

export function MessageComposer({ recipient, listing, onSend, onClose }: MessageComposerProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage("")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg">Send Message</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recipient Info */}
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} />
            <AvatarFallback>
              {recipient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{recipient.name}</h3>
              {recipient.verified && (
                <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {listing.title} • {listing.location} • £{listing.price}/month
            </p>
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <Textarea
            placeholder="Hi! I'm interested in your listing. Could you tell me more about..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Be polite and specific about what you'd like to know. Avoid sharing personal information.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
