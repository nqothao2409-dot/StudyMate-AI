import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';

/**
 * Quiz Player Component
 * Interactive quiz-taking interface
 */
const QuizPlayer = ({ quiz, onFinish, onExit }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (idx) => {
    setSelected(idx);
    const isCorrect = idx === quiz.questions[currentQ].correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQ < quiz.questions.length - 1) {
        setCurrentQ((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
        onFinish(isCorrect ? score + 1 : score);
      }
    }, 1000);
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center text-yellow-500 mb-6"
        >
          <Award size={48} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-slate-800 mb-2"
        >
          Hoàn thành!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-slate-600 mb-6"
        >
          Bạn trả lời đúng{' '}
          <span className="text-primary-600 font-bold">
            {score}/{quiz.questions.length}
          </span>{' '}
          câu.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-bold hover:shadow-lg"
        >
          Trở về thư viện
        </motion.button>
      </motion.div>
    );
  }

  const qData = quiz.questions[currentQ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-10 px-4"
    >
      {/* Progress Header */}
      <motion.div className="mb-8 flex justify-between items-center text-slate-500 text-sm font-semibold uppercase tracking-wider">
        <span>
          Câu hỏi {currentQ + 1}/{quiz.questions.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          className="hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </motion.button>
      </motion.div>

      {/* Question Card */}
      <motion.div
        key={currentQ}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 mb-6"
      >
        <h3 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">
          {qData.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          <AnimatePresence>
            {qData.options.map((opt, idx) => {
              const isCorrect = idx === qData.correct;
              const isSelected = selected === idx;

              let bgClass = 'border-slate-100 hover:border-primary-200 hover:bg-primary-50';
              if (selected !== null) {
                if (isSelected) {
                  bgClass = isCorrect
                    ? 'border-accent-500 bg-accent-50 text-accent-700'
                    : 'border-red-500 bg-red-50 text-red-700';
                } else {
                  bgClass = isCorrect
                    ? 'border-accent-500 bg-accent-50 text-accent-700'
                    : 'border-slate-100 opacity-50';
                }
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium cursor-pointer ${bgClass}`}
                >
                  {opt}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizPlayer;
