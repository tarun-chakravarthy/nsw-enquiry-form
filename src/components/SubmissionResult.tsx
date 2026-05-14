import { useDispatch, useSelector } from 'react-redux';
import { resetForm } from '../redux/enquirySlice';
import { clearSession } from '../utils/sessionStorage';
import { formatPhoneNumber } from '../utils/validation';
import type { RootState, AppDispatch } from '../redux/store';

export default function SubmissionResult() {
  const dispatch = useDispatch<AppDispatch>();
  const { submittedData, isSubmitted } = useSelector(
    (state: RootState) => state.enquiry
  );

  if (!isSubmitted || !submittedData) {
    return null;
  }

  const handleNewEnquiry = (): void => {
    dispatch(resetForm());
    clearSession();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-success-50 to-success-100 border border-success-200 rounded-lg p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-success-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-success-900 mb-2">
                Enquiry Submitted Successfully
              </h2>
              <p className="text-success-800">
                Thank you for submitting your enquiry. We will review your request and
                get back to you shortly. A confirmation has been processed.
              </p>
            </div>
          </div>
        </div>

        {/* Submitted Data Card */}
        <div className="card overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 sm:px-8 py-4 border-b border-primary-200">
            <h3 className="text-lg font-bold text-primary-900">
              Submitted Information
            </h3>
            <p className="text-sm text-primary-700 mt-1">
              Please keep this information for your records
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="pb-6 md:pb-0">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <span className="text-gray-900 font-medium">
                    {submittedData.fullName}
                  </span>
                </div>
              </div>

              {/* Email Address */}
              <div className="pb-6 md:pb-0">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <a
                    href={`mailto:${submittedData.email}`}
                    className="text-primary-600 hover:text-primary-700 font-medium break-all"
                  >
                    {submittedData.email}
                  </a>
                </div>
              </div>

              {/* Phone Number */}
              <div className="pb-6 md:pb-0">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <a
                    href={`tel:${submittedData.phone.replace(/\D/g, '')}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {formatPhoneNumber(submittedData.phone)}
                  </a>
                </div>
              </div>

              {/* Enquiry Type */}
              <div className="pb-6 md:pb-0">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enquiry Type
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-700">
                    {submittedData.enquiryType}
                  </span>
                </div>
              </div>

              {/* Message - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-sm">
                    {submittedData.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button onClick={handleNewEnquiry} className="btn-primary">
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Enquiry
            </span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2zm0 0h6v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Print Details
            </span>
          </button>
        </div>

        {/* Reference Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Enquiry Reference:</strong>
          </p>
          <p className="text-lg font-mono text-primary-600">
            {/* Reference: Date-RandomID format. In production, this would be generated server-side */}
            {new Date().toISOString().split('T')[0]}-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
