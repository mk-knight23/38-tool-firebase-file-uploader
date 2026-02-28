# EnterpriseDrive — Premium Cloud Storage

A production-grade cloud storage interface built with React 19, Vite 6, and Firebase.

![EnterpriseDrive Banner](https://images.unsplash.com/photo-1614064641935-4476a89b5c3d?auto=format&fit=crop&w=1200&q=80)

## 🏢 Enterprise Features

- **Authenticated Storage**: Secure file management backed by Firebase Auth and Google Provider.
- **Resource Guarding**: Strict file size limits (10MB) and MIME type validation to prevent misuse.
- **Global Resilience**: Top-level `GlobalErrorBoundary` and `react-hot-toast` for bulletproof error management.
- **Modern Navigation**: Powered by React Router 7 with native active state tracking and seamless transitions.
- **Performance**: Leverages Vite 6 for lightning-fast builds and optimized delivery.
- **Rich UI**: Themed with Tailwind CSS v4, featuring glassmorphism and motion transitions.

## 🛠️ Tech Stack

- **Framework**: React 19.2.3.
- **State**: Zustand 5.0.11.
- **Routing**: React Router 7.13.0.
- **Styling**: Tailwind CSS v4.0.0 + Framer Motion 12.29.2.
- **Backend**: Firebase 11.10.0 (Storage & Auth).
- **Error Handling**: react-error-boundary 6.1.0.
- **Notifications**: react-hot-toast 2.6.0.
- **Icons**: Lucide React 0.474.0.
- **Build**: Vite 6.4.1 + TypeScript 5.9.3.

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React 19 Application Layer                    │
│  React 19.2.3 + TypeScript 5.9.3 + Vite 6.4.1                  │
│  + Framer Motion + Tailwind CSS v4 + Lucide React               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Routing Layer                              │
│  React Router 7.13.0 - Native active state tracking             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    State Management Layer                        │
│  Zustand 5.0.11 - Lightweight global state management           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer                              │
│  Firebase Services (Auth & Storage) - Clean separation           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Backend Layer                                │
│  Firebase 11.10.0 (Authentication + Cloud Storage)             │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
38-tool-firebase-file-uploader/
├── src/
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global styles
│   ├── App.tsx                      # Root component
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── ErrorBoundary.tsx       # Global error boundary
│   │   ├── Toaster.tsx              # Toast notification container
│   │   └── [other UI components]
│   │
│   ├── config/                      # Configuration files
│   │   └── firebase.ts              # Firebase configuration
│   │
│   ├── pages/                       # Page components
│   │   ├── Home.tsx                 # Home page
│   │   ├── Upload.tsx               # File upload page
│   │   ├── Files.tsx                # File management page
│   │   └── [other pages]
│   │
│   ├── router/                      # Routing configuration
│   │   └── AppRouter.tsx            # React Router setup
│   │
│   ├── services/                    # Firebase service layer
│   │   ├── auth.ts                  # Authentication service
│   │   └── storage.ts               # Cloud Storage service
│   │
│   ├── store/                       # State management
│   │   └── useStore.ts              # Zustand global store
│   │
│   └── types/                       # TypeScript type definitions
│       └── index.ts                 # Common types
│
├── public/                          # Static assets
├── .github/workflows/
│   ├── ci.yml                       # Lint and build workflow
│   └── deploy.yml                   # Vercel deployment
├── .env.example                    # Environment variables example
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite config
├── tailwind.config.ts               # Tailwind CSS config
├── postcss.config.mjs               # PostCSS config
└── README.md                        # This file
```

### Service Layer Architecture

```typescript
{
  services: {
    auth: {
      purpose: "Firebase Authentication service",
      features: [
        "Google OAuth provider",
        "User authentication state",
        "User profile management",
        "Sign in/out functionality",
        "Protected route handling"
      ],
      file: "src/services/auth.ts",
      size: "1672 bytes"
    },
    storage: {
      purpose: "Firebase Cloud Storage service",
      features: [
        "File upload (with progress)",
        "File deletion",
        "File listing",
        "File download URLs",
        "File metadata handling",
        "File size validation (10MB limit)",
        "MIME type validation",
        "Bucket management"
      ],
      file: "src/services/storage.ts",
      size: "4164 bytes"
    }
  }
}
```

### State Management Architecture (Zustand)

```typescript
{
  store: {
    purpose: "Global application state management",
    features: [
      "User authentication state",
      "File upload state",
      "File list state",
      "Upload progress tracking",
      "Error state management",
      "UI state (modals, toasts, etc.)"
    ],
    file: "src/store/useStore.ts",
    size: "5092 bytes",
    benefits: [
      "Lightweight (~1KB)",
      "No provider wrapping",
      "TypeScript-first",
      "Simple API",
      "Great performance"
    ]
  }
}
```

### Routing Architecture (React Router 7)

```typescript
{
  router: {
    purpose: "Client-side routing",
    features: [
      "Native active state tracking",
      "Seamless page transitions",
      "Protected routes (auth required)",
      "Lazy loading support",
      "History management"
    ],
    file: "src/router/AppRouter.tsx",
    routes: [
      "/ - Home page",
      "/upload - File upload page",
      "/files - File management page",
      "[other routes]"
    ]
  }
}
```

### Component Architecture

```typescript
{
  components: {
    ErrorBoundary: {
      purpose: "Global error boundary",
      features: [
        "Catches JavaScript errors",
        "Displays fallback UI",
        "Logs errors for debugging"
      ],
      library: "react-error-boundary"
    },
    Toaster: {
      purpose: "Toast notification container",
      features: [
        "Success notifications",
        "Error notifications",
        "Auto-dismissal",
        "Queue management"
      ],
      library: "react-hot-toast"
    },
    [otherComponents]: {
      purpose: "[Component description]",
      features: ["[Feature 1]", "[Feature 2]"]
    }
  }
}
```

### Firebase Architecture

```typescript
{
  firebase: {
    version: "11.10.0",
    services: {
      authentication: {
        provider: "Google OAuth",
        features: [
          "User sign-in with Google",
          "User sign-out",
          "User session management",
          "Protected route authentication"
        ]
      },
      storage: {
        features: [
          "File upload (max 10MB)",
          "File deletion",
          "File listing",
          "File download",
          "Metadata handling",
          "Bucket management"
        ]
      }
    },
    configuration: {
      file: ".env",
      variables: [
        "VITE_FIREBASE_API_KEY",
        "VITE_FIREBASE_AUTH_DOMAIN",
        "VITE_FIREBASE_PROJECT_ID",
        "VITE_FIREBASE_STORAGE_BUCKET",
        "VITE_FIREBASE_MESSAGING_SENDER_ID",
        "VITE_FIREBASE_APP_ID",
        "VITE_MAX_FILE_SIZE",
        "VITE_ALLOWED_TYPES"
      ]
    }
  }
}
```

### Error Handling Architecture

```typescript
{
  errorHandling: {
    globalErrorBoundary: {
      component: "ErrorBoundary",
      purpose: "Catches all JavaScript errors in the application",
      features: [
        "Displays fallback UI",
        "Logs errors for debugging",
        "Prevents complete app crashes"
      ]
    },
    serviceErrorHandling: {
      services: ["auth.ts", "storage.ts"],
      purpose: "Handle Firebase errors",
      features: [
        "Error messages",
        "Error logging",
        "User-friendly error display"
      ]
    },
    toastNotifications: {
      library: "react-hot-toast",
      purpose: "Display error messages to users",
      features: [
        "Success toasts",
        "Error toasts",
        "Warning toasts",
        "Auto-dismissal"
      ]
    }
  }
}
```

### File Upload Architecture

```typescript
{
  fileUpload: {
    flow: [
      "User selects file",
      "File validation (size & MIME type)",
      "Upload to Firebase Storage",
      "Progress tracking",
      "Success notification",
      "Update file list"
    ],
    validations: {
      maxSize: "10MB (10485760 bytes)",
      allowedTypes: "Configurable (PDF, DOC, etc.)",
      mimeTypeCheck: true,
      sizeCheck: true
    },
    features: [
      "Progress indicator",
      "Real-time updates",
      "Error handling",
      "Success feedback",
      "File metadata tracking"
    ]
  }
}
```

### Security Architecture

```typescript
{
  security: {
    authentication: {
      provider: "Google OAuth (Firebase Auth)",
      features: [
        "Secure authentication",
        "User session management",
        "Protected routes",
        "Auto sign-in on page reload"
      ]
    },
    fileValidation: {
      features: [
        "File size validation (10MB limit)",
        "MIME type validation",
        "Client-side validation",
        "Server-side validation (Firebase)"
      ]
    },
    dataProtection: [
      "HTTPS required",
      "Firebase security rules",
      "No sensitive data in localStorage",
      "Environment variables for config"
    ]
  }
}
```

### Performance Optimizations

- **React 19**: Concurrent rendering and automatic batching
- **Zustand**: Lightweight state management (~1KB)
- **Vite 6**: Fast HMR and optimized production builds
- **Framer Motion**: GPU-accelerated animations
- **Tailwind CSS v4**: Utility-first CSS with JIT compiler
- **Code Splitting**: Lazy loading for pages (if implemented)
- **Firebase CDN**: Optimized asset delivery

### UI/UX Architecture

```typescript
{
  ui: {
    theme: "Glassmorphism design",
    features: [
      "Glass-like transparent backgrounds",
      "Blur effects",
      "Gradient overlays",
      "Smooth transitions",
      "Modern typography"
    ],
    styling: {
      framework: "Tailwind CSS v4",
      animations: "Framer Motion 12.29.2",
      icons: "Lucide React 0.474.0"
    }
  }
}
```

### Type System Architecture

```typescript
{
  types: {
    User: {
      uid: "string",
      email: "string",
      displayName: "string",
      photoURL: "string"
    },
    File: {
      name: "string",
      type: "string",
      size: "number",
      url: "string",
      metadata: "object"
    },
    UploadProgress: {
      progress: "number (0-100)",
      state: "uploading | completed | error",
      file: "File"
    }
  }
}
```

### CI/CD Pipeline

```yaml
Push to main → CI Check → Build → Deploy
     ↓            ↓          ↓         ↓
  Trigger     Lint+Check   Production   Vercel/Netlify
              (Vite)       Build        Firebase Hosting
```

- **CI**: Linting and build checks
- **Build**: Production-optimized bundle with Vite
- **Deploy**: Automatic to Vercel, Netlify, or Firebase Hosting

### Multi-Platform Deployment

| Platform | URL | Type |
|----------|-----|------|
| Vercel | [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/mk-knight23/38-tool-firebase-file-uploader) | Serverless |
| Netlify | [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/mk-knight23/38-tool-firebase-file-uploader) | Serverless |
| Firebase Hosting | firebase deploy | Static Hosting |

### Extension Points

```typescript
{
  newFeatures: [
    "Add multi-file bucket selection",
    "Add role-based access control (Admin/User)",
    "Add in-browser image preview and editing",
    "Add file sharing functionality",
    "Add file versioning"
  ],
  newProviders: [
    "Add more OAuth providers (GitHub, Facebook, etc.)",
    "Add email/password authentication"
  ],
  newServices: [
    "Add Firebase Realtime Database",
    "Add Firebase Cloud Functions",
    "Add Firebase Analytics"
  ]
}
```

### Key Architectural Decisions

**Why React 19?**
- Latest React with concurrent rendering
- Improved performance
- Better developer experience
- Modern ecosystem

**Why Zustand for State Management?**
- Lightweight (~1KB)
- No provider wrapping
- TypeScript-first design
- Simple and intuitive API
- Great performance

**Why Firebase?**
- Backend-as-a-Service
- Authentication ready out of the box
- Cloud Storage with generous free tier
- Real-time capabilities
- Easy integration with React

**Why Tailwind CSS v4?**
- Utility-first approach
- Great performance with JIT compiler
- Consistent design system
- Easy customization
- Excellent DX

**Why React Router 7?**
- Latest version with native active state
- Seamless page transitions
- Protected routes support
- TypeScript support

### Design Philosophy

```typescript
{
  security: {
    principles: [
      "Secure authentication (Google OAuth)",
      "File validation (size & MIME type)",
      "Firebase security rules",
      "HTTPS required"
    ]
  },
  ui: {
    style: "Glassmorphism design",
    features: [
      "Modern and clean UI",
      "Smooth animations",
      "Responsive design",
      "Accessibility"
    ]
  },
  ux: {
    principles: [
      "Intuitive file upload",
      "Real-time progress updates",
      "Clear error messages",
      "Fast and responsive"
    ]
  }
}
```

### Data Flow Architecture

```
User Action → Component → Service → Firebase → Store Update → Re-render
     ↓           ↓          ↓          ↓            ↓             ↓
  Select File   File    storage.ts  Cloud       useStore       UI Update
               Upload    auth.ts    Storage     State
```

## 📦 Setup & Installation

```bash
git clone <repo-url>
cd 38-tool-firebase-file-uploader
npm install
npm run dev
```

## 📐 Architecture

- **Services**: Abstracted Firebase logic in `auth.ts` and `storage.ts` for clean separation of concerns.
- **Config**: Centralized Firebase environmental configuration with type safety.
- **Stores**: Lightweight Zustand integration for global application state.

## 🚀 Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mk-knight23/38-tool-firebase-file-uploader)

### Netlify

[![Netlify Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mk-knight23/38-tool-firebase-file-uploader)

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## 📁 Environment Variables

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_TYPES=application/pdf,application/msword
```

## 🖼️ Screenshots

### Upload Interface
![Upload Interface](https://images.unsplash.com/photo-1614064641935-4476a89b5c3d?auto=format&fit=crop&w=800&q=80)

### File Management
![File Management](https://images.unsplash.com/photo-1555421689-492a1880c87f?auto=format&fit=crop&w=800&q=80)

### Authentication
![Authentication](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80)

## 🤝 Roadmap

- [ ] Multi-file bucket selection.
- [ ] Role-based access control (Admin/User).
- [ ] In-browser image preview and editing.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

*Last updated: 2026-03-01*

Made by [Musharraf Kazi](https://github.com/mk-knight23)
