import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject, getMetadata } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface FirebaseFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  folder?: string;
  uploadedAt: Date;
  uploadedBy: string;
  sharedWith: string[];
}

export { app, storage, auth, googleProvider };
export { signInWithPopup, signOut, onAuthStateChanged };
export { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject, getMetadata };

export type { FirebaseFile };