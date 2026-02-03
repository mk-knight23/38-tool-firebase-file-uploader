import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  File, Image as ImageIcon, FileText, Music, Video, Folder,
  Download, MoreVertical, Trash2, Share2
} from 'lucide-react';
import { FileItem, Folder } from '../types';
import { storageService } from '../services/storage';

interface FileManagerProps {
  currentFolder?: string;
  onFileSelect?: (file: FileItem) => void;
  onFolderChange?: (folder: string) => void;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8" />;
  if (type.startsWith('text/')) return <FileText className="w-8 h-8" />;
  if (type.startsWith('audio/')) return <Music className="w-8 h-8" />;
  if (type.startsWith('video/')) return <Video className="w-8 h-8" />;
  return <File className="w-8 h-8" />;
};

const getFileColor = (type: string) => {
  if (type.startsWith('image/')) return 'text-blue-500';
  if (type.startsWith('text/')) return 'text-green-500';
  if (type.startsWith('audio/')) return 'text-purple-500';
  if (type.startsWith('video/')) return 'text-red-500';
  return 'text-gray-500';
};

export function FileManager({ currentFolder, onFileSelect, onFolderChange }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const fileList = await storageService.listFiles(currentFolder);
      setFiles(fileList.map(file => ({
        ...file,
        icon: getFileIcon(file.type),
        color: getFileColor(file.type)
      })));
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: FileItem) => {
    if (selectedFiles.includes(file.id)) {
      setSelectedFiles(prev => prev.filter(id => id !== file.id));
    } else {
      setSelectedFiles(prev => [...prev, file.id]);
    }
  };

  const handleFileDownload = async (file: FileItem) => {
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await storageService.deleteFile(fileId, currentFolder);
      setFiles(prev => prev.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [currentFolder]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-current" />
              <div className="w-1.5 h-1.5 bg-current" />
              <div className="w-1.5 h-1.5 bg-current" />
              <div className="w-1.5 h-1.5 bg-current" />
            </div>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <div className="w-4 h-4 border-r-2 border-b-2 border-current" />
          </button>
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{selectedFiles.length} selected</span>
            <button
              onClick={() => setSelectedFiles([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Files */}
      {files.length === 0 ? (
        <div className="text-center py-12">
          <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No files in this folder</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <motion.div
              key={file.id}
              whileHover={{ scale: 1.02 }}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleFileSelect(file)}
            >
              <div className={`${file.color} mb-3`}>
                {file.icon}
              </div>
              <h3 className="text-sm font-medium truncate">{file.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(file.uploadedAt).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-end mt-3 gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileDownload(file);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileDelete(file.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file) => (
                <tr
                  key={file.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedFiles.includes(file.id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={file.color}>
                        {file.icon}
                      </div>
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileDownload(file);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileDelete(file.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}