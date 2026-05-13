import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    fullName: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  },
  submittedData: null,
  isSubmitted: false,
};

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    submitForm: (state) => {
      state.submittedData = JSON.parse(JSON.stringify(state.formData));
      state.isSubmitted = true;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.isSubmitted = false;
    },
    loadFromSession: (state, action) => {
      state.formData = action.payload.formData || initialState.formData;
      state.submittedData = action.payload.submittedData || null;
      state.isSubmitted = action.payload.isSubmitted || false;
    },
  },
});

export const { updateFormData, submitForm, resetForm, loadFromSession } =
  enquirySlice.actions;
export default enquirySlice.reducer;
