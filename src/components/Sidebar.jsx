import React from 'react';
import {
  Home,
  Zap,
  Brain,
  BookOpen,
  Clock,
  MessageCircle,
  Users,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Sidebar Component
 * Responsive navigation with menu items and user profile section
 */
const Sidebar = ({ isOpen, onClose, currentView, onNavigate, user }) => {
  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Zap },
    { id: 'tools', label: 'AI Study Tools', icon: Brain },
    { id: 'library', label: 'Thư viện', icon: BookOpen },
    { id: 'focus', label: 'Góc Tập Trung', icon: Clock },
    { id: 'coach', label: 'AI Coach', icon: MessageCircle },
    { id: 'community', label: 'Cộng đồng', icon: Users },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  const level = Math.floor((user?.xp || 0) / 100) + 1;

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:static md:translate-x-0 left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-soft-lg z-40 overflow-y-auto"
      >
        {/* Logo Section */}
        <div className="sticky top-0 bg-slate-900 p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-accent-400">
              <Sparkles size={24} />
              <span>StudyMate</span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Smart Learning Platform</p>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-6 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-soft-md shadow-primary-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-800 to-transparent border-t border-slate-700">
          <div className="bg-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-accent-400 font-semibold">
                Level {level} • {user?.xp || 0} XP
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
