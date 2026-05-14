/**
 * Reusable form field component - reduces repetition in forms
 */

import { ChangeEvent } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

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
          <FiAlertCircle className="w-4 h-4 shrink-0" />
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
