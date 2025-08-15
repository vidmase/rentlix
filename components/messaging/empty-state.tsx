import { MessageCircle, Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-12 w-12 text-primary" />
        </div>

        <h2 className="font-heading font-semibold text-xl mb-2">Welcome to Messages</h2>
        <p className="text-muted-foreground mb-6">
          Select a conversation to start chatting with potential roommates and landlords.
        </p>

        {/* Safety Tips */}
        <div className="space-y-3">
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <h3 className="font-medium text-sm mb-1">Stay Safe</h3>
                  <p className="text-xs text-muted-foreground">
                    Keep conversations on our platform and never share personal details until you meet in person.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <h3 className="font-medium text-sm mb-1">Be Respectful</h3>
                  <p className="text-xs text-muted-foreground">
                    Treat others with respect and kindness. Report any inappropriate behavior.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
