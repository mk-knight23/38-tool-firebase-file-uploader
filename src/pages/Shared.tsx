import { Users, Share2, Copy, Check, Trash2, Download, ExternalLink } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

function Shared() {
  const { sharedFiles, unshareFile } = useStore();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyLink = (url: string, id: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (sharedFiles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-16 border-2 border-dashed border-corp-border rounded-xl">
          <div className="w-16 h-16 bg-corp-bg rounded-xl flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-corp-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-corp-text mb-2">No shared files</h3>
          <p className="text-sm text-corp-text-secondary">
            Share files from your home to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Users className="w-6 h-6" />
          Shared Files
        </h1>
        <p className="text-sm text-corp-text-secondary">{sharedFiles.length} files shared</p>
      </div>

      <div className="space-y-4">
        {sharedFiles.map((file) => (
          <div key={file.id} className="corp-card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileColor(file.type)}`}>
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{file.name}</h3>
                <div className="flex items-center gap-3 text-sm text-corp-text-muted">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{formatDate(file.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyLink(file.url || '', Number(file.id))}
                  className="p-2 hover:bg-corp-bg rounded-lg text-corp-text-muted hover:text-corp-primary transition-colors"
                  title="Copy link"
                >
                  {copiedId === file.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-corp-bg rounded-lg text-corp-text-muted hover:text-corp-primary transition-colors"
                  title="Open link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => unshareFile(Number(file.id))}
                  className="p-2 hover:bg-red-50 rounded-lg text-corp-text-muted hover:text-corp-error transition-colors"
                  title="Stop sharing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-corp-bg rounded-lg text-corp-text-muted hover:text-corp-primary transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            {file.url && (
              <div className="mt-3 p-2 bg-corp-bg rounded text-xs text-corp-text-muted font-mono truncate">
                {file.url}
              </div>
            )}
          </div>
        ))}
      </div>
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

import { File, FileText, Image as ImageIcon, Music, Video } from 'lucide-react';

export default Shared;
