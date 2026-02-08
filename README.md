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

- **Framework**: React 19.
- **State**: Zustand.
- **Routing**: React Router 7.
- **Styling**: Tailwind CSS v4 + Framer Motion.
- **Backend**: Firebase (Storage & Auth).
- **Icons**: Lucide React.
- **Build**: Vite 6 + TypeScript.

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

Made by [Musharraf Kazi](https://github.com/mk-knight23)
