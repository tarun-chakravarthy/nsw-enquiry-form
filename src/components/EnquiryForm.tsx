import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, submitForm } from '../redux/enquirySlice';
import { validators, sanitizeInput } from '../utils/validation';
import { FormField } from './FormField';
import type { RootState, AppDispatch } from '../redux/store';

interface FormErrors {
  [key: string]: string;
}

export default function EnquiryForm() {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.enquiry.formData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(validators) as Array<keyof typeof validators>).forEach((field) => {
      const error = validators[field](formData[field as never]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitized = name === 'phone' ? value : sanitizeInput(value);
    dispatch(updateFormData({ [name]: sanitized }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(submitForm());
      setIsSubmitting(false);
    }, 300);
  };

  const enquiryOptions = ['General Inquiry', 'Property Related', 'Lodgement', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Revenue NSW</h1>
          <p className="text-lg text-gray-600 mb-1">Customer Enquiry Form</p>
          <p className="text-sm text-gray-500">Please fill in the form below to submit your enquiry</p>
        </div>

        {/* Form */}
        <div className="card overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <FormField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g., John Smith"
              maxLength={100}
              disabled={isSubmitting}
              error={errors.fullName}
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., john.smith@example.com"
              maxLength={254}
              disabled={isSubmitting}
              error={errors.email}
            />

            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g., (02) 1234 5678"
              disabled={isSubmitting}
              error={errors.phone}
            />

            {/* Enquiry Type */}
            <div className="form-group">
              <label htmlFor="enquiryType" className="form-label">
                Enquiry Type <span className="text-error-500">*</span>
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleInputChange as any}
                disabled={isSubmitting}
                className={`input-field appearance-none bg-right cursor-pointer ${errors.enquiryType ? 'error' : ''}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="">Select an enquiry type</option>
                {enquiryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.enquiryType && (
                <div className="error-text">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.enquiryType}
                </div>
              )}
            </div>

            <FormField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please provide details about your enquiry..."
              maxLength={2000}
              disabled={isSubmitting}
              rows={6}
              isTextarea
              error={errors.message}
            />

            {/* Submit */}
            <button type="submit" disabled={isSubmitting} className="btn-primary mt-8">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Enquiry
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p><span className="text-error-500">*</span> Indicates required fields</p>
          <p className="mt-2">Your information will be kept secure and confidential</p>
        </div>
      </div>
    </div>
  );
}
