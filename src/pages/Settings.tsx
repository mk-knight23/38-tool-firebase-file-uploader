import { Settings as SettingsIcon, Moon, Sun, Bell, Upload, Globe, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

function Settings() {
  const { settings, updateSettings, files, clearAllFiles } = useStore();

  const totalSize = files.reduce((acc, f) => acc + (f.sizeBytes || 0), 0);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-sm text-corp-text-secondary">Manage your preferences and account settings</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="corp-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              {settings.theme === 'dark' ? <Moon className="w-5 h-5 text-corp-primary" /> : <Sun className="w-5 h-5 text-corp-primary" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-sm text-corp-text-secondary">Customize your look and feel</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-corp-text-secondary">Choose your preferred theme</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSettings({ theme: 'light' })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.theme === 'light'
                      ? 'bg-corp-primary text-white'
                      : 'bg-corp-bg text-corp-text-secondary hover:bg-corp-bg/80'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => updateSettings({ theme: 'dark' })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-corp-primary text-white'
                      : 'bg-corp-bg text-corp-text-secondary hover:bg-corp-bg/80'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-corp-text-secondary">Select your language</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="corp-input px-4 py-2 text-sm"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload Settings */}
        <div className="corp-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <Upload className="w-5 h-5 text-corp-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Upload Settings</h2>
              <p className="text-sm text-corp-text-secondary">Configure file upload behavior</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Max File Size</p>
                <p className="text-sm text-corp-text-secondary">Maximum file size for uploads</p>
              </div>
              <select
                value={settings.maxFileSize}
                onChange={(e) => updateSettings({ maxFileSize: Number(e.target.value) })}
                className="corp-input px-4 py-2 text-sm"
              >
                <option value="100">100 MB</option>
                <option value="250">250 MB</option>
                <option value="500">500 MB</option>
                <option value="1000">1 GB</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Upload</p>
                <p className="text-sm text-corp-text-secondary">Automatically upload selected files</p>
              </div>
              <button
                onClick={() => updateSettings({ autoUpload: !settings.autoUpload })}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  settings.autoUpload ? 'bg-corp-primary' : 'bg-corp-bg'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.autoUpload ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="corp-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <Bell className="w-5 h-5 text-corp-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-corp-text-secondary">Manage your notification preferences</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-corp-text-secondary">Receive notifications for uploads</p>
            </div>
            <button
              onClick={() => updateSettings({ notifications: !settings.notifications })}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${
                settings.notifications ? 'bg-corp-primary' : 'bg-corp-bg'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Storage Info */}
        <div className="corp-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-corp-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-corp-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Data Management</h2>
              <p className="text-sm text-corp-text-secondary">Manage your stored data</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-corp-bg rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-corp-text-secondary">Total Files</span>
                <span className="font-semibold">{files.length} files</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-corp-text-secondary">Total Size</span>
                <span className="font-semibold">{(totalSize / 1024 / 1024).toFixed(1)} MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-corp-text-secondary">Favorites</span>
                <span className="font-semibold">-</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all files? This cannot be undone.')) {
                  clearAllFiles();
                }
              }}
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
