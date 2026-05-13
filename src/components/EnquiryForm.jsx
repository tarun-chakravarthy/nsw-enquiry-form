import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, submitForm } from '../redux/enquirySlice';
import { saveToSession } from '../utils/sessionStorage';
import './EnquiryForm.css';

export default function EnquiryForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.enquiry.formData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.enquiryType) {
      newErrors.enquiryType = 'Please select an enquiry type';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(submitForm());
      const state = {
        enquiry: {
          formData,
          submittedData: formData,
          isSubmitted: true,
        },
      };
      saveToSession(state);
    }
  };

  return (
    <div className="enquiry-form-container">
      <h1>Revenue NSW - Customer Enquiry Form</h1>
      <form onSubmit={handleSubmit} className="enquiry-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={errors.fullName ? 'input-error' : ''}
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number (10 digits)"
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="enquiryType">Enquiry Type *</label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleInputChange}
            className={errors.enquiryType ? 'input-error' : ''}
          >
            <option value="">-- Select an option --</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Tax Related">Tax Related</option>
            <option value="License/Permit">License/Permit</option>
            <option value="Other">Other</option>
          </select>
          {errors.enquiryType && (
            <span className="error-message">{errors.enquiryType}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Please describe your enquiry in detail..."
            rows="5"
            className={errors.message ? 'input-error' : ''}
          ></textarea>
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}
