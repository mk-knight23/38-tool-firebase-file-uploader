import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudUpload, File, Image as ImageIcon, FileText, Music, Video,
  Copy, Check, MoreVertical, Trash2, Shield, HardDrive, Download,
  Search, FolderOpen, Clock, Users, Heart
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();
  const {
    files,
    favorites,
    searchQuery,
    selectedCategory,
    addFiles,
    removeFile,
    toggleFavorite,
    setSearchQuery,
    setSelectedCategory,
    updateStats,
  } = useStore();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filesUploadingCount, setFilesUploadingCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const estimateUploadTime = (bytes: number, count: number): string => {
    const baseSeconds = bytes / (2 * 1024 * 1024);
    const overhead = count * 0.5;
    const totalSeconds = baseSeconds + overhead;

    if (totalSeconds < 10) return '~10 seconds';
    if (totalSeconds < 30) return '~30 seconds';
    if (totalSeconds < 60) return '~1 minute';
    if (totalSeconds < 120) return '~2 minutes';
    return `~${Math.ceil(totalSeconds / 60)} minutes`;
  };

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || file.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [files, searchQuery, selectedCategory]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const filesToUpload = Array.from(selectedFiles).filter(file => {
      if (file.size > 500 * 1024 * 1024) {
        console.warn(`${file.name} exceeds 500MB limit`);
        return false;
      }
      return true;
    });

    if (filesToUpload.length === 0) {
      alert('No valid files to upload. Max file size is 500MB.');
      return;
    }

    const totalSize = filesToUpload.reduce((acc, file) => acc + file.size, 0);
    const estimatedTime = estimateUploadTime(totalSize, filesToUpload.length);

    const totalFiles = filesToUpload.length;
    setIsUploading(true);
    setUploadProgress(0);
    setFilesUploadingCount(totalFiles);

    console.log(`Uploading ${totalFiles} file${totalFiles > 1 ? 's' : ''} (${formatFileSize(totalSize)}). Estimated time: ${estimatedTime}`);

    let completedFiles = 0;

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      const newFiles = filesToUpload.map(file => {
        const type = getFileType(file.type, file.name);
        updateStats(file.size, type);
        return {
          id: Date.now() + Math.random(),
          name: file.name,
          size: formatFileSize(file.size),
          sizeBytes: file.size,
          type,
          date: new Date().toISOString(),
          file: file,
        };
      });

      addFiles(newFiles);
      setIsUploading(false);
      setUploadProgress(0);
      setFilesUploadingCount(0);
    }, 2000 + (totalFiles * 500));
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleUploadZoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const isFavorited = (id: number) => favorites.some(f => f.id === id);

  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-72 space-y-6">
          {/* Upload Card */}
          <div className="corp-card">
            <h2 className="text-sm font-bold uppercase tracking-wide text-corp-text-secondary mb-6">
              Upload Files
            </h2>

            <div
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={handleUploadZoneKeyDown}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              tabIndex={0}
              role="button"
              aria-label="Upload files"
              className={`upload-zone focus:ring-2 focus:ring-corp-primary focus:ring-offset-2 ${isDragOver ? 'border-corp-primary bg-corp-primary/5' : ''}`}
            >
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => handleFileSelect(e.target.files)} />

              <AnimatePresence mode="wait">
                {isUploading ? (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center w-full px-6"
                  >
                    <div className="w-12 h-12 border-4 border-corp-border border-t-corp-primary rounded-full animate-spin mb-4" />
                    <p className="text-sm font-semibold text-corp-primary mb-2">Uploading...</p>
                    <div className="w-full corp-progress">
                      <motion.div
                        className="corp-progress-bar"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-corp-text-muted mt-1">{Math.round(uploadProgress)}%</p>
                    {isUploading && uploadProgress < 100 && (
                      <p className="text-xs text-corp-text-secondary mt-2">
                        {filesUploadingCount > 1 ? `Uploading ${filesUploadingCount} files...` : 'Uploading file...'}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors ${isDragOver ? 'bg-corp-primary text-white' : 'bg-corp-primary/10 text-corp-primary'}`}>
                      <CloudUpload className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">
                      {isDragOver ? 'Drop to upload' : 'Drop files here'}
                    </h3>
                    <p className="text-xs text-corp-text-muted">Max 500MB each • Multiple files supported</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={handleUpload} className="corp-btn-primary w-full mt-4">
              Select Files
            </button>
          </div>

          {/* Categories */}
          <div className="corp-card">
            <h2 className="text-sm font-bold uppercase tracking-wide text-corp-text-secondary mb-4">
              Categories
            </h2>
            <div className="space-y-1">
              {['all', 'image', 'pdf', 'audio', 'video', 'doc'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-corp-primary text-white'
                      : 'hover:bg-corp-bg text-corp-text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {selectedCategory === 'all' ? 'All Files' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <p className="text-sm text-corp-text-secondary">{filteredFiles.length} files</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="corp-input px-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* File Grid */}
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFiles.map((file, idx) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="corp-card group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileColor(file.type)}`}>
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleFavorite(Number(file.id))}
                        className={`p-1.5 hover:bg-corp-bg rounded transition-colors ${
                          isFavorited(Number(file.id)) ? 'text-red-500' : 'text-corp-text-muted hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited(Number(file.id)) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setCopiedId(Number(file.id))}
                        className="p-1.5 hover:bg-corp-bg rounded text-corp-text-muted hover:text-corp-primary transition-colors"
                      >
                        {copiedId === file.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => removeFile(Number(file.id))}
                        className="p-1.5 hover:bg-red-50 rounded text-corp-text-muted hover:text-corp-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm truncate">{file.name}</h3>
                    <div className="flex justify-between items-center text-xs text-corp-text-muted">
                      <span>{file.size}</span>
                      <span>{formatDate(file.date)}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 border border-corp-border hover:bg-corp-bg text-corp-text-secondary hover:text-corp-text font-medium rounded-lg text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-corp-border rounded-xl">
              <div className="w-16 h-16 bg-corp-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-corp-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-corp-text mb-2">No files found</h3>
              <p className="text-sm text-corp-text-secondary mb-4">
                {searchQuery ? 'Try a different search term' : 'Upload files or drag and drop them here'}
              </p>
              <button onClick={handleUpload} className="corp-btn-primary text-xs py-2 px-4">
                Select Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getFileType(mimeType: string, fileName: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) return 'pdf';
  return 'doc';
}

function getFileIcon(type: string) {
  switch (type) {
    case 'pdf': return <FileText className="w-6 h-6" />;
    case 'image': return <ImageIcon className="w-6 h-6" />;
    case 'audio': return <Music className="w-6 h-6" />;
    case 'video': return <Video className="w-6 h-6" />;
    default: return <File className="w-6 h-6" />;
  }
}

function getFileColor(type: string) {
  switch (type) {
    case 'pdf': return 'bg-red-50 text-red-600';
    case 'image': return 'bg-green-50 text-green-600';
    case 'audio': return 'bg-amber-50 text-amber-600';
    case 'video': return 'bg-purple-50 text-purple-600';
    default: return 'bg-slate-50 text-slate-600';
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default Home;
