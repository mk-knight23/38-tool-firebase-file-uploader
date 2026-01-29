# EnterpriseDrive — Firebase File Uploader

A professional file management system with enterprise-grade UI design. Built with React, TypeScript, and Firebase Storage.

---

## What It Does

EnterpriseDrive provides a corporate file upload and management interface. Users can upload files to Firebase Storage, track upload progress, and manage their files with actions like download and sharing.

**When to use this tool:**
- Enterprise document management
- Team file sharing and collaboration
- Secure file storage with progress tracking
- Professional file management dashboard

---

## Inputs

| Input | Type | Description |
|-------|------|-------------|
| File Selection | File input | Select files from local device |
| Drag & Drop | Drop zone | Drag files for upload |
| Search | Text input | Filter files by name |

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| File List | Array | Display of uploaded files |
| Upload Progress | Number | 0-100% progress indicator |
| File Metadata | Object | Name, size, type, date |

---

## Workflow Steps

1. **Select Files** — Click upload zone or drag files
2. **Upload** — Files upload to Firebase Storage
3. **Track Progress** — Visual progress indicator
4. **Manage** — Download, share, or delete files

---

## Stack Choice Rationale

| Technology | Purpose |
|------------|---------|
| React 18 | Component-based UI architecture |
| TypeScript | Type safety for file metadata |
| Tailwind CSS v4 | Utility styling with corporate theme |
| Framer Motion | Smooth animations and transitions |
| Firebase Storage | Scalable cloud file storage |
| Lucide React | Professional icon set |

---

## Setup Steps

```bash
# Clone the repository
git clone https://github.com/mk-knight23/16-firebase-file-uploader.git
cd 16-firebase-file-uploader

# Install dependencies
npm install

# Configure Firebase
# Create src/firebase.ts with your config

# Start development server
npm run dev

# Build for production
npm run build
```

### Firebase Configuration

Create `src/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  // ...
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```

---

## Limitations

- **Firebase Required**: Must configure Firebase project
- **File Size**: Limited by Firebase Storage plan
- **Network**: Requires internet connection
- **Authentication**: Not implemented (add Firebase Auth)

---

## Project Structure

```
38-tool-firebase-file-uploader/
├── design-system/
│   └── MASTER.md              # Corporate Enterprise theme specification
├── src/
│   ├── App.tsx                # Main application
│   ├── main.tsx               # Entry point
│   └── index.css              # Corporate theme styles
├── firebase.json              # Firebase configuration
├── package.json
├── vite.config.ts
└── README.md
```

---

## Design System

This application follows a **Corporate/Enterprise** design theme:
- Navy blue primary color (#1e40af)
- Professional Inter font
- Conservative border radius (4-12px)
- Subtle shadows and borders
- Data-focused UI elements
- Enterprise-grade aesthetics

See `design-system/MASTER.md` for complete design specifications.

---

## Deployment

This project is configured for deployment on three platforms:

### GitHub Pages
- **Workflow**: `.github/workflows/deploy.yml`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Trigger**: Push to `main` branch
- **Action**: `actions/deploy-page@v4` with Vite static site generator

### Vercel
- **Config**: `vercel.json`
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Rewrites**: SPA fallback to `/index.html`

### Netlify
- **Config**: `netlify.toml`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Redirects**: All paths to `/index.html` (SPA support)

### Firebase Hosting
- **Config**: `firebase.json`
- **Command**: `firebase deploy`

---

## Live Links

| Platform | URL |
|----------|-----|
| **GitHub Pages** | https://mk-knight23.github.io/38-tool-firebase-file-uploader/ |
| **Vercel** | https://38-tool-firebase-file-uploader.vercel.app/ |
| **Netlify** | https://38-tool-firebase-file-uploader.netlify.app/ |

---

## License

MIT License — see [LICENSE](LICENSE) for details.
