# Quick Start Guide

## Running the Application

### Development Mode
```bash
cd /Users/taruncduggempudi/Development/Assignments/nsw-enquiry-form
npm run dev
```
Visit: `http://localhost:5173`

### Production Build
```bash
npm run build    # Create optimized build
npm run preview  # Preview production build
```

---

## Testing the Solution

### 1. **Form Validation Testing**
```
Test Case 1: Submit empty form
- Expected: All 5 fields show error messages
- Verify: Error messages are clear and helpful

Test Case 2: Invalid email
- Input: "notanemail"
- Expected: Email error message shown
- Input: "test@email.com"
- Expected: No error

Test Case 3: Invalid phone
- Input: "123456789" (9 digits)
- Expected: Phone error message
- Input: "1234567890" (10 digits)
- Expected: No error

Test Case 4: Short message
- Input: "abc" (3 chars)
- Expected: Message error message
- Input: "This is a longer message" (24 chars)
- Expected: No error

Test Case 5: Valid submission
- Fill all fields correctly
- Click Submit
- Expected: SubmissionResult page shown with success message
```

### 2. **SessionStorage Persistence Testing**
```
Test Case 1: Fill form and refresh
- Fill: Name, Email, Phone, Type, Message
- Refresh browser (F5 or Cmd+R)
- Expected: Form retains all entered data

Test Case 2: Submit and refresh
- Fill form and submit
- Refresh browser
- Expected: SubmissionResult page still shown with same data

Test Case 3: Submit and click "Submit Another"
- Submit enquiry
- Click "Submit Another Enquiry" button
- Expected: Form cleared, ready for new enquiry

Test Case 4: Close browser session
- Enter data (don't submit)
- Close browser completely
- Reopen browser and visit app
- Expected: Form is empty (session ended)
```

### 3. **Responsive Design Testing**
```
Test Desktop (1024px+):
- Form is centered, max-width 600px
- Spacing is generous
- All inputs are clearly visible

Test Tablet (768px - 1024px):
- Form adapts to screen width
- Padding adjusted for smaller screens
- Data grid adjusts layout

Test Mobile (<768px):
- Single-column layout
- Full-width form with padding
- Touch-friendly button sizes
- Data items stack vertically
```

### 4. **Redux DevTools (Optional)**
```
1. Install Redux DevTools browser extension
2. Open DevTools (F12)
3. Go to Redux tab
4. Watch state updates as you:
   - Type in form (updateFormData actions)
   - Submit form (submitForm action)
   - Click reset (resetForm action, loadFromSession action)
```

---

## Form Fields Reference

### Full Name
- Type: Text input
- Validation: Required, any non-empty value accepted
- Placeholder: "Enter your full name"

### Email Address
- Type: Email input
- Validation: Required, must match email format (regex)
- Placeholder: "Enter your email address"
- Example valid: test@example.com

### Phone Number
- Type: Tel input
- Validation: Required, must be exactly 10 digits
- Placeholder: "Enter your phone number (10 digits)"
- Accepts: 1234567890, (123) 456-7890, 123-456-7890

### Enquiry Type
- Type: Select dropdown
- Validation: Required, must select one option
- Options:
  - General Inquiry
  - Tax Related
  - License/Permit
  - Other

### Message
- Type: Textarea
- Validation: Required, minimum 10 characters
- Placeholder: "Please describe your enquiry in detail..."

---

## Browser Console - Expected Output

### On App Load (if no saved data)
```
(No errors in console)
```

### On Submit with Valid Data
```
(No errors in console)
Form data saved to sessionStorage
```

### On Page Refresh
```
(No errors in console)
Form data loaded from sessionStorage
```

---

## Common Issues & Fixes

### Issue: Form not submitting
**Check:**
- All fields are filled correctly
- No red error messages showing
- Browser console for JavaScript errors (should be none)

### Issue: Data not persisting after refresh
**Check:**
- Browser sessionStorage is enabled
- Not in private/incognito mode
- Check browser privacy settings

### Issue: Styling looks broken
**Check:**
- CSS files are linked: EnquiryForm.css, SubmissionResult.css, App.css
- No network errors in DevTools
- Try clearing browser cache

---

## Files Structure for Reference

```
src/
├── App.jsx                          # Main app component
├── App.css                          # App styling
├── main.jsx                         # Entry point with Redux Provider
├── index.css                        # Global styles
│
├── components/
│   ├── EnquiryForm.jsx             # Form component
│   ├── EnquiryForm.css             # Form styles
│   ├── SubmissionResult.jsx        # Result display
│   └── SubmissionResult.css        # Result styles
│
├── redux/
│   ├── enquirySlice.js             # Redux state logic
│   └── store.js                    # Redux store config
│
└── utils/
    └── sessionStorage.js            # Persistence utilities
```

---

## Redux State Shape

```javascript
{
  enquiry: {
    formData: {
      fullName: "",
      email: "",
      phone: "",
      enquiryType: "",
      message: ""
    },
    submittedData: null,
    isSubmitted: false
  }
}
```

---

## Keyboard Navigation

- **Tab**: Navigate through form fields
- **Shift+Tab**: Navigate backwards
- **Enter**: Submit form
- **Escape**: (Can be added if needed for modal)

---

## Performance Metrics (Production Build)

- CSS: 4.95 kB (1.59 kB gzipped)
- JavaScript: 219.22 kB (69.96 kB gzipped)
- HTML: 0.46 kB (0.30 kB gzipped)
- Build time: ~344ms

---

## Notes for Interview

1. **Show the form** - fill it out with sample data
2. **Show validation** - submit empty form to see errors
3. **Show persistence** - refresh browser to see data retained
4. **Show result** - submit valid form to see success page
5. **Discuss architecture** - explain Redux choices
6. **Mention scalability** - how to add features
7. **Discuss backend** - API integration approach
8. **Answer follow-up questions** - show deep understanding
