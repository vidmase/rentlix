import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/clients'

interface UserProfile {
  id: string
  email: string
  full_name: string
  phone?: string
  gender?: string
  occupation?: string
  bio?: string
  date_of_birth?: string
  user_type?: string
  is_verified: boolean
  subscription_tier: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface UseUserReturn {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  error: string | null
  refreshProfile: () => Promise<void>
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('rentlix_users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        setError(error.message)
        return
      }

      setProfile(data)
    } catch (err) {
      console.error('Error in fetchProfile:', err)
      setError('Failed to fetch profile')
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    profile,
    loading,
    error,
    refreshProfile
  }
}
