import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Home } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <Home className="h-8 w-8 text-primary" />
          <span className="font-heading font-bold text-xl text-primary">RoomShare</span>
        </Link>
        <h2 className="text-center text-3xl font-heading font-bold text-foreground">Welcome back</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:text-primary/80">
            Sign up here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
