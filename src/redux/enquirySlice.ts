import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

interface EnquiryState {
  formData: FormData;
  submittedData: FormData | null;
  isSubmitted: boolean;
}

const initialState: EnquiryState = {
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
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
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
    loadFromSession: (state, action: PayloadAction<Partial<EnquiryState>>) => {
      state.formData = action.payload.formData || initialState.formData;
      state.submittedData = action.payload.submittedData || null;
      state.isSubmitted = action.payload.isSubmitted || false;
    },
  },
});

export const { updateFormData, submitForm, resetForm, loadFromSession } =
  enquirySlice.actions;
export default enquirySlice.reducer;
