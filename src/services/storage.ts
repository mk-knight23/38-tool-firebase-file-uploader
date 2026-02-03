import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
  FirebaseFile
} from '../config/firebase';
import { getAuth } from 'firebase/auth';

interface UploadOptions {
  folder?: string;
  onProgress?: (progress: number) => void;
  onComplete?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  folder: string;
  uploadedAt: Date;
  uploadedBy: string;
  sharedWith: string[];
}

class StorageService {
  private auth = getAuth();

  async uploadFile(file: File, options: UploadOptions = {}): Promise<string> {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const folderPath = options.folder ? `${options.folder}/` : '';
      const storageRef = ref(storage, `${folderPath}${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          options.onProgress?.(progress);
        },
        (error) => {
          options.onError?.(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            options.onComplete?.(downloadURL);
          });
        }
      );

      return new Promise((resolve, reject) => {
        uploadTask.on('complete', () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        });
        uploadTask.on('error', reject);
      });
    } catch (error) {
      options.onError?.(error as Error);
      throw error;
    }
  }

  async listFiles(folder?: string): Promise<FileMetadata[]> {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const folderPath = folder ? `${folder}/` : '';
      const listRef = ref(storage, folderPath);

      const response = await listAll(listRef);
      const files: FileMetadata[] = [];

      for (const itemRef of response.items) {
        const url = await getDownloadURL(itemRef);
        const metadata = await itemRef.getMetadata();

        files.push({
          id: itemRef.name,
          name: itemRef.name,
          size: metadata.size || 0,
          type: metadata.contentType || 'unknown',
          url,
          folder: folder || '',
          uploadedAt: metadata.timeCreated ? new Date(metadata.timeCreated) : new Date(),
          uploadedBy: user.uid,
          sharedWith: []
        });
      }

      return files;
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  async deleteFile(fileId: string, folder?: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const folderPath = folder ? `${folder}/` : '';
      const fileRef = ref(storage, `${folderPath}${fileId}`);

      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async generateShareLink(fileId: string, folder?: string): Promise<string> {
    try {
      const folderPath = folder ? `${folder}/` : '';
      const fileRef = ref(storage, `${folderPath}${fileId}`);
      const url = await getDownloadURL(fileRef);

      return `${url}?token=${Date.now()}`;
    } catch (error) {
      console.error('Error generating share link:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();