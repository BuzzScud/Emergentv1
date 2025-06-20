"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { debug, errorHandler } from '@/lib'
// import { useComponentDebug } from '@/lib' // Disabled for production

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user data
const DEMO_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@emergentfortuity.com',
  avatar: '/avatars/shadcn.jpg'
}

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@emergentfortuity.com',
  password: 'demo123'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Add component debugging (disabled to prevent performance issues)
  // useComponentDebug('AuthProvider', { userEmail: user?.email })

  // Check for existing session on mount
  useEffect(() => {
    debug.info('AuthProvider: Checking for existing session')
    
    try {
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        debug.info('AuthProvider: Restored user session', { email: parsedUser.email })
      } else {
        debug.debug('AuthProvider: No existing session found')
      }
    } catch (error) {
      errorHandler.handleError(error, 'AuthProvider: Failed to parse stored user data')
      localStorage.removeItem('auth_user')
      debug.warn('AuthProvider: Removed corrupted session data')
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    debug.info('AuthProvider: Login attempt', { email })
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check demo credentials or allow any email/password for demo purposes
      if (
        (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) ||
        (email.includes('@') && password.length >= 3)
      ) {
        const authenticatedUser = {
          ...DEMO_USER,
          email: email === DEMO_CREDENTIALS.email ? DEMO_CREDENTIALS.email : email
        }
        
        setUser(authenticatedUser)
        localStorage.setItem('auth_user', JSON.stringify(authenticatedUser))
        debug.info('AuthProvider: Login successful', { email: authenticatedUser.email })
        setIsLoading(false)
        return true
      }
      
      debug.warn('AuthProvider: Login failed - invalid credentials', { email })
      setIsLoading(false)
      return false
    } catch (error) {
      errorHandler.handleError(error, 'AuthProvider: Login process failed')
      debug.error('AuthProvider: Login error', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    debug.info('AuthProvider: Logout initiated', { email: user?.email })
    setUser(null)
    localStorage.removeItem('auth_user')
    debug.info('AuthProvider: Logout completed')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 