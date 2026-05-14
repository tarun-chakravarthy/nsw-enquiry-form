/**
 * Session Storage Utilities
 * Stores form draft data to resume incomplete enquiries
 * Note: Key must match interview prep specification
 */

const SESSION_KEY = 'rnsw_enquiry_draft';

interface EnquiryState {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    enquiryType: string;
    message: string;
  };
  submittedData: EnquiryState['formData'] | null;
  isSubmitted: boolean;
}

interface RootState {
  enquiry: EnquiryState;
}

export const saveToSession = (state: RootState): void => {
  try {
    const { formData, submittedData, isSubmitted } = state.enquiry;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ formData, submittedData, isSubmitted }));
  } catch (error) {
    console.error('Failed to save form:', error);
  }
};

export const loadFromSession = (): Partial<EnquiryState> | null => {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    // Only restore formData, not isSubmitted
    // Rationale: Refreshing the confirmation screen should restart the form
    return parsed?.formData ? { formData: parsed.formData, submittedData: parsed.submittedData, isSubmitted: false } : null;
  } catch (error) {
    console.error('Failed to load form:', error);
    return null;
  }
};

export const clearSession = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear form:', error);
  }
};
