"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Menu,
  X,
  Home,
  MessageCircle,
  Heart,
  Search,
  Plus,
  Bell,
  User,
  Settings,
  Moon,
  Sun,
  ChevronDown,
  MapPin,
  Clock,
  Star,
  Coins,
  Sparkles,
} from "lucide-react"
import { createClient } from "@/utils/supabase/clients"
import { useCredits } from "@/hooks/use-credits"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any | null>(null)
  const [displayName, setDisplayName] = useState<string>("")

  const searchRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Get real user credits
  const { credits: userCredits } = useCredits()
  
  // Mock data
  const unreadCount = 3
  const notificationCount = 5

  // Supabase auth/profile fetch
  useEffect(() => {
    const supabase = createClient()
    const init = async () => {
      const { data: authData } = await supabase.auth.getUser()
      const currentUser = authData?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        const { data: profile } = await supabase
          .from("rentlix_users")
          .select("full_name")
          .eq("id", currentUser.id)
          .single()
        setDisplayName(profile?.full_name || currentUser.email || "Account")
      } else {
        setDisplayName("")
      }
    }
    init()

    // Optional: listen to auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      init()
    })
    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setDisplayName("")
    setIsProfileOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const mockNotifications = [
    { id: 1, type: "message", text: "New message from Sarah about the room in Camden", time: "2m ago", unread: true },
    { id: 2, type: "favorite", text: "A property you favorited has reduced its price", time: "1h ago", unread: true },
    { id: 3, type: "match", text: "New roommate match found based on your preferences", time: "3h ago", unread: false },
  ]

  const mockSearchSuggestions = [
    { type: "location", text: "London, Camden", icon: MapPin },
    { type: "recent", text: "Studio apartments under £800", icon: Clock },
    { type: "popular", text: "Pet-friendly rooms", icon: Star },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 border border-purple-200">
                <Home className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 tracking-tight">Rentlix</span>
              <span className="text-xs text-gray-500 -mt-0.5 font-medium hidden sm:block">Find Your Perfect Match</span>
            </div>
          </Link>

          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search rooms, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="pl-11 pr-4 py-2.5 w-full bg-gray-50/80 border-gray-200 focus:border-purple-300 focus:bg-white transition-all duration-200 rounded-xl text-sm shadow-sm focus:shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl z-50 animate-in slide-in-from-top-1 duration-300 fade-in">
                <div className="p-3">
                  <div className="text-xs font-medium text-muted-foreground/70 px-3 py-2 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-primary/60" />
                    Quick suggestions
                  </div>
                  {mockSearchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 text-left group"
                      onClick={() => {
                        setSearchQuery(suggestion.text)
                        setIsSearchOpen(false)
                      }}
                    >
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-200">
                        <suggestion.icon className="h-3 w-3 text-primary/70" />
                      </div>
                      <span className="text-sm font-medium">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="/browse"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium text-sm"
            >
              <Search className="h-4 w-4" />
              <span>Browse</span>
            </Link>

            <Link
              href="/post-ad"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Post Ad</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium text-sm"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Link>

            <Link
              href="/messages"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium text-sm"
            >
              <div className="relative">
                <MessageCircle className="h-4 w-4 text-primary" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 border border-white rounded-full shadow-sm"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <span>Messages</span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {user && (
              <Link
                href="/credits"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-200 hover:border-orange-300 transition-all duration-200 hover:bg-orange-100"
                title="View credits balance"
              >
                <Coins className="h-4 w-4 text-orange-600" />
                <div className="flex flex-col items-start">
                  <span className="font-bold text-sm text-orange-700 leading-none">{userCredits}</span>
                  <span className="text-xs text-orange-600 leading-none">credits</span>
                </div>
              </Link>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="relative w-4 h-4">
                <Sun
                  className={`h-4 w-4 absolute transition-all duration-300 text-gray-600 ${isDarkMode ? "rotate-180 opacity-0" : "rotate-0 opacity-100"}`}
                />
                <Moon
                  className={`h-4 w-4 absolute transition-all duration-300 text-gray-600 ${isDarkMode ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}
                />
              </div>
            </button>

            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
                title="Notifications"
              >
                <Bell className="h-4 w-4 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 border border-white rounded-full shadow-sm"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl z-50 animate-in slide-in-from-top-1 duration-300 fade-in">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-base flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        Notifications
                      </h3>
                      <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10">
                        Mark all read
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${
                            notification.unread
                              ? "bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/15"
                              : "bg-white/50 border-white/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted-foreground/30"}`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{notification.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-3 text-xs hover:bg-primary/10">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-sm">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 text-gray-600 ${isProfileOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl z-50 animate-in slide-in-from-top-1 duration-300 fade-in">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{displayName || "Account"}</p>
                          <p className="text-xs text-muted-foreground">Member</p>
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4 text-yellow-600" />
                            <span className="text-xs font-medium text-yellow-700">Credits</span>
                          </div>
                          <span className="font-bold text-lg text-yellow-700">{userCredits}</span>
                        </div>
                        <Link
                          href="/credits"
                          className="text-xs text-yellow-600 hover:text-yellow-700 transition-colors mt-1 block"
                        >
                          View history & buy more →
                        </Link>
                      </div>

                      <div className="space-y-1">
                        <Link
                          href="/credits"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 group"
                        >
                          <Coins className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium">My Credits</span>
                        </Link>
                        <Link
                          href="/account"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 group"
                        >
                          <Settings className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium">Settings</span>
                        </Link>
                        <hr className="my-2 border-white/20" />
                        <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 w-full text-left text-red-600">
                          <X className="h-4 w-4" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="font-medium hover:bg-gray-100 transition-all duration-200 px-4 py-2 rounded-xl text-sm text-gray-700"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 px-4 py-2 rounded-xl text-sm"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="py-4 border-t border-white/20 bg-gradient-to-b from-white/5 to-transparent">
            <div className="px-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 w-full bg-white/60 backdrop-blur-sm border-white/30 rounded-full text-sm"
                />
              </div>
            </div>

            <nav className="flex flex-col space-y-1 px-4">
              <Link
                href="/browse"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/8 hover:to-secondary/8 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4 text-primary" />
                <span className="font-medium">Browse Listings</span>
              </Link>
              <Link
                href="/post-ad"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/8 hover:to-secondary/8 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="h-4 w-4 text-secondary" />
                <span className="font-medium">Post Ad</span>
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/8 hover:to-secondary/8 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4 text-pink-600" />
                <span className="font-medium">Favorites</span>
              </Link>
              <Link
                href="/messages"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/8 hover:to-secondary/8 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border border-white rounded-full"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <span className="font-medium">Messages</span>
              </Link>

              <div className="flex flex-col space-y-2 pt-4 mt-4 border-t border-white/20">
                {user ? (
                  <div className="px-4">
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-white/20">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{displayName || "Account"}</p>
                        <p className="text-sm text-muted-foreground">Member</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-700">Credits</span>
                        </div>
                        <span className="font-bold text-xl text-yellow-700">{userCredits}</span>
                      </div>
                      <Link
                        href="/credits"
                        className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors mt-1 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        View history & buy more →
                      </Link>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mb-2 bg-white/50 backdrop-blur-sm border-white/30 hover:bg-white/70 font-medium py-2.5 rounded-xl text-sm"
                    >
                      My Profile
                    </Button>
                    <Button onClick={handleSignOut}
                      variant="ghost"
                      className="w-full text-red-600 hover:bg-red-50 font-medium py-2.5 rounded-xl text-sm"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="px-4 space-y-2">
                    <Button
                      variant="ghost"
                      asChild
                      className="justify-start font-medium w-full py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-primary/8 hover:to-secondary/8 text-sm"
                    >
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium shadow-md w-full py-2.5 rounded-xl text-sm"
                    >
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
