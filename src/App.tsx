import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudUpload, File, Image as ImageIcon, FileText, Music, Video,
  Copy, Check, MoreVertical, Trash2, Shield, HardDrive, Download,
  Search, FolderOpen, Clock, Users, Settings
} from 'lucide-react';

const RECENT_FILES = [
  { id: 1, name: "Project_Proposal.pdf", size: "2.4 MB", type: "pdf", date: "2 mins ago" },
  { id: 2, name: "Office_Deck_2024.pptx", size: "12.8 MB", type: "doc", date: "1 hour ago" },
  { id: 3, name: "Hero_Background.png", size: "4.1 MB", type: "image", date: "Yesterday" },
  { id: 4, name: "Theme_Song_v2.mp3", size: "8.5 MB", type: "audio", date: "2 days ago" },
];

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('File uploaded successfully! (Mock Demo)');
    }, 2000);
  };

  const copyLink = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Enterprise Header */}
      <header className="bg-corp-header text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-corp-primary/20 rounded-lg">
              <CloudUpload className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight uppercase">Enterprise<span className="text-corp-primary-light">Drive</span></h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search files..."
                className="corp-input w-full pl-10 bg-white/10 border-white/10 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              <HardDrive className="w-4 h-4 text-corp-primary-light" />
              <span className="text-xs font-medium">12.4 / 15 GB</span>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-corp-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-8">
            <button className="flex items-center gap-2 py-4 text-sm font-medium text-corp-primary border-b-2 border-corp-primary">
              <FolderOpen className="w-4 h-4" />
              All Files
            </button>
            <button className="flex items-center gap-2 py-4 text-sm font-medium text-corp-text-secondary hover:text-corp-text transition-colors">
              <Clock className="w-4 h-4" />
              Recent
            </button>
            <button className="flex items-center gap-2 py-4 text-sm font-medium text-corp-text-secondary hover:text-corp-text transition-colors">
              <Users className="w-4 h-4" />
              Shared
            </button>
          </nav>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
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
                className="upload-zone"
              >
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} />

                <AnimatePresence mode="wait">
                  {isUploading ? (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 border-4 border-corp-border border-t-corp-primary rounded-full animate-spin mb-4" />
                      <p className="text-sm font-semibold text-corp-primary">Uploading...</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 bg-corp-primary/10 rounded-xl flex items-center justify-center text-corp-primary mb-4">
                        <CloudUpload className="w-8 h-8" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1">Drop files here</h3>
                      <p className="text-xs text-corp-text-muted">Max 500MB • PDF, JPG, PNG</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleUpload}
                className="corp-btn-primary w-full mt-4"
              >
                Select Files
              </button>
            </div>

            {/* Storage Stats */}
            <div className="corp-card">
              <div className="flex items-center gap-2 mb-4">
                <HardDrive className="w-5 h-5 text-corp-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-corp-text-secondary">
                  Storage
                </h3>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-corp-text-secondary">12.4 GB / 15 GB</span>
                  <span className="font-semibold text-corp-primary">82%</span>
                </div>
                <div className="corp-progress">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    className="corp-progress-bar"
                  />
                </div>
              </div>

              <button className="corp-btn-secondary w-full text-xs py-2">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recent Files</h2>
                <p className="text-sm text-corp-text-secondary">4 files • 27.8 MB total</p>
              </div>
              <button className="corp-btn-secondary text-xs py-2 px-4">
                <MoreVertical className="w-4 h-4 inline mr-1" />
                Actions
              </button>
            </div>

            {/* File Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RECENT_FILES.map((file, idx) => (
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
                        onClick={() => copyLink(file.id)}
                        className="p-1.5 hover:bg-corp-bg rounded text-corp-text-muted hover:text-corp-primary transition-colors"
                      >
                        {copiedId === file.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded text-corp-text-muted hover:text-corp-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm truncate">{file.name}</h3>
                    <div className="flex justify-between items-center text-xs text-corp-text-muted">
                      <span>{file.size}</span>
                      <span>{file.date}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 border border-corp-border hover:bg-corp-bg text-corp-text-secondary hover:text-corp-text font-medium rounded-lg text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Security Banner */}
            <div className="p-6 bg-corp-header text-white rounded-xl flex items-center gap-6">
              <div className="p-3 bg-corp-primary/30 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold uppercase tracking-wide">Enterprise Security</h4>
                <p className="text-sm text-slate-400 mt-1">
                  All files encrypted at rest with AES-256 and transmitted over TLS 1.3.
                </p>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-corp-border bg-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-corp-text-muted">
          <p>© 2026 EnterpriseDrive. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-corp-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-corp-text transition-colors">Terms</a>
            <a href="#" className="hover:text-corp-text transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
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

export default App;
