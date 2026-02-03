import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from '../config/firebase';
import { User } from '../types';

class AuthService {
  private unsubscribe: () => void = () => {};

  constructor() {
    this.setupAuthListener();
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      return this.mapFirebaseUser(user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    const user = auth.currentUser;
    return user ? this.mapFirebaseUser(user) : null;
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? this.mapFirebaseUser(firebaseUser) : null;
      callback(user);
    });
  }

  private setupAuthListener(): void {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? user.uid : 'No user');
    });
  }

  private mapFirebaseUser(firebaseUser: import('firebase/auth').User): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined
    };
  }

  cleanup(): void {
    this.unsubscribe();
  }
}

export const authService = new AuthService();