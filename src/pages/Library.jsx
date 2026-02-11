import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Trash2 } from 'lucide-react';

/**
 * Library Page Component
 * Displays user's created quizzes and flashcards
 */
const Library = ({ quizzes, flashcards, onSelectQuiz, onSelectFlashcard, deleteItem }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      {/* Quizzes Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Brain className="text-primary-600" size={28} />
          Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <motion.p className="text-slate-400 italic text-lg">
            Chưa có quiz nào. Hãy tạo quiz đầu tiên!
          </motion.p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {quizzes.map((q) => (
              <motion.div
                key={q.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="card p-5 hover:shadow-lg transition-all"
              >
                <h4 className="font-bold text-slate-800 mb-3 line-clamp-2">{q.title}</h4>
                <p className="text-sm text-slate-500 mb-4">
                  {q.questions.length} câu hỏi • {q.createdAt}
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectQuiz(q)}
                    className="flex-1 bg-primary-50 text-primary-600 py-2 rounded-lg font-semibold text-sm hover:bg-primary-100 transition-colors"
                  >
                    Làm bài
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteItem('quiz', q.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Flashcards Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <BookOpen className="text-accent-600" size={28} />
          Flashcards
        </h2>

        {flashcards.length === 0 ? (
          <motion.p className="text-slate-400 italic text-lg">
            Chưa có bộ thẻ nào. Hãy tạo flashcard đầu tiên!
          </motion.p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {flashcards.map((f) => (
              <motion.div
                key={f.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="card p-5 hover:shadow-lg transition-all"
              >
                <h4 className="font-bold text-slate-800 mb-3 line-clamp-2">{f.title}</h4>
                <p className="text-sm text-slate-500 mb-4">
                  {f.cards.length} thẻ • {f.createdAt}
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectFlashcard(f)}
                    className="flex-1 bg-accent-50 text-accent-600 py-2 rounded-lg font-semibold text-sm hover:bg-accent-100 transition-colors"
                  >
                    Ôn tập
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteItem('flashcard', f.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Library;
