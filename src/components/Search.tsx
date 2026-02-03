import { useState, useEffect } from 'react';
import { Search, File, Clock, User } from 'lucide-react';
import { FileItem } from '../types';

interface SearchProps {
  files: FileItem[];
  onSearch: (results: FileItem[]) => void;
  onFileSelect?: (file: FileItem) => void;
}

interface SearchResult {
  files: FileItem[];
  folders: string[];
  recent: FileItem[];
  people: string[];
}

export function SearchBar({ files, onSearch, onFileSelect }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({
    files: [],
    folders: [],
    recent: [],
    people: []
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults({
        files: [],
        folders: [],
        recent: [],
        people: []
      });
      setShowResults(false);
      return;
    }

    const searchResults = searchFiles(files, query);
    setResults(searchResults);
    setShowResults(true);
    setSelectedIndex(-1);
  }, [query, files]);

  const searchFiles = (allFiles: FileItem[], query: string): SearchResult => {
    const normalizedQuery = query.toLowerCase();
    const matchedFiles = allFiles.filter(file =>
      file.name.toLowerCase().includes(normalizedQuery) ||
      file.type.toLowerCase().includes(normalizedQuery)
    );

    const folders = Array.from(new Set(
      matchedFiles
        .filter(file => file.folder)
        .map(file => file.folder!)
    )).slice(0, 5);

    const recent = matchedFiles
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .slice(0, 3);

    const people = Array.from(new Set(
      matchedFiles.map(file => file.uploadedBy)
    )).slice(0, 3);

    return {
      files: matchedFiles,
      folders,
      recent,
      people
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.files.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.files.length) {
          handleFileSelect(results.files[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setQuery('');
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFileSelect = (file: FileItem) => {
    onFileSelect?.(file);
    setShowResults(false);
    setQuery('');
    setSelectedIndex(-1);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.files.length > 0) setShowResults(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowResults(false), 200);
          }}
          placeholder="Search files, folders, or people..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {showResults && (query.trim().length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.files.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No files found
            </div>
          ) : (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Files
              </div>
              {results.files.map((file, index) => (
                <div
                  key={file.id}
                  onClick={() => handleFileSelect(file)}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="text-gray-400">
                    <File className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {file.folder && `Folder: ${file.folder} • `}
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.folders.length > 0 && (
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Folders
              </div>
              {results.folders.map((folder, index) => (
                <div
                  key={folder}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="text-blue-500">
                    <File className="w-5 h-5" />
                  </div>
                  <div className="font-medium text-sm">{folder}</div>
                </div>
              ))}
            </div>
          )}

          {results.recent.length > 0 && (
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Recent
              </div>
              {results.recent.map((file, index) => (
                <div
                  key={file.id}
                  onClick={() => handleFileSelect(file)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="text-gray-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.people.length > 0 && (
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                People
              </div>
              {results.people.map((person, index) => (
                <div
                  key={person}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="font-medium text-sm">{person}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}