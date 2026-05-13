# Revenue NSW Enquiry Form - Solution Walkthrough

## 📋 Project Overview
A customer-facing enquiry form application built with React, Redux, and sessionStorage. Users can submit their details through a form, which are stored in Redux state and persisted to sessionStorage for session continuity.

---

## 🏗️ Solution Architecture

### Technology Stack
- **Frontend Framework**: React 19.2.6
- **State Management**: Redux Toolkit 2.11.2
- **Build Tool**: Vite 8.0.12
- **Persistence**: sessionStorage API

### Project Structure
```
src/
├── components/
│   ├── EnquiryForm.jsx          # Form input component with validation
│   ├── EnquiryForm.css          # Form styling
│   ├── SubmissionResult.jsx     # Display submitted data
│   └── SubmissionResult.css     # Result display styling
├── redux/
│   ├── enquirySlice.js          # Redux state and actions
│   └── store.js                 # Redux store configuration
├── utils/
│   └── sessionStorage.js        # SessionStorage utilities
├── App.jsx                      # Main application component
└── main.jsx                     # App entry with Redux Provider
```

---

## 🔑 Key Components & Features

### 1. **Redux Store & Slice** (`src/redux/enquirySlice.js`)
**Responsibilities:**
- Manages enquiry form state with fields: fullName, email, phone, enquiryType, message
- Tracks submission state and submitted data
- Provides actions: `updateFormData`, `submitForm`, `resetForm`, `loadFromSession`

**State Structure:**
```javascript
{
  formData: { fullName, email, phone, enquiryType, message },
  submittedData: null,
  isSubmitted: false
}
```

### 2. **EnquiryForm Component** (`src/components/EnquiryForm.jsx`)
**Features:**
- **Form Fields:**
  - Full Name (text input)
  - Email Address (with validation)
  - Phone Number (10-digit validation)
  - Enquiry Type (dropdown with 4 options)
  - Message (textarea with min 10 characters)

- **Validation:**
  - All fields are required
  - Email format validation (regex pattern)
  - Phone number must be 10 digits
  - Message must be at least 10 characters
  - Real-time error display

- **Flow:**
  - Captures user input and updates Redux state
  - Validates on form submission
  - Dispatches `submitForm` action on successful validation
  - Triggers sessionStorage save

### 3. **SubmissionResult Component** (`src/components/SubmissionResult.jsx`)
**Features:**
- Success message with checkmark
- Displays all submitted information in a formatted grid
- "Submit Another Enquiry" button to reset and start over
- Clears sessionStorage when resetting

### 4. **SessionStorage Utilities** (`src/utils/sessionStorage.js`)
**Functions:**
- `saveToSession(state)` - Persists enquiry data to sessionStorage
- `loadFromSession()` - Retrieves persisted data on app load
- `clearSession()` - Removes stored data (used after reset)

**Data Persistence Strategy:**
- Saves the Redux enquiry slice state whenever it changes
- Loads data automatically on page refresh
- Allows users to resume their work within the same browser session

---

## 💡 Solution Considerations & Decisions

### 1. **State Management - Why Redux Toolkit?**
✅ **Advantages:**
- Centralized state management for complex forms
- Easy to track form changes and history
- Simplified with Redux Toolkit (reduced boilerplate)
- Scalable for future features

### 2. **sessionStorage vs localStorage**
✅ **Chose sessionStorage because:**
- Appropriate for enquiry forms (temporary data)
- Cleared when tab/session closes (privacy-friendly)
- Prevents stale data accumulation
- User expectations: form resets when browser closes
- Note: For permanent storage, would use localStorage or backend

### 3. **Form Validation Strategy**
✅ **Client-side validation:**
- Immediate user feedback
- Prevents invalid submissions to backend
- Better UX with inline error messages
- Note: Server-side validation would be added during backend integration

### 4. **Component Separation**
✅ **Separate form and result components:**
- Clean separation of concerns
- Easier to test and maintain
- Simple toggle based on `isSubmitted` state
- Scalable for additional screens

### 5. **Responsive Design**
✅ **Mobile-first approach:**
- Uses CSS Grid and Flexbox
- Adapts to all screen sizes
- Touch-friendly input fields
- Tested breakpoints: 1024px and below

---

## 🚀 Data Flow Diagram

```
User Input
    ↓
[EnquiryForm Component]
    ↓
Redux Action: updateFormData
    ↓
Redux State Updated
    ↓
sessionStorage Updated (via useEffect)
    ↓
User Submits Form
    ↓
Redux Action: submitForm
    ↓
[SubmissionResult Component Displayed]
    ↓
User Resets
    ↓
Redux Action: resetForm
    ↓
sessionStorage Cleared
    ↓
[Back to EnquiryForm]
```

---

## 📱 User Experience Flow

### 1. **Initial Load**
- App checks sessionStorage for saved form data
- If found, user's previous input is restored
- If not found, fresh form is displayed

### 2. **Form Submission**
- User fills form fields
- On submission, client-side validation runs
- If invalid: errors displayed inline
- If valid: form data submitted, result page shown

### 3. **Post-Submission**
- Success message displayed
- All submitted information shown in read-only format
- User can submit another enquiry or close browser

### 4. **Session Persistence**
- If user closes and reopens browser (same session):
  - Form data is restored if not yet submitted
  - Submitted data remains visible if already submitted
- After browser session ends: data cleared

---

## 🔌 Backend Integration Considerations

### Ready to Integrate:
1. **API Endpoint**: Replace form submission logic with axios/fetch call
2. **Error Handling**: Add error state to Redux for failed submissions
3. **Loading State**: Add loading indicator during API request
4. **Success Response**: Handle backend acknowledgment (e.g., ticket number)
5. **User Notification**: Display reference number or confirmation details

### Example Integration Point:
```javascript
// In EnquiryForm component, after validation:
// dispatch(submitEnquiryAsync(formData))
// Backend would validate, store in database, return confirmation
```

---

## ✨ Additional Features (Future Enhancements)

1. **File Uploads**: Attachment support for enquiry
2. **Email Notifications**: Auto-send confirmation to user
3. **Ticket System**: Generate reference numbers for tracking
4. **Multi-step Form**: Complex enquiries with branching logic
5. **SMS Verification**: OTP validation for phone number
6. **Enquiry History**: View past submissions (requires backend)
7. **Admin Dashboard**: View and manage submitted enquiries
8. **Analytics**: Track enquiry submission trends

---

## ✅ Testing Scenarios

### Validation Testing:
- [ ] Submit empty form (all errors shown)
- [ ] Invalid email format
- [ ] Phone number not 10 digits
- [ ] Message less than 10 characters
- [ ] Submit valid form (success)

### Session Testing:
- [ ] Fill form, refresh page (data restored)
- [ ] Fill form, submit, refresh page (result shown)
- [ ] Submit enquiry, click "Submit Another" (form cleared)
- [ ] Close browser session, reopen (data cleared)

### Responsive Testing:
- [ ] Desktop (1024px+)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (< 768px)

---

## 📊 Performance Considerations

- **Lightweight**: No external CSS frameworks (vanilla CSS)
- **Optimized**: Minimal re-renders with Redux
- **Fast Load**: Vite provides instant HMR and optimal bundles
- **Small Bundle**: Redux Toolkit optimized for production build

---

## 🎯 Summary

This enquiry form solution demonstrates:
- ✅ Clean architecture with separated concerns
- ✅ Professional form handling with validation
- ✅ State management best practices
- ✅ Data persistence across sessions
- ✅ Responsive, accessible UI
- ✅ Scalable for future backend integration
- ✅ Production-ready code quality

The application is ready for backend integration and can handle real customer enquiries from Revenue NSW.
