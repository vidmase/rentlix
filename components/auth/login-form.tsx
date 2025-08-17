"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/clients"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/account'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const email = String(formData.get("email") || "").trim()
      const password = String(formData.get("password") || "")

      if (!email || !password) {
        toast({ title: "Missing information", description: "Email and password are required.", variant: "destructive" })
        setIsLoading(false)
        return
      }

      const supabase = createClient()
      console.log('Attempting login with:', { email, passwordLength: password.length });
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Login error:', error);
        // Provide user-friendly messages
        const message =
          error.message?.toLowerCase().includes("invalid login")
            ? "Invalid email or password."
            : error.message?.toLowerCase().includes("email not confirmed")
            ? "Please verify your email before signing in. Check your inbox for a confirmation link."
            : error.message?.toLowerCase().includes("user not found")
            ? "No account found with this email address. Please register first."
            : error.message || "Unable to sign in."

        toast({ title: "Sign in failed", description: message, variant: "destructive" })
        setIsLoading(false)
        return
      }

      // Success
      toast({ title: "Signed in", description: "Welcome back!" })
      router.push(redirectTo)
      router.refresh() // Refresh to update server-side session
    } catch (err: any) {
      toast({ title: "Unexpected error", description: err?.message ?? String(err), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:text-primary/80">
            Sign up here
          </Link>
        </p>
      </div>
    </form>
  )
}
