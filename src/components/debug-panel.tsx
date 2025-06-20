"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  debug,
  performanceMonitor,
  errorHandler,
  healthChecker,
  testRunner,
  runSystemTests,
  type SystemHealthCheck
} from '@/lib'
import {
  Bug,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Play,
  Trash2,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface DebugPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function DebugPanel({ isOpen, onClose }: DebugPanelProps) {
  const [healthChecks, setHealthChecks] = useState<SystemHealthCheck[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [testResults, setTestResults] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    performance: true,
    errors: true,
    health: true
  })

  const refreshHealthChecks = async () => {
    try {
      const checks = await healthChecker.runHealthCheck()
      setHealthChecks(checks)
    } catch (error) {
      debug.error('Failed to run health checks', error)
    }
  }

  const runTests = async () => {
    setIsRunningTests(true)
    try {
      await runSystemTests()
      const report = testRunner.generateReport()
      setTestResults(report)
    } catch (error) {
      debug.error('Failed to run system tests', error)
    } finally {
      setIsRunningTests(false)
    }
  }

  const clearData = () => {
    performanceMonitor.clearMetrics()
    errorHandler.clearErrors()
    testRunner.clearResults()
    setTestResults('')
    debug.info('Debug data cleared')
  }

  useEffect(() => {
    if (isOpen) {
      refreshHealthChecks()
    }
  }, [isOpen])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const performanceReport = performanceMonitor.getReport()
  const errorStats = errorHandler.getErrorStats()
  const recentErrors = errorHandler.getRecentErrors(5)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Debug Panel</h2>
            <Badge variant="outline">Development</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearData}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Data
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4 space-y-4">
          {/* Performance Section */}
          <Card>
            <Collapsible
              open={expandedSections.performance}
              onOpenChange={() => toggleSection('performance')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-base">Performance Metrics</CardTitle>
                    </div>
                    {expandedSections.performance ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                  <CardDescription>
                    {performanceReport.summary.totalMeasurements} measurements, 
                    avg {performanceReport.summary.averageDuration.toFixed(2)}ms
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-slate-600">Total Measurements</div>
                      <div className="text-2xl font-bold">{performanceReport.summary.totalMeasurements}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Average Duration</div>
                      <div className="text-2xl font-bold">{performanceReport.summary.averageDuration.toFixed(2)}ms</div>
                    </div>
                  </div>
                  
                  {performanceReport.summary.slowestOperation && (
                    <div className="mb-4">
                      <div className="text-sm text-slate-600">Slowest Operation</div>
                      <div className="font-semibold">{performanceReport.summary.slowestOperation.name}</div>
                      <div className="text-red-600">{performanceReport.summary.slowestOperation.duration?.toFixed(2)}ms</div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => performanceMonitor.logSummary()}
                  >
                    Log Full Report
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Error Section */}
          <Card>
            <Collapsible
              open={expandedSections.errors}
              onOpenChange={() => toggleSection('errors')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <CardTitle className="text-base">Error Tracking</CardTitle>
                    </div>
                    {expandedSections.errors ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                  <CardDescription>
                    {errorStats.total} total errors
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm text-slate-600 mb-2">Error Types</div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(errorStats.byType).map(([type, count]) => (
                        <Badge key={type} variant="outline">
                          {type}: {count}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {recentErrors.length > 0 && (
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Recent Errors</div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {recentErrors.map((error, index) => (
                          <div key={index} className="p-2 bg-red-50 rounded border-l-4 border-red-500">
                            <div className="font-semibold text-red-800">{error.message}</div>
                            <div className="text-xs text-red-600">
                              {error.type} • {error.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Health Check Section */}
          <Card>
            <Collapsible
              open={expandedSections.health}
              onOpenChange={() => toggleSection('health')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">System Health</CardTitle>
                    </div>
                    {expandedSections.health ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                  <CardDescription>
                    {healthChecks.filter(h => h.status === 'healthy').length} of {healthChecks.length} checks passed
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-3">
                    {healthChecks.map((check, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1">
                          {check.status === 'healthy' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : check.status === 'warning' ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{check.component}</div>
                          <div className="text-sm text-slate-600">{check.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshHealthChecks}
                    className="mt-4"
                  >
                    Refresh Health Checks
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Testing Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-base">System Tests</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runTests}
                  disabled={isRunningTests}
                >
                  {isRunningTests ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Tests
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>
                Run comprehensive system tests to verify functionality
              </CardDescription>
            </CardHeader>
            {testResults && (
              <CardContent>
                <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto max-h-60">
                  {testResults}
                </pre>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

// Debug panel trigger button (only shows in development)
export function DebugTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-40"
        title="Open Debug Panel"
      >
        <Bug className="h-5 w-5" />
      </button>
      
      <DebugPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
} 