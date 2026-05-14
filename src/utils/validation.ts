/**
 * Input validation and sanitization utilities
 */

// Sanitize user input to prevent XSS attacks
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input.replace(/[<>"']/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char] || char));
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const sanitized = phone.replace(/\D/g, '');
  if (sanitized.length !== 10) return phone;
  return `(0${sanitized.slice(1, 3)}) ${sanitized.slice(3, 7)} ${sanitized.slice(7)}`;
};

// Validation rules for each form field
export const validators = {
  fullName: (value: string): string | null => {
    const sanitized = sanitizeInput(value);
    if (!sanitized) return 'Full name is required';
    if (sanitized.length < 2) return 'Full name must be at least 2 characters';
    if (sanitized.length > 100) return 'Full name must be less than 100 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(sanitized))
      return 'Full name can only contain letters, spaces, hyphens, and apostrophes';
    return null;
  },

  email: (value: string): string | null => {
    const sanitized = sanitizeInput(value);
    if (!sanitized) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized))
      return 'Please enter a valid email address';
    if (sanitized.length > 254) return 'Email address is too long';
    return null;
  },

  phone: (value: string): string | null => {
    const sanitized = value.replace(/\D/g, '');
    if (!sanitized) return 'Phone number is required';
    if (sanitized.length !== 10) return 'Please enter a valid 10-digit phone number';
    return null;
  },

  enquiryType: (value: string): string | null => {
    if (!value) return 'Please select an enquiry type';
    const validTypes = ['General Inquiry', 'Property Related', 'Lodgement', 'Other'];
    if (!validTypes.includes(value)) return 'Invalid enquiry type selected';
    return null;
  },

  message: (value: string): string | null => {
    const sanitized = sanitizeInput(value);
    if (!sanitized) return 'Message is required';
    if (sanitized.length < 10) return 'Message must be at least 10 characters';
    if (sanitized.length > 2000) return 'Message must be less than 2000 characters';
    return null;
  },
};
