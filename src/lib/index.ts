/**
 * Main utility library exports
 * Provides access to all debugging, testing, validation, and performance utilities
 */

// Core debugging system
export {
  debug,
  useComponentDebug,
  ErrorBoundary,
  type DebugConfig,
  type LogLevel
} from './debug';

// Error handling system
export {
  errorHandler,
  ErrorHandler,
  CustomError,
  ErrorType,
  useErrorHandler,
  isNetworkError,
  isValidationError,
  formatErrorForUser,
  type AppError
} from './error-handler';

// Validation system
export {
  Validator,
  FormValidator,
  useFormValidation,
  CommonValidationRules,
  sanitize,
  validate,
  type ValidationRule,
  type ValidationResult
} from './validation';

// Performance monitoring
export {
  performanceMonitor,
  usePerformanceMonitor,
  withPerformanceMonitoring,
  perf,
  type PerformanceMetric,
  type PerformanceReport
} from './performance';

// Testing utilities
export {
  testRunner,
  healthChecker,
  test,
  runSystemTests,
  type TestResult,
  type TestSuite,
  type SystemHealthCheck
} from './testing';

// Utility functions collection
import { debug } from './debug';
import { errorHandler } from './error-handler';
import { performanceMonitor, perf } from './performance';
import { testRunner, healthChecker, test, runSystemTests as runSystemTestsFunction } from './testing';
import { sanitize, validate } from './validation';

export const utils = {
  debug,
  errorHandler,
  performanceMonitor,
  testRunner,
  healthChecker,
  perf,
  test,
  sanitize,
  validate
};

// Main initialization function
export async function initializeUtils(config?: {
  debug?: boolean;
  performanceMonitoring?: boolean;
  runHealthCheck?: boolean;
  runSystemTests?: boolean;
}): Promise<void> {
  const {
    debug: enableDebug = process.env.NODE_ENV === 'development',
    performanceMonitoring = true,
    runHealthCheck = false,
    runSystemTests = false
  } = config || {};

  debug.configure({ enabled: enableDebug });

  if (enableDebug) {
    debug.info('Utility system initialized');
    
    if (performanceMonitoring) {
      debug.info('Performance monitoring enabled');
    }

    if (runHealthCheck) {
      debug.info('Running health check...');
      const healthResults = await healthChecker.runHealthCheck();
      const unhealthyComponents = healthResults.filter(r => r.status !== 'healthy');
      
      if (unhealthyComponents.length > 0) {
        debug.warn(`Health check found ${unhealthyComponents.length} issues:`, unhealthyComponents);
      } else {
        debug.info('All health checks passed');
      }
    }

    if (runSystemTests) {
      debug.info('Running system tests...');
      await runSystemTestsFunction();
    }
  }
}

// Quick access functions for common operations
export const quick = {
  // Quick test
  test: async (name: string, fn: () => void | Promise<void>) => {
    return test.run(name, fn);
  },

  // Quick health check
  health: async () => {
    const results = await healthChecker.runHealthCheck();
    const issues = results.filter(r => r.status !== 'healthy');
    
    if (issues.length === 0) {
      debug.info('System health: All checks passed');
    } else {
      debug.warn(`System health: ${issues.length} issues found`, issues);
    }
    
    return results;
  },

  // Quick performance check
  perf: () => {
    const report = performanceMonitor.getReport();
    debug.info(`Performance: ${report.summary.totalMeasurements} measurements, avg ${report.summary.averageDuration.toFixed(2)}ms`);
    return report;
  },

  // Quick error summary
  errors: () => {
    const stats = errorHandler.getErrorStats();
    debug.info(`Errors: ${stats.total} total`, stats.byType);
    return stats;
  }
};

// Default export with all utilities
const defaultExport = {
  debug,
  errorHandler,
  performanceMonitor,
  testRunner,
  healthChecker,
  utils,
  quick,
  initializeUtils
};

export default defaultExport; 