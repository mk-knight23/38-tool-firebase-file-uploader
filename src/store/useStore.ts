import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UploadFile {
  id: number;
  name: string;
  size: string;
  sizeBytes: number;
  type: string;
  date: string;
  file?: File;
  url?: string;
  isFavorite?: boolean;
}

interface UserSettings {
  theme: 'light' | 'dark';
  maxFileSize: number; // in MB
  autoUpload: boolean;
  notifications: boolean;
  language: string;
}

interface UploadStats {
  totalUploads: number;
  totalSize: number;
  totalFiles: number;
  uploadsThisWeek: number;
  fileTypeStats: Record<string, number>;
}

interface StoreState {
  // Files
  files: UploadFile[];
  favorites: UploadFile[];
  sharedFiles: UploadFile[];

  // Settings
  settings: UserSettings;

  // Stats
  stats: UploadStats;

  // UI State
  searchQuery: string;
  selectedCategory: string;

  // Actions
  addFiles: (files: UploadFile[]) => void;
  removeFile: (id: number) => void;
  toggleFavorite: (id: number) => void;
  shareFile: (id: number) => void;
  unshareFile: (id: number) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  updateStats: (fileSize: number, fileType: string) => void;
  clearAllFiles: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial State
      files: [
        { id: 1, name: "Project_Proposal.pdf", size: "2.4 MB", sizeBytes: 2516582, type: "pdf", date: new Date(Date.now() - 120000).toISOString() },
        { id: 2, name: "Office_Deck_2024.pptx", size: "12.8 MB", sizeBytes: 13421773, type: "doc", date: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, name: "Hero_Background.png", size: "4.1 MB", sizeBytes: 4299162, type: "image", date: new Date(Date.now() - 86400000).toISOString() },
        { id: 4, name: "Theme_Song_v2.mp3", size: "8.5 MB", sizeBytes: 8912896, type: "audio", date: new Date(Date.now() - 172800000).toISOString() },
      ],
      favorites: [],
      sharedFiles: [],
      settings: {
        theme: 'light',
        maxFileSize: 500,
        autoUpload: false,
        notifications: true,
        language: 'en-US',
      },
      stats: {
        totalUploads: 0,
        totalSize: 0,
        totalFiles: 4,
        uploadsThisWeek: 0,
        fileTypeStats: {},
      },
      searchQuery: '',
      selectedCategory: 'all',

      // Actions
      addFiles: (newFiles) => set((state) => ({
        files: [...newFiles, ...state.files],
        stats: {
          ...state.stats,
          totalFiles: state.stats.totalFiles + newFiles.length,
          totalUploads: state.stats.totalUploads + newFiles.length,
          uploadsThisWeek: state.stats.uploadsThisWeek + newFiles.length,
        },
      })),

      removeFile: (id) => set((state) => ({
        files: state.files.filter(f => f.id !== id),
        favorites: state.favorites.filter(f => f.id !== id),
        sharedFiles: state.sharedFiles.filter(f => f.id !== id),
        stats: {
          ...state.stats,
          totalFiles: Math.max(0, state.stats.totalFiles - 1),
        },
      })),

      toggleFavorite: (id) => set((state) => {
        const file = state.files.find(f => f.id === id);
        if (!file) return state;

        const exists = state.favorites.find(f => f.id === id);
        if (exists) {
          return { favorites: state.favorites.filter(f => f.id !== id) };
        }
        return { favorites: [...state.favorites, { ...file, isFavorite: true }] };
      }),

      shareFile: (id) => set((state) => {
        const file = state.files.find(f => f.id === id);
        if (!file) return state;
        return { sharedFiles: [...state.sharedFiles, { ...file, url: `https://drive.example.com/file/${id}` }] };
      }),

      unshareFile: (id) => set((state) => ({
        sharedFiles: state.sharedFiles.filter(f => f.id !== id),
      })),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings },
      })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      updateStats: (fileSize, fileType) => set((state) => ({
        stats: {
          ...state.stats,
          totalSize: state.stats.totalSize + fileSize,
          fileTypeStats: {
            ...state.stats.fileTypeStats,
            [fileType]: (state.stats.fileTypeStats[fileType] || 0) + 1,
          },
        },
      })),

      clearAllFiles: () => set({
        files: [],
        favorites: [],
        sharedFiles: [],
        stats: {
          totalUploads: 0,
          totalSize: 0,
          totalFiles: 0,
          uploadsThisWeek: 0,
          fileTypeStats: {},
        },
      }),
    }),
    {
      name: 'firebase-uploader-storage',
      partialize: (state) => ({
        files: state.files,
        favorites: state.favorites,
        sharedFiles: state.sharedFiles,
        settings: state.settings,
        stats: state.stats,
      }),
    }
  )
);
