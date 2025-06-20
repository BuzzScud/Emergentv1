/**
 * Performance monitoring and optimization utilities
 */

import React from 'react';
import { debug } from './debug';

export interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  type: 'render' | 'api' | 'navigation' | 'user-interaction' | 'custom';
  metadata?: Record<string, any>;
}

export interface PerformanceReport {
  metrics: PerformanceMetric[];
  summary: {
    totalMeasurements: number;
    averageDuration: number;
    slowestOperation: PerformanceMetric | null;
    fastestOperation: PerformanceMetric | null;
  };
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private activeTimers: Map<string, PerformanceMetric> = new Map();
  private maxMetrics = 1000;

  private constructor() {
    // Initialize performance observer if available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializePerformanceObserver();
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Start timing an operation
  startTimer(name: string, type: PerformanceMetric['type'] = 'custom', metadata?: Record<string, any>): void {
    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      type,
      metadata
    };

    this.activeTimers.set(name, metric);
    debug.debug(`Performance timer started: ${name}`);
  }

  // End timing an operation
  endTimer(name: string): PerformanceMetric | null {
    const metric = this.activeTimers.get(name);
    if (!metric) {
      debug.warn(`Performance timer '${name}' not found`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    this.activeTimers.delete(name);
    this.addMetric(metric);

    debug.debug(`Performance timer ended: ${name} (${metric.duration.toFixed(2)}ms)`);
    return metric;
  }

  // Measure a function execution
  measureFunction<T>(name: string, fn: () => T, type: PerformanceMetric['type'] = 'custom'): T {
    this.startTimer(name, type);
    try {
      const result = fn();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  // Measure async function execution
  async measureAsync<T>(
    name: string, 
    fn: () => Promise<T>, 
    type: PerformanceMetric['type'] = 'custom'
  ): Promise<T> {
    this.startTimer(name, type);
    try {
      const result = await fn();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  // Mark a navigation event
  markNavigation(route: string): void {
    this.addMetric({
      name: `Navigation to ${route}`,
      startTime: performance.now(),
      type: 'navigation',
      metadata: { route }
    });
  }

  // Mark a user interaction
  markInteraction(action: string, element?: string): void {
    this.addMetric({
      name: `User ${action}`,
      startTime: performance.now(),
      type: 'user-interaction',
      metadata: { action, element }
    });
  }

  // Add a metric to the collection (public method)
  addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Maintain max metrics limit
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    // Log slow operations
    if (metric.duration && metric.duration > 1000) {
      debug.warn(`Slow operation detected: ${metric.name} took ${metric.duration.toFixed(2)}ms`);
    }
  }

  // Get performance report
  getReport(filterByType?: PerformanceMetric['type']): PerformanceReport {
    let filteredMetrics = this.metrics;

    if (filterByType) {
      filteredMetrics = this.metrics.filter(m => m.type === filterByType);
    }

    const metricsWithDuration = filteredMetrics.filter(m => m.duration !== undefined);

    if (metricsWithDuration.length === 0) {
      return {
        metrics: filteredMetrics,
        summary: {
          totalMeasurements: 0,
          averageDuration: 0,
          slowestOperation: null,
          fastestOperation: null
        }
      };
    }

    const totalDuration = metricsWithDuration.reduce((sum, m) => sum + (m.duration || 0), 0);
    const averageDuration = totalDuration / metricsWithDuration.length;

    const slowestOperation = metricsWithDuration.reduce((slowest, current) => 
      (current.duration || 0) > (slowest.duration || 0) ? current : slowest
    );

    const fastestOperation = metricsWithDuration.reduce((fastest, current) => 
      (current.duration || 0) < (fastest.duration || 0) ? current : fastest
    );

    return {
      metrics: filteredMetrics,
      summary: {
        totalMeasurements: metricsWithDuration.length,
        averageDuration,
        slowestOperation,
        fastestOperation
      }
    };
  }

  // Clear all metrics
  clearMetrics(): void {
    this.metrics = [];
    this.activeTimers.clear();
    debug.info('Performance metrics cleared');
  }

  // Initialize performance observer for web vitals
  private initializePerformanceObserver(): void {
    try {
      // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.addMetric({
              name: 'Page Load',
              startTime: navEntry.fetchStart,
              endTime: navEntry.loadEventEnd,
              duration: navEntry.loadEventEnd - navEntry.fetchStart,
              type: 'navigation',
              metadata: {
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
                firstPaint: navEntry.responseEnd - navEntry.fetchStart
              }
            });
          }
        }
      });
      navObserver.observe({ entryTypes: ['navigation'] });

      // Observe resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 100) { // Only log slow resources
            this.addMetric({
              name: `Resource: ${entry.name}`,
              startTime: entry.startTime,
              endTime: entry.startTime + entry.duration,
              duration: entry.duration,
              type: 'custom',
              metadata: {
                resource: entry.name,
                size: (entry as any).transferSize
              }
            });
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

    } catch (error) {
      debug.warn('Failed to initialize performance observer', error);
    }
  }

  // Get current memory usage (if available)
  getMemoryUsage(): any {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  // Log performance summary
  logSummary(): void {
    const report = this.getReport();
    debug.group('Performance Summary', () => {
      debug.info(`Total measurements: ${report.summary.totalMeasurements}`);
      debug.info(`Average duration: ${report.summary.averageDuration.toFixed(2)}ms`);
      
      if (report.summary.slowestOperation) {
        debug.info(`Slowest operation: ${report.summary.slowestOperation.name} (${report.summary.slowestOperation.duration?.toFixed(2)}ms)`);
      }
      
      if (report.summary.fastestOperation) {
        debug.info(`Fastest operation: ${report.summary.fastestOperation.name} (${report.summary.fastestOperation.duration?.toFixed(2)}ms)`);
      }

      const memoryUsage = this.getMemoryUsage();
      if (memoryUsage) {
        debug.info(`Memory usage: ${(memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
      }
    });
  }
}

// Singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for component performance monitoring
export function usePerformanceMonitor(componentName: string) {
  React.useEffect(() => {
    const startTime = performance.now();
    performanceMonitor.addMetric({
      name: `${componentName} Mount`,
      startTime,
      type: 'render'
    });

    return () => {
      const endTime = performance.now();
      performanceMonitor.addMetric({
        name: `${componentName} Unmount`,
        startTime: endTime,
        type: 'render'
      });
    };
  }, [componentName]);

  const measureRender = (actionName: string) => {
    return performanceMonitor.measureFunction(
      `${componentName} ${actionName}`,
      () => {},
      'render'
    );
  };

  return { measureRender };
}

// HOC for component performance monitoring
export function withPerformanceMonitoring<P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
) {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const PerformanceMonitoredComponent: React.FC<P> = (props) => {
    usePerformanceMonitor(displayName);
    return React.createElement(WrappedComponent, props);
  };

  PerformanceMonitoredComponent.displayName = `withPerformanceMonitoring(${displayName})`;
  return PerformanceMonitoredComponent;
}

// Utility functions
export const perf = {
  // Start a timer
  start(name: string, type?: PerformanceMetric['type']) {
    return performanceMonitor.startTimer(name, type);
  },

  // End a timer
  end(name: string) {
    return performanceMonitor.endTimer(name);
  },

  // Measure a function
  measure<T>(name: string, fn: () => T, type?: PerformanceMetric['type']) {
    return performanceMonitor.measureFunction(name, fn, type);
  },

  // Measure an async function
  measureAsync<T>(name: string, fn: () => Promise<T>, type?: PerformanceMetric['type']) {
    return performanceMonitor.measureAsync(name, fn, type);
  },

  // Mark navigation
  nav(route: string) {
    return performanceMonitor.markNavigation(route);
  },

  // Mark interaction
  interaction(action: string, element?: string) {
    return performanceMonitor.markInteraction(action, element);
  },

  // Get report
  report(type?: PerformanceMetric['type']) {
    return performanceMonitor.getReport(type);
  },

  // Log summary
  summary() {
    return performanceMonitor.logSummary();
  },

  // Clear metrics
  clear() {
    return performanceMonitor.clearMetrics();
  }
};

export default performanceMonitor; 