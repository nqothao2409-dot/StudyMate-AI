import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Star, Brain, MessageCircle, BookOpen } from 'lucide-react';

/**
 * Dashboard Page Component
 * Displays user statistics and quick access shortcuts
 */
const Dashboard = ({ user, onNavigate }) => {
  const level = Math.floor((user?.xp || 0) / 100) + 1;
  const progress = (user?.xp || 0) % 100;

  const quickActions = [
    {
      label: 'Tạo Quiz mới',
      icon: Brain,
      color: 'from-purple-100 to-purple-200 text-purple-600',
      action: () => onNavigate('tools'),
    },
    {
      label: 'Bật Pomodoro',
      icon: Clock,
      color: 'from-red-100 to-red-200 text-red-600',
      action: () => onNavigate('focus'),
    },
    {
      label: 'Hỏi AI Coach',
      icon: MessageCircle,
      color: 'from-blue-100 to-blue-200 text-blue-600',
      action: () => onNavigate('coach'),
    },
    {
      label: 'Thư viện',
      icon: BookOpen,
      color: 'from-indigo-100 to-indigo-200 text-indigo-600',
      action: () => onNavigate('library'),
    },
  ];

  const stats = [
    {
      label: 'Thời gian học tập',
      icon: Clock,
      value: `${Math.floor((user?.totalStudyTime || 0) / 60)}h ${(user?.totalStudyTime || 0) % 60}p`,
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      label: 'Quiz đã hoàn thành',
      icon: CheckCircle,
      value: user?.quizzesTaken || 0,
      gradient: 'from-emerald-400 to-teal-600',
    },
    {
      label: 'Điểm kinh nghiệm (XP)',
      icon: Star,
      value: user?.xp || 0,
      gradient: 'from-orange-400 to-pink-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Chào {user?.name || 'Bạn'}! 👋
        </h2>

        {/* XP Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs bg-slate-200 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gradient-to-r from-primary-600 to-accent-600 h-full rounded-full"
            />
          </div>
          <span className="text-sm text-slate-600 font-medium whitespace-nowrap">
            {progress}/100 XP đến Level {level + 1}
          </span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-lg`}
            >
              <div className="mb-4 p-2 bg-white/20 rounded-lg w-fit">
                <Icon size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-bold text-xl text-slate-800 mb-4">Truy cập nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col items-center gap-3 text-center"
              >
                <div className={`p-3 rounded-full bg-gradient-to-br ${action.color}`}>
                  <Icon size={24} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
