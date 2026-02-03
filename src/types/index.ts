export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  folder?: string;
  uploadedAt: Date;
  uploadedBy: string;
  sharedWith: string[];
  icon: string;
  color: string;
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  fileCount: number;
  createdAt: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  url?: string;
}

export interface ShareSettings {
  fileId: string;
  link: string;
  permissions: 'view' | 'edit';
  expiresAt?: Date;
}

export interface StorageStats {
  totalSpace: number;
  usedSpace: number;
  fileCount: number;
  folderCount: number;
}

export interface HistoryItem {
  id: string;
  action: 'upload' | 'download' | 'delete' | 'share';
  fileId: string;
  fileName: string;
  timestamp: Date;
  userId: string;
}