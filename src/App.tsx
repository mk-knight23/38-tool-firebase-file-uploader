import { Outlet, Link, NavLink as RouterNavLink } from 'react-router';
import { CloudUpload, FolderOpen, Users, Heart, BarChart3, Settings } from 'lucide-react';
import { useStore } from './store/useStore';

function App() {
  const { settings } = useStore();

  return (
    <div className="min-h-screen flex flex-col font-sans" data-theme={settings.theme}>
      {/* Header */}
      <header className="bg-corp-header text-white border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-corp-primary/20 rounded-lg">
              <CloudUpload className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight uppercase">Enterprise<span className="text-corp-primary-light">Drive</span></h1>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/" icon={<FolderOpen className="w-4 h-4" />}>Files</NavItem>
            <NavItem to="/favorites" icon={<Heart className="w-4 h-4" />}>Favorites</NavItem>
            <NavItem to="/shared" icon={<Users className="w-4 h-4" />}>Shared</NavItem>
            <NavItem to="/analytics" icon={<BarChart3 className="w-4 h-4" />}>Analytics</NavItem>
            <NavItem to="/settings" icon={<Settings className="w-4 h-4" />}>Settings</NavItem>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center gap-1 px-4 py-2 bg-white border-b border-corp-border overflow-x-auto">
        <NavItem to="/" icon={<FolderOpen className="w-4 h-4" />}>Files</NavItem>
        <NavItem to="/favorites" icon={<Heart className="w-4 h-4" />}>Favorites</NavItem>
        <NavItem to="/shared" icon={<Users className="w-4 h-4" />}>Shared</NavItem>
        <NavItem to="/analytics" icon={<BarChart3 className="w-4 h-4" />}>Analytics</NavItem>
        <NavItem to="/settings" icon={<Settings className="w-4 h-4" />}>Settings</NavItem>
      </nav>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="py-6 border-t border-corp-border bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-corp-text-muted">
          <p>Made by MK — Musharraf Kazi</p>
          <p>© 2026 EnterpriseDrive</p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ to, icon, children }: { to: string; icon: React.ReactNode; children: string }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${isActive
          ? 'bg-corp-primary/20 text-corp-primary-light shadow-sm'
          : 'text-slate-300 hover:text-white hover:bg-white/5'}
      `}
    >
      {icon}
      <span>{children}</span>
    </RouterNavLink>
  );
}

export default App;
