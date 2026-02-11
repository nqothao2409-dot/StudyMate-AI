import React from 'react';
import { Menu, Bell, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Topbar Component
 * Displays user profile information, XP points, and level
 */
const Topbar = ({ user, onMenuClick, isSidebarOpen }) => {
  const level = Math.floor((user?.xp || 0) / 100) + 1;
  const xpProgress = (user?.xp || 0) % 100;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="hidden md:sticky md:top-0 md:flex md:h-20 md:bg-white md:border-b md:border-slate-200 md:shadow-soft-md z-30 items-center justify-between px-8"
    >
      {/* Left Section - Menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-slate-600" />
        </button>

        {/* Welcome Text or Logo */}
        <div>
          <h1 className="text-lg font-bold text-slate-800">Welcome back!</h1>
          <p className="text-xs text-slate-500">Keep learning and growing</p>
        </div>
      </div>

      {/* Right Section - Profile Stats & Actions */}
      <div className="flex items-center gap-6">
        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden lg:flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-full border border-primary-100"
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Level {level}
            </span>
            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              />
            </div>
            <span className="text-xs text-slate-500 mt-1">
              {user?.xp || 0} / {(level + 1) * 100} XP
            </span>
          </div>
        </motion.div>

        {/* User Avatar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg hover:shadow-soft-lg transition-shadow"
        >
          {(user?.name || 'U').charAt(0).toUpperCase()}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent-500 rounded-full border-2 border-white" />
        </motion.button>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell size={20} className="text-slate-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Settings size={20} className="text-slate-600" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
