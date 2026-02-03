import { Heart, Download, Trash2, FolderOpen } from 'lucide-react';
import { useStore } from '../store/useStore';

function Favorites() {
  const { favorites, removeFile, toggleFavorite } = useStore();

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-16 border-2 border-dashed border-corp-border rounded-xl">
          <div className="w-16 h-16 bg-corp-bg rounded-xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-corp-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-corp-text mb-2">No favorites yet</h3>
          <p className="text-sm text-corp-text-secondary">
            Mark files as favorites to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          Favorites
        </h1>
        <p className="text-sm text-corp-text-secondary">{favorites.length} favorite files</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((file) => (
          <div key={file.id} className="corp-card group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileColor(file.type)}`}>
                {getFileIcon(file.type)}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => toggleFavorite(Number(file.id))}
                  className="p-1.5 hover:bg-red-50 rounded text-red-500 hover:text-red-600 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current" />
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

export default Favorites;
