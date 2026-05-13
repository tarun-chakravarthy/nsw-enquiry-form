const SESSION_KEY = 'enquiry_form_state';

export const saveToSession = (state) => {
  try {
    const { enquiry } = state;
    const dataToSave = {
      formData: enquiry.formData,
      submittedData: enquiry.submittedData,
      isSubmitted: enquiry.isSubmitted,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error);
  }
};

export const loadFromSession = () => {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from sessionStorage:', error);
    return null;
  }
};

export const clearSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error);
  }
};
