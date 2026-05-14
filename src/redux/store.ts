import { configureStore } from '@reduxjs/toolkit';
import enquiryReducer from './enquirySlice';

export const store = configureStore({
  reducer: {
    enquiry: enquiryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
