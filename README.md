# Revenue NSW - Customer Enquiry Form

A modern, secure web application for managing customer enquiries built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Quick Start

```bash
pnpm install        # Install dependencies
pnpm run dev        # Start dev server (http://localhost:5173)
pnpm run build      # Production build
```

## ✨ Features

- ✓ Responsive design (mobile, tablet, desktop)
- ✓ Input sanitization & XSS prevention
- ✓ Real-time form validation
- ✓ Auto-save to browser session
- ✓ Professional Tailwind UI
- ✓ TypeScript type safety
- ✓ Accessibility (ARIA attributes)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── EnquiryForm.tsx       # Main form
│   ├── FormField.tsx         # Reusable field
│   └── SubmissionResult.tsx  # Success screen
├── hooks/
│   └── useDebounce.ts        # Debounce hook
├── redux/
│   ├── enquirySlice.ts       # State management
│   └── store.ts              # Redux config
├── utils/
│   ├── validation.ts         # Validation & sanitization
│   └── sessionStorage.ts     # Storage utilities
└── App.tsx                   # Root component
```

## 🔄 Data Flow

1. User types → Redux state updates
2. State debounced (500ms) → sessionStorage
3. Page refresh → loads from storage
4. Form submit → validation → success screen

## 🔒 Security

- ✓ XSS prevention via input sanitization
- ✓ Client-side validation (ready for server validation)
- ✓ Auto-clearing session storage
- ✓ Graceful error handling

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI |
| TypeScript | Types |
| Redux Toolkit | State |
| Tailwind CSS v4 | Styling |
| Vite | Build tool |

## 📋 Form Validation

- **Full Name**: 2-100 chars, letters only
- **Email**: RFC-compliant format
- **Phone**: 10-digit Australian
- **Type**: 4 predefined options
- **Message**: 10-2000 chars

## 🎨 Customize

**Change color:**  
Edit `src/index.css` @theme block

**Add enquiry type:**  
Edit `src/components/EnquiryForm.tsx` enquiryOptions

**Modify validation:**  
Edit `src/utils/validation.ts`

## 🚀 Deploy

```bash
pnpm run build
# Upload dist/ folder to hosting
```
## 🐛 Troubleshoot

- **Form not saving?** → Check sessionStorage is enabled
- **Styling broken?** → Restart dev server, clear cache
- **Validation off?** → Check browser console for errors

---

**Built for Revenue NSW**
