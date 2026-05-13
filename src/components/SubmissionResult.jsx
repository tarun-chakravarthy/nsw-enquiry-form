import { useDispatch, useSelector } from 'react-redux';
import { resetForm } from '../redux/enquirySlice';
import { clearSession } from '../utils/sessionStorage';
import './SubmissionResult.css';

export default function SubmissionResult() {
  const dispatch = useDispatch();
  const { submittedData, isSubmitted } = useSelector((state) => state.enquiry);

  if (!isSubmitted || !submittedData) {
    return null;
  }

  const handleNewEnquiry = () => {
    dispatch(resetForm());
    clearSession();
  };

  return (
    <div className="submission-result-container">
      <div className="success-message">
        <h2>✓ Enquiry Submitted Successfully</h2>
        <p>Thank you for submitting your enquiry. We will review your request and get back to you shortly.</p>
      </div>

      <div className="submitted-data">
        <h3>Submitted Information</h3>
        <div className="data-grid">
          <div className="data-item">
            <label>Full Name:</label>
            <span>{submittedData.fullName}</span>
          </div>
          <div className="data-item">
            <label>Email Address:</label>
            <span>{submittedData.email}</span>
          </div>
          <div className="data-item">
            <label>Phone Number:</label>
            <span>{submittedData.phone}</span>
          </div>
          <div className="data-item">
            <label>Enquiry Type:</label>
            <span>{submittedData.enquiryType}</span>
          </div>
          <div className="data-item full-width">
            <label>Message:</label>
            <span className="message-text">{submittedData.message}</span>
          </div>
        </div>
      </div>

      <button onClick={handleNewEnquiry} className="new-enquiry-button">
        Submit Another Enquiry
      </button>
    </div>
  );
}
