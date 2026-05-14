import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from './hooks/useDebounce';
import { loadFromSession } from './redux/enquirySlice';
import {
  loadFromSession as loadFromSessionStorage,
  saveToSession,
} from './utils/sessionStorage';
import EnquiryForm from './components/EnquiryForm';
import SubmissionResult from './components/SubmissionResult';
import type { RootState, AppDispatch } from './redux/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isSubmitted = useSelector((state: RootState) => state.enquiry.isSubmitted);
  const enquiryState = useSelector((state: RootState) => state.enquiry);

  // Debounce state - only save every 500ms (reduces write frequency ~50x)
  const debouncedState = useDebounce(enquiryState, 500);

  // Load form from session on mount
  useEffect(() => {
    const savedData = loadFromSessionStorage();
    if (savedData) {
      dispatch(loadFromSession(savedData));
    }
  }, [dispatch]);

  // Auto-save form on state changes (with debouncing)
  // Skip saving submitted forms
  useEffect(() => {
    if (!debouncedState.isSubmitted) {
      saveToSession({ enquiry: debouncedState } as any);
    }
  }, [debouncedState]);

  return (
    <div className="app-container">
      {isSubmitted ? <SubmissionResult /> : <EnquiryForm />}
    </div>
  );
}

export default App;
