import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, Folder, FolderOpen, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Folder as FolderType } from '../types';

interface FolderManagerProps {
  folders: FolderType[];
  files: any[];
  onCreateFolder: (name: string) => void;
  onRenameFolder: (id: string, name: string) => void;
  onDeleteFolder: (id: string) => void;
  onFolderSelect?: (folder: FolderType) => void;
}

interface FolderFormData {
  name: string;
  isEditing: boolean;
  editingId?: string;
}

export function FolderManager({
  folders,
  files,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onFolderSelect
}: FolderManagerProps) {
  const [form, setForm] = useState<FolderFormData>({
    name: '',
    isEditing: false,
    editingId: undefined
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateFolder = () => {
    if (form.name.trim()) {
      onCreateFolder(form.name.trim());
      setForm({ name: '', isEditing: false, editingId: undefined });
      setShowCreateForm(false);
    }
  };

  const handleEditFolder = (folder: FolderType) => {
    setForm({
      name: folder.name,
      isEditing: true,
      editingId: folder.id
    });
    setShowCreateForm(true);
  };

  const handleRenameFolder = () => {
    if (form.name.trim() && form.editingId) {
      onRenameFolder(form.editingId, form.name.trim());
      setForm({ name: '', isEditing: false, editingId: undefined });
      setShowCreateForm(false);
    }
  };

  const getFileCount = (folderId: string) => {
    return files.filter(file => file.folder === folderId).length;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Folders</h3>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          New Folder
        </button>
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter folder name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 mt-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={form.isEditing ? handleRenameFolder : handleCreateFolder}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {form.isEditing ? 'Rename' : 'Create'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folders List */}
      <div className="space-y-2">
        {folders.length === 0 ? (
          <div className="text-center py-8">
            <Folder className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No folders yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first folder to organize files</p>
          </div>
        ) : (
          folders.map((folder) => (
            <motion.div
              key={folder.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onFolderSelect?.(folder)}
            >
              <div className="flex items-center gap-3">
                <div className="text-blue-500">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{folder.name}</h4>
                  <p className="text-sm text-gray-500">
                    {getFileCount(folder.id)} files • {folder.fileCount} items
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditFolder(folder);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder(folder.id);
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Storage Overview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-3">Storage Overview</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Folders</span>
            <span className="font-medium">{folders.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Files</span>
            <span className="font-medium">{files.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Folder with most files</span>
            <span className="font-medium">
              {folders.length > 0
                ? folders.reduce((prev, current) =>
                    getFileCount(prev.id) > getFileCount(current.id) ? prev : current
                  ).name
                : 'None'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}