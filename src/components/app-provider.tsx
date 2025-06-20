"use client"

import React, { useEffect, useState } from 'react'
import { initializeUtils, ErrorBoundary, debug } from '@/lib'

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize utility systems with minimal performance impact
        await initializeUtils({
          debug: process.env.NODE_ENV === 'development',
          performanceMonitoring: false, // Disabled to prevent freezing
          runHealthCheck: false, // Disabled to prevent freezing
          runSystemTests: false
        })

        debug.info('Application initialized successfully')
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize application:', error)
        setIsInitialized(true) // Continue even if initialization fails
      }
    }

    initializeApp()
  }, [])

  // Custom error fallback component
  const ErrorFallback = ({ error }: { error: Error }) => (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-red-600 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-red-800 mb-2">Application Error</h1>
        <p className="text-red-600 mb-4">
          Something went wrong. Please refresh the page or contact support if the problem persists.
        </p>
        <details className="text-left bg-red-100 p-4 rounded-lg">
          <summary className="cursor-pointer text-red-700 font-semibold">Error Details</summary>
          <pre className="mt-2 text-sm text-red-600 whitespace-pre-wrap">
            {error.message}
            {process.env.NODE_ENV === 'development' && error.stack}
          </pre>
        </details>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  )

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Initializing application...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      {children}
    </ErrorBoundary>
  )
} 