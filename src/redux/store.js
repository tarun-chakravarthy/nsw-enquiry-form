import { configureStore } from '@reduxjs/toolkit';
import enquiryReducer from './enquirySlice';

export const store = configureStore({
  reducer: {
    enquiry: enquiryReducer,
  },
});
