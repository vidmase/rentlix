import { MessagingInterface } from "@/components/messaging/messaging-interface"
import { Header } from "@/components/header"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="h-[calc(100vh-4rem)]">
        <MessagingInterface />
      </main>
    </div>
  )
}
