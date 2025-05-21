// AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { supabase } from '../lib/supabaseClient'
import type { User as SupabaseUser, Session } from '@supabase/supabase-js'

export const AuthContext = createContext<SupabaseUser | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession: Session | null) => {
        setUser(newSession?.user ?? null)
      }
    )

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false) // Set loading to false after session is checked
      })
      .catch(() => setLoading(false))

    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [])

  if (loading) return <div>Loading...</div> // Prevent rendering children until session is checked

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUser = () => useContext(AuthContext)
