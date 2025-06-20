/**
 * Comprehensive testing utilities for the application
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { debug } from './debug';
import { errorHandler } from './error-handler';
import { performanceMonitor } from './performance';

export interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
  metadata?: Record<string, any>;
}

export interface TestSuite {
  name: string;
  tests: TestResult[];
  passed: number;
  failed: number;
  totalDuration: number;
}

export interface SystemHealthCheck {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: any;
}

class TestRunner {
  private static instance: TestRunner;
  private testSuites: TestSuite[] = [];
  private currentSuite: TestSuite | null = null;

  private constructor() {}

  static getInstance(): TestRunner {
    if (!TestRunner.instance) {
      TestRunner.instance = new TestRunner();
    }
    return TestRunner.instance;
  }

  // Start a new test suite
  suite(name: string): void {
    this.currentSuite = {
      name,
      tests: [],
      passed: 0,
      failed: 0,
      totalDuration: 0
    };
    debug.info(`Starting test suite: ${name}`);
  }

  // Run a single test
  async test(name: string, testFn: () => Promise<void> | void): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      debug.debug(`Running test: ${name}`);
      await testFn();
      
      const duration = performance.now() - startTime;
      const result: TestResult = {
        name,
        passed: true,
        duration
      };

      this.addTestResult(result);
      debug.info(`✅ Test passed: ${name} (${duration.toFixed(2)}ms)`);
      return result;

    } catch (error) {
      const duration = performance.now() - startTime;
      const result: TestResult = {
        name,
        passed: false,
        duration,
        error: error instanceof Error ? error.message : String(error)
      };

      this.addTestResult(result);
      debug.error(`❌ Test failed: ${name} (${duration.toFixed(2)}ms)`, error);
      return result;
    }
  }

  //ドライラン test
  assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  // Assert equality
  assertEqual<T>(actual: T, expected: T, message?: string): void {
    if (actual !== expected) {
      const msg = message || `Expected ${expected}, but got ${actual}`;
      throw new Error(msg);
    }
  }

  // Assert deep equality for objects
  assertDeepEqual(actual: any, expected: any, message?: string): void {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      const msg = message || `Objects are not deeply equal`;
      throw new Error(msg);
    }
  }

  // Assert that function throws
  async assertThrows(fn: () => Promise<void> | void, message?: string): Promise<void> {
    let threw = false;
    try {
      await fn();
    } catch {
      threw = true;
    }
    
    if (!threw) {
      const msg = message || 'Expected function to throw an error';
      throw new Error(msg);
    }
  }

  // Finish current test suite
  endSuite(): TestSuite | null {
    if (!this.currentSuite) {
      debug.warn('No active test suite to end');
      return null;
    }

    this.testSuites.push(this.currentSuite);
    debug.info(`Test suite completed: ${this.currentSuite.name}`);
    debug.info(`Results: ${this.currentSuite.passed} passed, ${this.currentSuite.failed} failed`);
    
    const suite = this.currentSuite;
    this.currentSuite = null;
    return suite;
  }

  // Add test result to current suite
  private addTestResult(result: TestResult): void {
    if (!this.currentSuite) {
      debug.warn('No active test suite for test result');
      return;
    }

    this.currentSuite.tests.push(result);
    this.currentSuite.totalDuration += result.duration;

    if (result.passed) {
      this.currentSuite.passed++;
    } else {
      this.currentSuite.failed++;
    }
  }

  // Get all test results
  getAllResults(): TestSuite[] {
    return this.testSuites;
  }

  // Clear all test results
  clearResults(): void {
    this.testSuites = [];
    this.currentSuite = null;
  }

  // Generate test report
  generateReport(): string {
    let report = '=== Test Report ===\n\n';

    for (const suite of this.testSuites) {
      report += `Suite: ${suite.name}\n`;
      report += `Passed: ${suite.passed}, Failed: ${suite.failed}\n`;
      report += `Total Duration: ${suite.totalDuration.toFixed(2)}ms\n\n`;

      for (const test of suite.tests) {
        const status = test.passed ? '✅' : '❌';
        report += `  ${status} ${test.name} (${test.duration.toFixed(2)}ms)\n`;
        if (!test.passed && test.error) {
          report += `    Error: ${test.error}\n`;
        }
      }
      report += '\n';
    }

    return report;
  }
}

// System health checker
class HealthChecker {
  private static instance: HealthChecker;
  
  private constructor() {}

  static getInstance(): HealthChecker {
    if (!HealthChecker.instance) {
      HealthChecker.instance = new HealthChecker();
    }
    return HealthChecker.instance;
  }

  // Run comprehensive health check
  async runHealthCheck(): Promise<SystemHealthCheck[]> {
    const checks: SystemHealthCheck[] = [];

    // Check browser environment
    checks.push(this.checkBrowserEnvironment());

    // Check performance
    checks.push(this.checkPerformance());

    // Check error rates
    checks.push(this.checkErrorRates());

    // Check local storage
    checks.push(this.checkLocalStorage());

    // Check network connectivity
    checks.push(await this.checkNetworkConnectivity());

    return checks;
  }

  private checkBrowserEnvironment(): SystemHealthCheck {
    try {
      const hasLocalStorage = typeof localStorage !== 'undefined';
      const hasSessionStorage = typeof sessionStorage !== 'undefined';
      const hasPerformance = typeof performance !== 'undefined';
      
      if (!hasLocalStorage || !hasSessionStorage || !hasPerformance) {
        return {
          component: 'Browser Environment',
          status: 'warning',
          message: 'Some browser features are not available',
          details: { hasLocalStorage, hasSessionStorage, hasPerformance }
        };
      }

      return {
        component: 'Browser Environment',
        status: 'healthy',
        message: 'All required browser features are available'
      };
    } catch (error) {
      return {
        component: 'Browser Environment',
        status: 'error',
        message: 'Failed to check browser environment',
        details: error
      };
    }
  }

  private checkPerformance(): SystemHealthCheck {
    try {
      const report = performanceMonitor.getReport();
      const avgDuration = report.summary.averageDuration;

      if (avgDuration > 1000) {
        return {
          component: 'Performance',
          status: 'warning',
          message: `Average operation duration is high: ${avgDuration.toFixed(2)}ms`,
          details: report.summary
        };
      }

      if (avgDuration > 2000) {
        return {
          component: 'Performance',
          status: 'error',
          message: `Average operation duration is critical: ${avgDuration.toFixed(2)}ms`,
          details: report.summary
        };
      }

      return {
        component: 'Performance',
        status: 'healthy',
        message: `Performance is good: ${avgDuration.toFixed(2)}ms average`
      };
    } catch (error) {
      return {
        component: 'Performance',
        status: 'error',
        message: 'Failed to check performance metrics',
        details: error
      };
    }
  }

  private checkErrorRates(): SystemHealthCheck {
    try {
      const errorStats = errorHandler.getErrorStats();
      const errorRate = errorStats.total;

      if (errorRate > 10) {
        return {
          component: 'Error Rates',
          status: 'warning',
          message: `High error rate detected: ${errorRate} errors`,
          details: errorStats
        };
      }

      if (errorRate > 20) {
        return {
          component: 'Error Rates',
          status: 'error',
          message: `Critical error rate: ${errorRate} errors`,
          details: errorStats
        };
      }

      return {
        component: 'Error Rates',
        status: 'healthy',
        message: `Error rate is acceptable: ${errorRate} errors`
      };
    } catch (error) {
      return {
        component: 'Error Rates',
        status: 'error',
        message: 'Failed to check error rates',
        details: error
      };
    }
  }

  private checkLocalStorage(): SystemHealthCheck {
    try {
      const testKey = '_health_check_test';
      const testValue = 'test';
      
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (retrieved !== testValue) {
        return {
          component: 'Local Storage',
          status: 'error',
          message: 'Local storage is not working correctly'
        };
      }

      return {
        component: 'Local Storage',
        status: 'healthy',
        message: 'Local storage is working correctly'
      };
    } catch (error) {
      return {
        component: 'Local Storage',
        status: 'error',
        message: 'Local storage is not available',
        details: error
      };
    }
  }

  private async checkNetworkConnectivity(): Promise<SystemHealthCheck> {
    try {
      // Simple connectivity check using a lightweight request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/', {
        method: 'HEAD',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          component: 'Network Connectivity',
          status: 'warning',
          message: `Network response not OK: ${response.status}`,
          details: { status: response.status, statusText: response.statusText }
        };
      }

      return {
        component: 'Network Connectivity',
        status: 'healthy',
        message: 'Network connectivity is good'
      };
    } catch (error) {
      return {
        component: 'Network Connectivity',
        status: 'error',
        message: 'Network connectivity issues detected',
        details: error
      };
    }
  }
}

// Singleton instances
export const testRunner = TestRunner.getInstance();
export const healthChecker = HealthChecker.getInstance();

// Utility functions for quick testing
export const test = {
  // Run a quick test
  run: async (name: string, testFn: () => Promise<void> | void) => {
    testRunner.suite('Quick Test');
    await testRunner.test(name, testFn);
    return testRunner.endSuite();
  },

  // Assert functions
  assert: (condition: boolean, message: string) => testRunner.assert(condition, message),
  assertEqual: function<T>(actual: T, expected: T, message?: string) { return testRunner.assertEqual(actual, expected, message); },
  assertDeepEqual: (actual: any, expected: any, message?: string) => testRunner.assertDeepEqual(actual, expected, message),
  assertThrows: (fn: () => Promise<void> | void, message?: string) => testRunner.assertThrows(fn, message),

  // Health check
  health: () => healthChecker.runHealthCheck(),

  // Generate reports
  report: () => testRunner.generateReport()
};

// Development helper to run all system tests
export async function runSystemTests(): Promise<void> {
  debug.info('Starting comprehensive system tests...');

  testRunner.suite('System Health Tests');

  // Test debug system
  await testRunner.test('Debug System', () => {
    debug.debug('Test debug message');
    debug.info('Test info message');
    debug.warn('Test warning message');
    // Don't test error as it would add to error count
  });

  // Test error handler
  await testRunner.test('Error Handler', () => {
    try {
      throw new Error('Test error');
    } catch (error) {
      const appError = errorHandler.handleError(error, 'System test');
      testRunner.assert(appError.type === 'unknown', 'Error should be handled correctly');
    }
  });

  // Test performance monitor
  await testRunner.test('Performance Monitor', () => {
    performanceMonitor.startTimer('test-timer');
    performanceMonitor.endTimer('test-timer');
    const report = performanceMonitor.getReport();
    testRunner.assert(report.metrics.length > 0, 'Performance metrics should be recorded');
  });

  // Test health checker
  await testRunner.test('Health Checker', async () => {
    const healthChecks = await healthChecker.runHealthCheck();
    testRunner.assert(healthChecks.length > 0, 'Health checks should be performed');
  });

  const results = testRunner.endSuite();
  
  if (results) {
    debug.info(`System tests completed: ${results.passed} passed, ${results.failed} failed`);
    
    if (results.failed > 0) {
      debug.warn('Some system tests failed. Check the detailed report.');
      console.log(testRunner.generateReport());
    }
  }
}

export default testRunner; 