import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle } from 'lucide-react';

/**
 * Community Page Component
 * Social learning platform for sharing posts and discussions
 */
const Community = ({ posts, addPost, user }) => {
  const [newContent, setNewContent] = useState('');
  const [tag, setTag] = useState('Chung');

  const tags = ['Chung', 'Toán học', 'Văn học', 'Tiếng Anh', 'Lý', 'Hóa', 'Sinh'];

  const handlePost = () => {
    if (!newContent.trim()) return;

    addPost({
      id: Date.now(),
      user: user?.name || 'Ẩn danh',
      avatar: (user?.name || 'A').charAt(0).toUpperCase(),
      content: newContent,
      tag,
      likes: 0,
      comments: 0,
      time: 'Vừa xong',
    });

    setNewContent('');
    setTag('Chung');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-4xl mx-auto"
    >
      {/* New Post Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8"
      >
        <h3 className="font-bold text-slate-800 mb-4">Tạo bài viết mới</h3>

        <textarea
          className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none resize-none mb-4 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all"
          rows="4"
          placeholder="Chia sẻ kiến thức hoặc đặt câu hỏi..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="bg-slate-100 text-slate-700 text-sm font-semibold py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePost}
            disabled={!newContent.trim()}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Đăng bài
          </motion.button>
        </div>
      </motion.div>

      {/* Posts Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {posts.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">Chưa có bài viết nào</p>
            <p className="text-sm">Hãy là người đầu tiên chia sẻ!</p>
          </div>
        ) : (
          posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2, shadow: 'lg' }}
              className="card p-6 hover:shadow-lg transition-all"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center font-bold text-white text-sm"
                  >
                    {post.avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {post.user}
                    </h4>
                    <p className="text-xs text-slate-500">{post.time}</p>
                  </div>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium cursor-default"
                >
                  {post.tag}
                </motion.span>
              </div>

              {/* Post Content */}
              <p className="text-slate-700 mb-4 whitespace-pre-line leading-relaxed">
                {post.content}
              </p>

              {/* Post Footer */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-500 hover:text-red-500 text-sm font-medium transition-colors"
                >
                  <Users size={18} />
                  {post.likes}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-500 hover:text-primary-500 text-sm font-medium transition-colors"
                >
                  <MessageCircle size={18} />
                  {post.comments}
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Community;
