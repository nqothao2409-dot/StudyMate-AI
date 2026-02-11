import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

/**
 * Flashcard Player Component
 * Interactive flashcard flip interface
 */
const FlashcardPlayer = ({ set, onExit }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const goNext = () => {
    if (current < set.cards.length - 1) {
      setFlipped(false);
      setCurrent((c) => c + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setFlipped(false);
      setCurrent((c) => c - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between w-full max-w-lg mb-8"
      >
        <span className="font-bold text-slate-600">
          {current + 1} / {set.cards.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          className="text-slate-400 hover:text-slate-800 transition-colors"
        >
          <X size={24} />
        </motion.button>
      </motion.div>

      {/* Flashcard */}
      <motion.div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full max-w-lg h-80 cursor-pointer perspective"
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full"
        >
          {/* Front */}
          <motion.div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute w-full h-full card p-8 flex items-center justify-center text-center"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-primary-400 font-bold mb-4 block">
                Thuật ngữ
              </span>
              <h3 className="text-3xl font-bold text-slate-800 break-words">
                {set.cards[current].front}
              </h3>
              <p className="mt-6 text-slate-400 text-sm">(Chạm để lật)</p>
            </div>
          </motion.div>

          {/* Back */}
          <motion.div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg p-8 flex items-center justify-center text-center text-white"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-primary-200 font-bold mb-4 block">
                Định nghĩa
              </span>
              <h3 className="text-xl font-medium leading-relaxed break-words">
                {set.cards[current].back}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goPrev}
          disabled={current === 0}
          className="p-4 rounded-full bg-white shadow-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRight className="rotate-180" size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goNext}
          disabled={current === set.cards.length - 1}
          className="p-4 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg text-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRight size={24} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FlashcardPlayer;
