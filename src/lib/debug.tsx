/**
 * Debug utility system for comprehensive logging and error tracking
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface DebugConfig {
  enabled: boolean;
  level: LogLevel;
  prefix: string;
  timestamp: boolean;
  stackTrace: boolean;
}

class DebugSystem {
  private config: DebugConfig = {
    enabled: process.env.NODE_ENV === 'development',
    level: 'warn', // Changed from 'debug' to 'warn' to reduce logging
    prefix: '[DEBUG]',
    timestamp: false, // Disabled timestamps to improve performance
    stackTrace: false
  };

  private logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  private shouldLog(level: LogLevel): boolean {
    return this.config.enabled && this.logLevels[level] >= this.logLevels[this.config.level];
  }

  private formatMessage(level: LogLevel, message: string, context?: any): string {
    let formattedMessage = `${this.config.prefix} [${level.toUpperCase()}]`;
    
    if (this.config.timestamp) {
      formattedMessage += ` ${new Date().toISOString()}`;
    }
    
    formattedMessage += ` ${message}`;
    
    if (context && typeof context === 'object') {
      formattedMessage += ` ${JSON.stringify(context, null, 2)}`;
    }
    
    return formattedMessage;
  }

  debug(message: string, context?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: any): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: Error | any, context?: any): void {
    if (this.shouldLog('error')) {
      const errorMessage = this.formatMessage('error', message, context);
      console.error(errorMessage);
      
      if (error) {
        console.error('Error details:', error);
        
        if (this.config.stackTrace && error instanceof Error) {
          console.error('Stack trace:', error.stack);
        }
      }
    }
  }

  group(name: string, callback: () => void): void {
    if (this.config.enabled) {
      console.group(`${this.config.prefix} ${name}`);
      try {
        callback();
      } finally {
        console.groupEnd();
      }
    } else {
      callback();
    }
  }

  time(label: string): void {
    if (this.config.enabled) {
      console.time(`${this.config.prefix} ${label}`);
    }
  }

  timeEnd(label: string): void {
    if (this.config.enabled) {
      console.timeEnd(`${this.config.prefix} ${label}`);
    }
  }

  configure(newConfig: Partial<DebugConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Performance monitoring
  measurePerformance<T>(name: string, fn: () => T): T {
    if (!this.config.enabled) {
      return fn();
    }

    const startTime = performance.now();
    try {
      const result = fn();
      const endTime = performance.now();
      this.debug(`Performance: ${name} took ${endTime - startTime}ms`);
      return result;
    } catch (error) {
      const endTime = performance.now();
      this.error(`Performance: ${name} failed after ${endTime - startTime}ms`, error);
      throw error;
    }
  }

  // React component debugging
  componentDidMount(componentName: string, props?: any): void {
    this.debug(`Component mounted: ${componentName}`, props);
  }

  componentWillUnmount(componentName: string): void {
    this.debug(`Component unmounting: ${componentName}`);
  }

  // API call debugging
  apiCall(method: string, url: string, payload?: any): void {
    this.debug(`API Call: ${method} ${url}`, payload);
  }

  apiResponse(method: string, url: string, response: any, duration?: number): void {
    this.debug(`API Response: ${method} ${url} ${duration ? `(${duration}ms)` : ''}`, response);
  }

  apiError(method: string, url: string, error: any, duration?: number): void {
    this.error(`API Error: ${method} ${url} ${duration ? `(${duration}ms)` : ''}`, error);
  }
}

// Create singleton instance
export const debug = new DebugSystem();

// React hook for component debugging
export function useComponentDebug(componentName: string, props?: any) {
  React.useEffect(() => {
    debug.componentDidMount(componentName, props);
    return () => debug.componentWillUnmount(componentName);
  }, [componentName]); // Removed props from dependency array to prevent infinite re-renders
}

// Error boundary utility
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    debug.error('React Error Boundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} />;
      }
      
      return (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
          <p className="text-red-600">{this.state.error.message}</p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-2 text-xs text-red-500 whitespace-pre-wrap">
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Types are already exported above

// Default export
export default debug; 