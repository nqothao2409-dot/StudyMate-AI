import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, RefreshCw, Brain, Save } from 'lucide-react';
import callGeminiAPI from '../utils/geminiApi';

/**
 * AI Tools Page Component
 * Allows users to create quizzes, flashcards, and summaries using AI
 */
const AITools = ({ apiKey, onSaveQuiz, onSaveFlashcard }) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [generatedContent, setGeneratedContent] = useState(null);

  const tabs = [
    { id: 'summary', label: 'Tóm tắt' },
    { id: 'quiz', label: 'Tạo Quiz' },
    { id: 'flashcard', label: 'Flashcard' },
  ];

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    setGeneratedContent(null);

    let prompt = '';
    if (activeTab === 'summary') {
      prompt = `Hãy tóm tắt văn bản sau đây một cách ngắn gọn, dễ hiểu, gạch đầu dòng các ý chính: ${inputText}`;
    } else if (activeTab === 'quiz') {
      prompt = `Dựa trên văn bản sau: "${inputText}". Hãy tạo 5 câu hỏi trắc nghiệm. 
      Trả về kết quả CHỈ LÀ MỘT JSON ARRAY thuần túy, không có markdown code block. 
      Format: [{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0}] (correct là index của đáp án đúng).`;
    } else if (activeTab === 'flashcard') {
      prompt = `Dựa trên văn bản sau: "${inputText}". Hãy tạo 5-10 flashcard thuật ngữ - định nghĩa.
      Trả về kết quả CHỈ LÀ MỘT JSON ARRAY thuần túy, không có markdown code block.
      Format: [{"front": "Thuật ngữ", "back": "Định nghĩa/Giải thích"}]`;
    }

    try {
      let result = await callGeminiAPI(prompt, apiKey, activeTab);

      if (activeTab === 'quiz' || activeTab === 'flashcard') {
        result = result.replace(/```json/g, '').replace(/```/g, '').trim();
        try {
          const parsed = JSON.parse(result);
          setGeneratedContent(parsed);
        } catch (e) {
          setGeneratedContent('Lỗi: AI không trả về đúng định dạng JSON. Vui lòng thử lại.');
        }
      } else {
        setGeneratedContent(result);
      }
    } catch (e) {
      setGeneratedContent('Đã có lỗi xảy ra.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const title = inputText.substring(0, 30) + '...';
    if (activeTab === 'quiz') {
      onSaveQuiz({
        id: Date.now(),
        title,
        questions: generatedContent,
        createdAt: new Date().toLocaleDateString(),
      });
      alert('Đã lưu Quiz vào thư viện!');
    } else if (activeTab === 'flashcard') {
      onSaveFlashcard({
        id: Date.now(),
        title,
        cards: generatedContent,
        createdAt: new Date().toLocaleDateString(),
      });
      alert('Đã lưu Flashcard vào thư viện!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 max-w-6xl mx-auto h-full flex flex-col"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-primary-600" size={28} /> AI Study Studio
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 h-full"
        >
          {/* Tab Selector */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setGeneratedContent(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-700 shadow-soft-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <textarea
            className="flex-1 w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none text-slate-700 font-medium placeholder:text-slate-400"
            placeholder="Nhập nội dung bài học vào đây..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all flex justify-center items-center gap-2 ${
              isGenerating
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:shadow-lg hover:shadow-primary-500/30'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Đang phân tích...
              </>
            ) : (
              <>
                <Zap size={20} />
                Xử lý ngay
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Output Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 overflow-y-auto max-h-[600px]"
        >
          {!generatedContent && !isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <Brain size={64} className="mb-4 opacity-20" />
              <p>Kết quả sẽ hiện ở đây</p>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
            </div>
          )}

          {generatedContent && typeof generatedContent === 'string' && (
            <div className="prose text-slate-700 whitespace-pre-line leading-relaxed max-w-none">
              {generatedContent}
            </div>
          )}

          {generatedContent && Array.isArray(generatedContent) && (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <h3 className="font-bold text-lg text-slate-800">Kết quả AI</h3>
                {(activeTab === 'quiz' || activeTab === 'flashcard') && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 text-sm font-bold text-accent-600 bg-accent-50 px-3 py-2 rounded-full hover:bg-accent-100"
                  >
                    <Save size={16} /> Lưu
                  </motion.button>
                )}
              </div>

              {/* Quiz Results */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  {generatedContent.map((q, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                    >
                      <p className="font-bold text-slate-800 mb-2">
                        Câu {idx + 1}: {q.question}
                      </p>
                      <ul className="space-y-1 ml-4 list-disc text-slate-600 text-sm">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={
                              i === q.correct
                                ? 'text-accent-600 font-bold'
                                : ''
                            }
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Flashcard Results */}
              {activeTab === 'flashcard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {generatedContent.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-lg border border-primary-200"
                    >
                      <p className="font-bold text-primary-800 border-b border-primary-200 pb-2 mb-2">
                        {card.front}
                      </p>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {card.back}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AITools;
