import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/clients'

interface UseCreditsReturn {
  credits: number
  loading: boolean
  error: string | null
  refreshCredits: () => Promise<void>
  deductCredits: (amount: number, listingId?: string) => Promise<boolean>
}

export function useCredits(): UseCreditsReturn {
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchCredits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setCredits(0)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('rentlix_users')
        .select('credits')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching credits:', error)
        setError(error.message)
      } else {
        setCredits(data?.credits || 0)
      }
    } catch (err: any) {
      console.error('Error in fetchCredits:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const refreshCredits = async () => {
    setLoading(true)
    await fetchCredits()
  }

  const deductCredits = async (amount: number, listingId?: string): Promise<boolean> => {
    try {
      console.log('deductCredits called with amount:', amount, 'listingId:', listingId)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('User not authenticated')
        setError('User not authenticated')
        return false
      }

      console.log('Current user:', user.id, 'Current credits:', credits)

      // Call the database function to deduct credits
      const { data, error } = await supabase.rpc('deduct_credits_for_listing', {
        p_user_id: user.id,
        p_credits_needed: amount,
        p_listing_id: listingId
      })

      console.log('RPC response:', { data, error })

      if (error) {
        console.error('Error deducting credits:', error)
        setError(error.message)
        return false
      }

      if (data) {
        console.log('Credits deducted successfully, refreshing...')
        // Refresh credits after successful deduction
        await refreshCredits()
        return true
      } else {
        console.error('Insufficient credits')
        setError('Insufficient credits')
        return false
      }
    } catch (err: any) {
      console.error('Error in deductCredits:', err)
      setError(err.message)
      return false
    }
  }

  useEffect(() => {
    fetchCredits()
  }, [])

  return {
    credits,
    loading,
    error,
    refreshCredits,
    deductCredits
  }
}
