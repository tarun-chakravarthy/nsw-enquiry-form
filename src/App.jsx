import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromSession } from './redux/enquirySlice';
import { loadFromSession as loadFromSessionStorage, saveToSession } from './utils/sessionStorage';
import EnquiryForm from './components/EnquiryForm';
import SubmissionResult from './components/SubmissionResult';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isSubmitted = useSelector((state) => state.enquiry.isSubmitted);
  const state = useSelector((state) => state);

  // Load data from sessionStorage on mount
  useEffect(() => {
    const savedData = loadFromSessionStorage();
    if (savedData) {
      dispatch(loadFromSession(savedData));
    }
  }, [dispatch]);

  // Save to sessionStorage whenever the state changes
  useEffect(() => {
    saveToSession(state);
  }, [state]);

  return (
    <div className="app-container">
      {isSubmitted ? <SubmissionResult /> : <EnquiryForm />}
    </div>
  );
}

export default App;
