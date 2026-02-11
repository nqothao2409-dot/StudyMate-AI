import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trash2, AlertCircle } from 'lucide-react';

/**
 * Settings Page Component
 * User settings and configuration options
 */
const SettingsPage = ({ apiKey, setApiKey, user, resetData }) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(keyInput);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Cài đặt</h1>

      {/* AI Configuration Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-6"
      >
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Zap className="text-yellow-500" size={24} />
          Cấu hình AI
        </h3>

        <p className="text-sm text-slate-500 mb-6">
          Nhập Google Gemini API Key để kích hoạt các tính năng thông minh như tóm tắt, tạo
          quiz, và hỏi AI coach.
        </p>

        {/* API Key Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="flex-1 p-3 border border-slate-300 rounded-lg outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            placeholder="AIzaSy..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Lưu
          </motion.button>
        </div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-accent-50 border border-accent-200 text-accent-700 rounded-lg text-sm font-medium"
          >
            ✓ Đã lưu API Key thành công!
          </motion.div>
        )}

        {!saved && (
          <p className="text-xs text-slate-400">
            Key được lưu an toàn trong trình duyệt của bạn. Không bao giờ được gửi đến máy chủ.
          </p>
        )}
      </motion.div>

      {/* User Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6 mb-6"
      >
        <h3 className="font-bold text-slate-800 mb-4">Thông tin tài khoản</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Tên:</span>
            <span className="font-semibold text-slate-800">{user?.name || 'Không xác định'}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Level:</span>
            <span className="font-semibold text-slate-800">
              {Math.floor((user?.xp || 0) / 100) + 1}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">XP:</span>
            <span className="font-semibold text-slate-800">{user?.xp || 0}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Thời gian học (phút):</span>
            <span className="font-semibold text-slate-800">
              {user?.totalStudyTime || 0}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6 border-2 border-red-200 bg-red-50"
      >
        <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2">
          <AlertCircle size={24} />
          Vùng nguy hiểm
        </h3>

        <p className="text-sm text-red-600 mb-4">
          Các hành động này không thể được hoàn tác. Hãy cẩn thận trước khi thực hiện.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (
              window.confirm(
                'Bạn chắc chắn muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác!'
              )
            ) {
              resetData();
            }
          }}
          className="w-full border-2 border-red-300 text-red-600 bg-white px-4 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
        >
          <Trash2 className="inline mr-2" size={18} />
          Xóa toàn bộ dữ liệu & Reset App
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
