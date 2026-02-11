import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import callGeminiAPI from '../utils/geminiApi';

/**
 * AI Coach Page Component
 * Chat interface with AI study assistant
 */
const AICoach = ({ apiKey }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Chào bạn! Mình là StudyMate Coach. Hôm nay bạn cần giúp đỡ môn gì?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await callGeminiAPI(
      `Bạn là một trợ lý học tập thân thiện, hãy trả lời ngắn gọn câu hỏi sau của học sinh: ${userMsg.text}`,
      apiKey
    );

    setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-slate-50 relative"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mx-6 mt-6 mb-4 p-4 flex items-center gap-3"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white"
        >
          <Sparkles size={20} />
        </motion.div>
        <div>
          <h3 className="font-bold text-slate-800">StudyMate Coach</h3>
          <p className="text-xs text-accent-600 font-medium">●  Online • Hỗ trợ 24/7</p>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-none shadow-lg'
                  : 'card rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-slate-400 text-sm ml-2"
          >
            <span>AI đang soạn tin...</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg"
            >
              ●
            </motion.span>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white border-t border-slate-200"
      >
        <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-full border border-slate-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all"
        >
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-slate-700 px-2 py-1 placeholder:text-slate-400"
            placeholder="Hỏi bài tập, phương pháp học..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-soft"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AICoach;
