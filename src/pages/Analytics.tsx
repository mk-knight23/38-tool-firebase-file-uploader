import { BarChart3, TrendingUp, HardDrive, Upload, FileImage, FileText, Music, Video } from 'lucide-react';
import { useStore } from '../store/useStore';

function Analytics() {
  const { stats, files } = useStore();

  const totalSize = files.reduce((acc, f) => acc + (f.sizeBytes || 0), 0);

  const fileTypeBreakdown = [
    { type: 'Images', count: files.filter(f => f.type === 'image').length, size: files.filter(f => f.type === 'image').reduce((acc, f) => acc + (f.sizeBytes || 0), 0), icon: <FileImage className="w-5 h-5" />, color: 'bg-green-500' },
    { type: 'Documents', count: files.filter(f => f.type === 'pdf' || f.type === 'doc').length, size: files.filter(f => f.type === 'pdf' || f.type === 'doc').reduce((acc, f) => acc + (f.sizeBytes || 0), 0), icon: <FileText className="w-5 h-5" />, color: 'bg-red-500' },
    { type: 'Audio', count: files.filter(f => f.type === 'audio').length, size: files.filter(f => f.type === 'audio').reduce((acc, f) => acc + (f.sizeBytes || 0), 0), icon: <Music className="w-5 h-5" />, color: 'bg-amber-500' },
    { type: 'Video', count: files.filter(f => f.type === 'video').length, size: files.filter(f => f.type === 'video').reduce((acc, f) => acc + (f.sizeBytes || 0), 0), icon: <Video className="w-5 h-5" />, color: 'bg-purple-500' },
  ];

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const storagePercent = Math.min(100, (totalSize / (15 * 1024 * 1024 * 1024)) * 100);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Analytics</h1>
        <p className="text-sm text-corp-text-secondary">Track your storage and upload statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="corp-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <Upload className="w-5 h-5 text-corp-primary" />
            </div>
            <span className="text-sm text-corp-text-secondary">Total Uploads</span>
          </div>
          <p className="text-3xl font-bold">{stats.totalUploads}</p>
        </div>

        <div className="corp-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <HardDrive className="w-5 h-5 text-corp-primary" />
            </div>
            <span className="text-sm text-corp-text-secondary">Total Size</span>
          </div>
          <p className="text-3xl font-bold">{formatBytes(totalSize)}</p>
        </div>

        <div className="corp-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-corp-primary" />
            </div>
            <span className="text-sm text-corp-text-secondary">Total Files</span>
          </div>
          <p className="text-3xl font-bold">{stats.totalFiles}</p>
        </div>

        <div className="corp-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-corp-primary" />
            </div>
            <span className="text-sm text-corp-text-secondary">This Week</span>
          </div>
          <p className="text-3xl font-bold">{stats.uploadsThisWeek}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage Usage */}
        <div className="corp-card">
          <h2 className="text-lg font-semibold mb-6">Storage Usage</h2>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-corp-text-secondary">{formatBytes(totalSize)} / 15 GB</span>
              <span className="font-semibold text-corp-primary">{storagePercent.toFixed(1)}%</span>
            </div>
            <div className="w-full h-4 bg-corp-bg rounded-full overflow-hidden">
              <div
                className="h-full corp-progress-bar transition-all"
                style={{ width: `${storagePercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {fileTypeBreakdown.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 bg-corp-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${item.color} rounded-lg text-white`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.type}</p>
                    <p className="text-xs text-corp-text-secondary">{item.count} files</p>
                  </div>
                </div>
                <p className="font-semibold text-sm">{formatBytes(item.size)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Activity */}
        <div className="corp-card">
          <h2 className="text-lg font-semibold mb-6">File Type Distribution</h2>
          <div className="space-y-4">
            {fileTypeBreakdown.map((item) => {
              const percent = files.length > 0 ? (item.count / files.length) * 100 : 0;
              return (
                <div key={item.type}>
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 ${item.color} rounded text-white`}>
                        {item.icon}
                      </div>
                      <span>{item.type}</span>
                    </div>
                    <span className="font-medium">{percent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-corp-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {files.length === 0 && (
            <div className="text-center py-12 text-corp-text-secondary">
              <p>No data yet. Upload some files to see analytics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
