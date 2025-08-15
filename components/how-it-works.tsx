import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageCircle, Home, Shield } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Find rooms and roommates that match your preferences, budget, and lifestyle.",
  },
  {
    icon: MessageCircle,
    title: "Connect Safely",
    description: "Message potential roommates through our secure platform to get to know each other.",
  },
  {
    icon: Home,
    title: "Move In",
    description: "Complete your arrangements and move into your perfect shared living space.",
  },
  {
    icon: Shield,
    title: "Stay Protected",
    description: "Enjoy peace of mind with verified profiles and secure communication tools.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect roommate and shared space has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-0 shadow-sm bg-background">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
