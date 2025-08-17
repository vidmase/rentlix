"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/clients"

export default function TestAuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userType, setUserType] = useState("find-room")
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const clearLogs = () => setLogs([])

  const testRegistration = async () => {
    setIsLoading(true)
    addLog("Starting registration test...")
    
    try {
      const supabase = createClient()
      const full_name = `${firstName} ${lastName}`.trim()
      
      addLog(`Attempting registration with: ${email}`)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name, 
            user_type: userType,
            first_name: firstName,
            last_name: lastName
          },
        },
      })

      addLog(`Registration response: ${JSON.stringify({ data: !!data, error: !!error })}`)
      
      if (error) {
        addLog(`Registration error: ${error.message}`)
        return
      }

      if (data?.session) {
        addLog("✅ Registration successful - user signed in immediately")
        
        // Check if profile was created
        const { data: profileData, error: profileError } = await supabase
          .from('rentlix_users')
          .select('*')
          .eq('id', data.user?.id)
          .single()

        if (profileData) {
          addLog("✅ Profile created successfully")
        } else {
          addLog(`❌ Profile creation failed: ${profileError?.message}`)
        }
      } else if (data?.user && !data?.session) {
        addLog("✅ User created but email confirmation required")
      } else {
        addLog("❌ Unexpected registration response")
      }
    } catch (err: any) {
      addLog(`❌ Registration exception: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testLogin = async () => {
    setIsLoading(true)
    addLog("Starting login test...")
    
    try {
      const supabase = createClient()
      
      addLog(`Attempting login with: ${email}`)
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      })

      addLog(`Login response: ${JSON.stringify({ data: !!data, error: !!error })}`)
      
      if (error) {
        addLog(`❌ Login error: ${error.message}`)
        return
      }

      if (data?.session) {
        addLog("✅ Login successful")
        
        // Check profile
        const { data: profileData, error: profileError } = await supabase
          .from('rentlix_users')
          .select('*')
          .eq('id', data.user?.id)
          .single()

        if (profileData) {
          addLog(`✅ Profile found: ${profileData.full_name}`)
        } else {
          addLog(`❌ Profile not found: ${profileError?.message}`)
        }
      }
    } catch (err: any) {
      addLog(`❌ Login exception: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testLogout = async () => {
    setIsLoading(true)
    addLog("Logging out...")
    
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      addLog("✅ Logout successful")
    } catch (err: any) {
      addLog(`❌ Logout error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Forms */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="regEmail">Email</Label>
                <Input
                  id="regEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="regPassword">Password</Label>
                <Input
                  id="regPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                />
              </div>
              
              <div>
                <Label htmlFor="userType">User Type</Label>
                <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="find-room">Find a room</option>
                  <option value="find-roommate">Find a roommate</option>
                  <option value="both">Both</option>
                </select>
              </div>
              
              <Button 
                onClick={testRegistration} 
                disabled={isLoading}
                className="w-full"
              >
                Test Registration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={testLogin} 
                  disabled={isLoading}
                  className="flex-1"
                >
                  Test Login
                </Button>
                <Button 
                  onClick={testLogout} 
                  disabled={isLoading}
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Test Logs</CardTitle>
              <Button onClick={clearLogs} variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <p className="text-gray-500">No logs yet. Run a test to see results.</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
