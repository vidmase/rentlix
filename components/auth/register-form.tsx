"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import { createClient } from "@/utils/supabase/clients"
import { useToast } from "@/hooks/use-toast"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const firstName = String(formData.get("firstName") || "").trim()
      const lastName = String(formData.get("lastName") || "").trim()
      const email = String(formData.get("email") || "").trim()
      const password = String(formData.get("password") || "")
      const selectedUserType = userType

      if (!firstName || !lastName || !email || !password || !selectedUserType) {
        toast({ title: "Missing information", description: "Please fill in all fields.", variant: "destructive" })
        setIsLoading(false)
        return
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" })
        setIsLoading(false)
        return
      }

      // Password strength validation
      if (password.length < 8) {
        toast({ title: "Weak password", description: "Password must be at least 8 characters long.", variant: "destructive" })
        setIsLoading(false)
        return
      }

      const supabase = createClient()
      const full_name = `${firstName} ${lastName}`.trim()

      console.log('Attempting signUp with:', { email, passwordLength: password.length, full_name, user_type: selectedUserType });
      
      // Step 1: Create auth user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name, 
            user_type: selectedUserType,
            first_name: firstName,
            last_name: lastName
          },
        },
      })

      console.log('Supabase signUp response:', { data, error });

      if (error) {
        console.error("Supabase signUp error:", error)
        toast({ 
          title: "Registration failed", 
          description: `${error.message} (Code: ${error.status || 'unknown'})`, 
          variant: "destructive" 
        })
        setIsLoading(false)
        return
      }

      // Step 2: Handle registration response
      if (data?.session) {
        // Email confirmation disabled -> user is signed in immediately
        console.log('User signed in immediately, session created');
        
        // The trigger should have created the rentlix_users profile automatically
        // Verify profile was created
        const { data: profileData, error: profileError } = await supabase
          .from('rentlix_users')
          .select('*')
          .eq('id', data.user?.id)
          .single()

        console.log('Profile check result:', { profileData, profileError });

        if (profileError || !profileData) {
          console.error("Profile verification failed:", profileError)
          // Try to create profile manually as fallback
          const { error: insertError } = await supabase
            .from('rentlix_users')
            .insert({
              id: data.user?.id,
              email: data.user?.email,
              full_name: full_name,
              is_verified: data.user?.email_confirmed_at ? true : false
            })

          if (insertError) {
            console.error("Manual profile creation failed:", insertError)
            toast({ title: "Profile creation warning", description: "Account created but profile setup incomplete.", variant: "destructive" })
          } else {
            console.log('Manual profile creation successful');
          }
        } else {
          console.log('Profile already exists');
        }

        toast({ title: "Welcome!", description: "Your account has been created successfully." })
        router.push("/account")
      } else if (data?.user && !data?.session) {
        // Email confirmation enabled -> guide user to check email
        console.log('User created but email confirmation required');
        toast({
          title: "Check your email",
          description: "We sent you a confirmation link to verify your account. Please check your email and click the verification link before signing in.",
        })
        router.push("/login?checkEmail=1")
      } else {
        // Unexpected response
        console.error("Unexpected registration response:", data);
        toast({
          title: "Registration issue",
          description: "Account creation completed but there was an unexpected response. Please try logging in.",
        })
        router.push("/login")
      }
      
      form.reset()
      setUserType("")
    } catch (err: any) {
      console.error("Registration error:", err)
      toast({ title: "Unexpected error", description: err?.message ?? String(err), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" type="text" required className="mt-1" placeholder="First name" />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" type="text" required className="mt-1" placeholder="Last name" />
        </div>
      </div>

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
        <Label htmlFor="userType">I am looking to</Label>
        <Select value={userType} onValueChange={setUserType} required>
          <input type="hidden" name="userType" value={userType} />
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="find-room">Find a room</SelectItem>
            <SelectItem value="find-roommate">Find a roommate</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Create a strong password (min 8 characters)"
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
        <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm leading-5">
          I agree to the{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Privacy Policy
          </Button>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}

