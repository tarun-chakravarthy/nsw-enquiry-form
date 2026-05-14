/**
 * Reusable form field component - reduces repetition in forms
 */

import { ChangeEvent } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  rows?: number;
  isTextarea?: boolean;
}

const ErrorIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export function FormField({
  label,
  name,
  type = 'text',
  value,
  error,
  onChange,
  placeholder,
  maxLength,
  disabled,
  rows,
  isTextarea,
}: FormFieldProps) {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;

  const inputClassName = `input-field ${error ? 'error' : ''}`;

  return (
    <div className="form-group">
      <label htmlFor={inputId} className="form-label">
        {label} <span className="text-error-500">*</span>
      </label>

      {isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={rows}
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      )}

      {error && (
        <div id={errorId} className="error-text">
          <ErrorIcon />
          {error}
        </div>
      )}

      {isTextarea && maxLength && (
        <div className="text-xs text-gray-500 text-right mt-1">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
