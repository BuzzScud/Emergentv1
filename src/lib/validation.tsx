/**
 * Comprehensive validation utilities for forms and data
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { ErrorHandler } from './error-handler';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class Validator {
  private rules: Record<string, ValidationRule> = {};

  constructor(rules?: Record<string, ValidationRule>) {
    if (rules) {
      this.rules = rules;
    }
  }

  // Add or update validation rule
  addRule(field: string, rule: ValidationRule): void {
    this.rules[field] = rule;
  }

  // Validate a single field
  validateField(field: string, value: any): { isValid: boolean; error?: string } {
    const rule = this.rules[field];
    if (!rule) {
      return { isValid: true };
    }

    // Required validation
    if (rule.required && (value === null || value === undefined || value === '')) {
      return { isValid: false, error: `${field} is required` };
    }

    // Skip other validations if value is empty and not required
    if (!rule.required && (value === null || value === undefined || value === '')) {
      return { isValid: true };
    }

    // String validations
    if (typeof value === 'string') {
      // Min length
      if (rule.minLength && value.length < rule.minLength) {
        return { isValid: false, error: `${field} must be at least ${rule.minLength} characters` };
      }

      // Max length
      if (rule.maxLength && value.length > rule.maxLength) {
        return { isValid: false, error: `${field} must be no more than ${rule.maxLength} characters` };
      }

      // Email validation
      if (rule.email && !this.isValidEmail(value)) {
        return { isValid: false, error: `${field} must be a valid email address` };
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        return { isValid: false, error: `${field} format is invalid` };
      }
    }

    // Number validations
    if (typeof value === 'number') {
      // Min value
      if (rule.min !== undefined && value < rule.min) {
        return { isValid: false, error: `${field} must be at least ${rule.min}` };
      }

      // Max value
      if (rule.max !== undefined && value > rule.max) {
        return { isValid: false, error: `${field} must be no more than ${rule.max}` };
      }
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value);
      if (result !== true) {
        return { 
          isValid: false, 
          error: typeof result === 'string' ? result : `${field} is invalid` 
        };
      }
    }

    return { isValid: true };
  }

  // Validate multiple fields
  validate(data: Record<string, any>): ValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate each field with rules
    Object.keys(this.rules).forEach(field => {
      const result = this.validateField(field, data[field]);
      if (!result.isValid) {
        errors[field] = result.error!;
        isValid = false;
      }
    });

    return { isValid, errors };
  }

  // Email validation helper
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Pre-defined validation rules
export const CommonValidationRules = {
  email: {
    required: true,
    email: true,
    maxLength: 254
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/
  },
  phone: {
    pattern: /^\+?[\d\s-()]+$/,
    minLength: 10
  },
  url: {
    pattern: /^https?:\/\/.+/
  }
};

// Form validation utilities
export class FormValidator {
  private validator: Validator;
  private errors: Record<string, string> = {};
  private touched: Record<string, boolean> = {};

  constructor(rules: Record<string, ValidationRule>) {
    this.validator = new Validator(rules);
  }

  // Validate single field and update state
  validateField(field: string, value: any): boolean {
    const result = this.validator.validateField(field, value);
    
    if (result.isValid) {
      delete this.errors[field];
    } else {
      this.errors[field] = result.error!;
    }
    
    this.touched[field] = true;
    return result.isValid;
  }

  // Validate all fields
  validateAll(data: Record<string, any>): boolean {
    const result = this.validator.validate(data);
    this.errors = result.errors;
    
    // Mark all fields as touched
    Object.keys(data).forEach(field => {
      this.touched[field] = true;
    });
    
    return result.isValid;
  }

  // Get error for specific field
  getError(field: string): string | undefined {
    return this.touched[field] ? this.errors[field] : undefined;
  }

  // Get all errors
  getErrors(): Record<string, string> {
    const visibleErrors: Record<string, string> = {};
    Object.keys(this.errors).forEach(field => {
      if (this.touched[field]) {
        visibleErrors[field] = this.errors[field];
      }
    });
    return visibleErrors;
  }

  // Check if field has error
  hasError(field: string): boolean {
    return this.touched[field] && !!this.errors[field];
  }

  // Check if form is valid
  isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  // Reset validation state
  reset(): void {
    this.errors = {};
    this.touched = {};
  }

  // Mark field as touched
  touch(field: string): void {
    this.touched[field] = true;
  }
}

// React hook for form validation
export function useFormValidation(rules: Record<string, ValidationRule>) {
  const [formValidator] = React.useState(() => new FormValidator(rules));
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isValid, setIsValid] = React.useState(false);

  const validateField = (field: string, value: any): boolean => {
    const result = formValidator.validateField(field, value);
    setErrors(formValidator.getErrors());
    setIsValid(formValidator.isValid());
    return result;
  };

  const validateAll = (data: Record<string, any>): boolean => {
    const result = formValidator.validateAll(data);
    setErrors(formValidator.getErrors());
    setIsValid(result);
    return result;
  };

  const getError = (field: string): string | undefined => {
    return formValidator.getError(field);
  };

  const hasError = (field: string): boolean => {
    return formValidator.hasError(field);
  };

  const reset = (): void => {
    formValidator.reset();
    setErrors({});
    setIsValid(false);
  };

  const touch = (field: string): void => {
    formValidator.touch(field);
    setErrors(formValidator.getErrors());
  };

  return {
    validateField,
    validateAll,
    getError,
    hasError,
    reset,
    touch,
    errors,
    isValid
  };
}

// Sanitization utilities
export const sanitize = {
  // Remove HTML tags
  stripHtml: (input: string): string => {
    return input.replace(/<[^>]*>/g, '');
  },

  // Escape HTML entities
  escapeHtml: (input: string): string => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  // Remove special characters
  alphanumeric: (input: string): string => {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  },

  // Clean phone number
  phone: (input: string): string => {
    return input.replace(/[^\d+()-\s]/g, '');
  },

  // Clean email
  email: (input: string): string => {
    return input.toLowerCase().trim();
  },

  // Trim whitespace
  trim: (input: string): string => {
    return input.trim();
  }
};

// Quick validation functions
export const validate = {
  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  password: (password: string): boolean => {
    return password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  },

  phone: (phone: string): boolean => {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  creditCard: (number: string): boolean => {
    // Luhn algorithm
    const digits = number.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }
};

export default Validator; 