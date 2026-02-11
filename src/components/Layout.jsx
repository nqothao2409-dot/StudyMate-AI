import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Main Layout Component
 * Provides responsive sidebar navigation and topbar with profile information
 */
const Layout = ({ children, currentView, user, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Close sidebar when navigating on mobile
  const handleNavigate = (view) => {
    onNavigate(view);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 shadow-soft flex items-center justify-between px-4 z-40">
          <div className="flex items-center gap-2 font-bold text-lg text-primary-600">
            <Sparkles size={20} className="text-accent-600" />
            <span>StudyMate</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={handleNavigate}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar
          user={user}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pt-0 md:pt-0">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
