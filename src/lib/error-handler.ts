/**
 * Comprehensive error handling utilities
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { debug } from './debug';

export enum ErrorType {
  VALIDATION = 'validation',
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown'
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
  timestamp: Date;
  stack?: string;
}

export class CustomError extends Error {
  public readonly type: ErrorType;
  public readonly code?: string;
  public readonly statusCode?: number;
  public readonly details?: any;
  public readonly timestamp: Date;

  constructor(
    type: ErrorType,
    message: string,
    code?: string,
    statusCode?: number,
    details?: any
  ) {
    super(message);
    this.type = type;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date();
    this.name = 'CustomError';

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  toJSON(): AppError {
    return {
      type: this.type,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: AppError[] = [];
  private maxQueueSize = 100;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Handle different types of errors
  handleError(error: Error | CustomError | any, context?: string): AppError {
    let appError: AppError;

    if (error instanceof CustomError) {
      appError = error.toJSON();
    } else if (error instanceof Error) {
      appError = {
        type: ErrorType.UNKNOWN,
        message: error.message,
        timestamp: new Date(),
        stack: error.stack
      };
    } else {
      appError = {
        type: ErrorType.UNKNOWN,
        message: typeof error === 'string' ? error : 'Unknown error occurred',
        timestamp: new Date(),
        details: error
      };
    }

    // Add context if provided
    if (context) {
      appError.details = { ...appError.details, context };
    }

    // Log the error
    debug.error(`Error handled: ${appError.message}`, error, appError.details);

    // Add to queue for reporting
    this.addToQueue(appError);

    return appError;
  }

  // Create specific error types
  static createValidationError(message: string, field?: string, value?: any): CustomError {
    return new CustomError(
      ErrorType.VALIDATION,
      message,
      'VALIDATION_ERROR',
      400,
      { field, value }
    );
  }

  static createNetworkError(message: string, url?: string, status?: number): CustomError {
    return new CustomError(
      ErrorType.NETWORK,
      message,
      'NETWORK_ERROR',
      status || 500,
      { url }
    );
  }

  static createAuthError(message: string = 'Authentication required'): CustomError {
    return new CustomError(
      ErrorType.AUTHENTICATION,
      message,
      'AUTH_ERROR',
      401
    );
  }

  static createNotFoundError(resource: string): CustomError {
    return new CustomError(
      ErrorType.NOT_FOUND,
      `${resource} not found`,
      'NOT_FOUND',
      404,
      { resource }
    );
  }

  // Async error handler with retry logic
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        debug.debug(`Attempting operation (attempt ${attempt}/${maxRetries})`);
        return await operation();
      } catch (error) {
        lastError = error as Error;
        debug.warn(`Operation failed on attempt ${attempt}`, error);

        if (attempt === maxRetries) {
          break;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw this.handleError(lastError!, `Failed after ${maxRetries} attempts`);
  }

  // Safe async operation wrapper
  async safeAsync<T>(
    operation: () => Promise<T>,
    fallback?: T
  ): Promise<{ data?: T; error?: AppError }> {
    try {
      const data = await operation();
      return { data };
    } catch (error) {
      const appError = this.handleError(error);
      return { error: appError, data: fallback };
    }
  }

  // Safe sync operation wrapper
  safe<T>(
    operation: () => T,
    fallback?: T
  ): { data?: T; error?: AppError } {
    try {
      const data = operation();
      return { data };
    } catch (error) {
      const appError = this.handleError(error);
      return { error: appError, data: fallback };
    }
  }

  private addToQueue(error: AppError): void {
    this.errorQueue.push(error);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }
  }

  // Get recent errors for debugging
  getRecentErrors(count: number = 10): AppError[] {
    return this.errorQueue.slice(-count);
  }

  // Clear error queue
  clearErrors(): void {
    this.errorQueue = [];
  }

  // Get error statistics
  getErrorStats(): { total: number; byType: Record<string, number> } {
    const total = this.errorQueue.length;
    const byType: Record<string, number> = {};

    this.errorQueue.forEach(error => {
      byType[error.type] = (byType[error.type] || 0) + 1;
    });

    return { total, byType };
  }
}

// Singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions
export function isNetworkError(error: any): boolean {
  return error?.name === 'NetworkError' || 
         error?.message?.includes('fetch') ||
         error?.code === 'NETWORK_ERROR';
}

export function isValidationError(error: any): boolean {
  return error?.type === ErrorType.VALIDATION ||
         error?.code === 'VALIDATION_ERROR';
}

export function formatErrorForUser(error: AppError): string {
  switch (error.type) {
    case ErrorType.VALIDATION:
      return error.message;
    case ErrorType.NETWORK:
      return 'Network connection error. Please check your internet connection.';
    case ErrorType.AUTHENTICATION:
      return 'Please log in to continue.';
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    case ErrorType.SERVER:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

// React error boundary hook
export function useErrorHandler() {
  const handleError = (error: Error | any, context?: string) => {
    return errorHandler.handleError(error, context);
  };

  const safeAsync = async <T>(
    operation: () => Promise<T>,
    fallback?: T
  ): Promise<{ data?: T; error?: AppError }> => {
    return errorHandler.safeAsync(operation, fallback);
  };

  const withRetry = async <T>(
    operation: () => Promise<T>,
    maxRetries?: number,
    delay?: number
  ): Promise<T> => {
    return errorHandler.withRetry(operation, maxRetries, delay);
  };

  return {
    handleError,
    safeAsync,
    withRetry,
    getRecentErrors: () => errorHandler.getRecentErrors(),
    getErrorStats: () => errorHandler.getErrorStats()
  };
}

export default errorHandler; 