import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Clock, MessageCircle, Users, Home, Award, Zap, 
  Menu, X, Upload, Play, Pause, RefreshCw, ChevronRight, 
  Brain, CheckCircle, Star, Sparkles, Send, Mic, FileText, Music,
  Settings, Save, Trash2, ArrowRight, RotateCcw
} from 'lucide-react';

// --- UTILS & HELPERS ---

// Helper để lưu/lấy dữ liệu từ LocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// Hàm gọi API Gemini (Simulated call nếu không có Key, Real call nếu có Key)
const callGeminiAPI = async (prompt, apiKey, type = 'text') => {
  if (!apiKey) {
    // Fallback Mock Data nếu người dùng chưa nhập Key
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type === 'quiz') {
          resolve(JSON.stringify([
            { question: "Thủ đô của Việt Nam là gì?", options: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế"], correct: 1 },
            { question: "Công thức hóa học của nước?", options: ["HO", "H2O", "CO2", "O2"], correct: 1 },
            { question: "Số Pi xấp xỉ bằng bao nhiêu?", options: ["3.14", "3.15", "3.12", "3.16"], correct: 0 },
          ]));
        } else if (type === 'flashcard') {
          resolve(JSON.stringify([
            { front: "Hello", back: "Xin chào" },
            { front: "Apple", back: "Quả táo" },
            { front: "School", back: "Trường học" },
          ]));
        } else {
          resolve("Đây là phản hồi mẫu do bạn chưa nhập API Key. Hãy vào Cài đặt để nhập Gemini API Key và trải nghiệm AI thực sự!");
        }
      }, 1500);
    });
  }

  // Real API Call logic
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra API Key.";
  }
};

// --- COMPONENTS ---

const Navigation = ({ currentView, setView, isMobileMenuOpen, setIsMobileMenuOpen, user }) => {
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

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Sparkles size={24} /> StudyMate
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex flex-col w-64 bg-slate-900 text-white transition-transform duration-300 z-40 h-screen overflow-y-auto`}>
        <div className="p-6 flex items-center gap-2 font-bold text-2xl text-emerald-400">
          <Sparkles /> StudyMate AI
        </div>
        
        <div className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-700">
          <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold truncate w-32">{user.name}</p>
              <p className="text-xs text-emerald-400">Level {Math.floor(user.xp / 100) + 1}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = ({ setView, user }) => {
  const level = Math.floor(user.xp / 100) + 1;
  const progress = user.xp % 100;

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Chào {user.name}! 👋</h2>
        <div className="flex items-center gap-4 mt-2">
           <div className="flex-1 max-w-xs bg-slate-200 h-2.5 rounded-full overflow-hidden">
             <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${progress}%` }}></div>
           </div>
           <span className="text-sm text-slate-600 font-medium">{progress}/100 XP đến Level {level + 1}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg"><Clock size={24} /></div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{Math.floor(user.totalStudyTime / 60)}h {user.totalStudyTime % 60}p</h3>
          <p className="text-indigo-100">Thời gian học tập</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg"><CheckCircle size={24} /></div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{user.quizzesTaken}</h3>
          <p className="text-emerald-100">Quiz đã hoàn thành</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg"><Star size={24} /></div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{user.xp}</h3>
          <p className="text-orange-100">Điểm kinh nghiệm (XP)</p>
        </div>
      </div>

      <h3 className="font-bold text-xl text-slate-800 mb-4">Truy cập nhanh</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tạo Quiz mới", icon: Brain, color: "bg-purple-100 text-purple-600", action: () => setView('tools') },
          { label: "Bật Pomodoro", icon: Clock, color: "bg-red-100 text-red-600", action: () => setView('focus') },
          { label: "Hỏi AI Coach", icon: MessageCircle, color: "bg-blue-100 text-blue-600", action: () => setView('coach') },
          { label: "Thư viện", icon: BookOpen, color: "bg-indigo-100 text-indigo-600", action: () => setView('library') },
        ].map((item, idx) => (
          <button 
            key={idx} 
            onClick={item.action}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3 text-center"
          >
            <div className={`p-3 rounded-full ${item.color}`}>
              <item.icon size={24} />
            </div>
            <span className="font-semibold text-slate-700">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const AITools = ({ apiKey, onSaveQuiz, onSaveFlashcard }) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [generatedContent, setGeneratedContent] = useState(null);

  const handleGenerate = async () => {
    if (!inputText) return;
    setIsGenerating(true);
    setGeneratedContent(null);

    let prompt = "";
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
      
      // Clean up markdown block logic if AI adds it
      if (activeTab === 'quiz' || activeTab === 'flashcard') {
         result = result.replace(/```json/g, '').replace(/```/g, '').trim();
         try {
            const parsed = JSON.parse(result);
            setGeneratedContent(parsed);
         } catch (e) {
            setGeneratedContent("Lỗi: AI không trả về đúng định dạng JSON. Vui lòng thử lại.");
         }
      } else {
        setGeneratedContent(result);
      }
    } catch (e) {
      setGeneratedContent("Đã có lỗi xảy ra.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const title = inputText.substring(0, 30) + "...";
    if (activeTab === 'quiz') {
      onSaveQuiz({ id: Date.now(), title, questions: generatedContent, createdAt: new Date().toLocaleDateString() });
      alert("Đã lưu Quiz vào thư viện!");
    } else if (activeTab === 'flashcard') {
      onSaveFlashcard({ id: Date.now(), title, cards: generatedContent, createdAt: new Date().toLocaleDateString() });
      alert("Đã lưu Flashcard vào thư viện!");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-indigo-600" /> AI Study Studio
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 h-full">
        {/* Input */}
        <div className="flex flex-col gap-4 h-full">
           <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
              {['summary', 'quiz', 'flashcard'].map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setGeneratedContent(null); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                    activeTab === tab ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab === 'summary' ? 'Tóm tắt' : tab === 'quiz' ? 'Tạo Quiz' : 'Flashcard'}
                </button>
              ))}
           </div>
           <textarea
             className="flex-1 w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-slate-700 font-medium"
             placeholder="Nhập nội dung bài học vào đây..."
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
           ></textarea>
           <button 
            onClick={handleGenerate}
            disabled={isGenerating || !inputText}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all flex justify-center items-center gap-2 ${
              isGenerating ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'
            }`}
          >
            {isGenerating ? <RefreshCw className="animate-spin" /> : <Zap />}
            {isGenerating ? 'Đang phân tích...' : 'Xử lý ngay'}
          </button>
        </div>

        {/* Output */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-y-auto max-h-[600px]">
           {!generatedContent && !isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-slate-400">
               <Brain size={64} className="mb-4 opacity-20" />
               <p>Kết quả sẽ hiện ở đây</p>
             </div>
           )}

           {isGenerating && (
             <div className="space-y-4 animate-pulse">
               <div className="h-4 bg-slate-200 rounded w-3/4"></div>
               <div className="h-4 bg-slate-200 rounded w-full"></div>
               <div className="h-4 bg-slate-200 rounded w-5/6"></div>
             </div>
           )}

           {generatedContent && (
             <div>
               <div className="flex justify-between items-center mb-4 pb-2 border-b">
                 <h3 className="font-bold text-lg text-slate-800">Kết quả AI</h3>
                 {(activeTab === 'quiz' || activeTab === 'flashcard') && (
                   <button onClick={handleSave} className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100">
                     <Save size={16} /> Lưu lại
                   </button>
                 )}
               </div>

               {activeTab === 'summary' && (
                 <div className="prose text-slate-700 whitespace-pre-line leading-relaxed">
                   {generatedContent}
                 </div>
               )}

               {activeTab === 'quiz' && Array.isArray(generatedContent) && (
                 <div className="space-y-4">
                   {generatedContent.map((q, idx) => (
                     <div key={idx} className="bg-slate-50 p-4 rounded-lg">
                       <p className="font-bold text-slate-800 mb-2">Câu {idx+1}: {q.question}</p>
                       <ul className="space-y-1 ml-4 list-disc text-slate-600 text-sm">
                         {q.options.map((opt, i) => (
                           <li key={i} className={i === q.correct ? "text-emerald-600 font-bold" : ""}>{opt}</li>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
               )}

              {activeTab === 'flashcard' && Array.isArray(generatedContent) && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {generatedContent.map((card, idx) => (
                     <div key={idx} className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                       <p className="font-bold text-indigo-800 border-b border-indigo-200 pb-1 mb-1">{card.front}</p>
                       <p className="text-slate-700 text-sm">{card.back}</p>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const QuizPlayer = ({ quiz, onFinish, onExit }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (idx) => {
    setSelected(idx);
    const isCorrect = idx === quiz.questions[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      if (currentQ < quiz.questions.length - 1) {
        setCurrentQ(c => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
        onFinish(isCorrect ? score + 1 : score);
      }
    }, 1000);
  };

  if (finished) return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
       <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-6">
         <Award size={48} />
       </div>
       <h2 className="text-3xl font-bold text-slate-800 mb-2">Hoàn thành!</h2>
       <p className="text-xl text-slate-600 mb-6">Bạn trả lời đúng <span className="text-indigo-600 font-bold">{score}/{quiz.questions.length}</span> câu.</p>
       <button onClick={onExit} className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700">Trở về thư viện</button>
    </div>
  );

  const qData = quiz.questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8 flex justify-between items-center text-slate-500 text-sm font-semibold uppercase tracking-wider">
        <span>Câu hỏi {currentQ + 1}/{quiz.questions.length}</span>
        <button onClick={onExit} className="hover:text-red-500">Thoát</button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">{qData.question}</h3>
        <div className="space-y-3">
          {qData.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
                selected === null 
                  ? 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50'
                  : selected === idx 
                    ? (idx === qData.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-500 bg-red-50 text-red-700')
                    : (idx === qData.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 opacity-50')
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FlashcardPlayer = ({ set, onExit }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex justify-between w-full max-w-lg mb-4">
        <span className="font-bold text-slate-500">{current + 1} / {set.cards.length}</span>
        <button onClick={onExit} className="text-slate-400 hover:text-slate-800"><X /></button>
      </div>
      
      <div 
        className="relative w-full max-w-lg h-80 perspective-1000 cursor-pointer group"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white border-2 border-indigo-100 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2 block">Thuật ngữ</span>
              <h3 className="text-3xl font-bold text-slate-800">{set.cards[current].front}</h3>
              <p className="mt-4 text-slate-400 text-sm">(Chạm để lật)</p>
            </div>
          </div>
          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center rotate-y-180 text-white">
             <div>
              <span className="text-xs uppercase tracking-widest text-indigo-200 font-bold mb-2 block">Định nghĩa</span>
              <h3 className="text-xl font-medium leading-relaxed">{set.cards[current].back}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => { setFlipped(false); setCurrent(c => c > 0 ? c - 1 : c); }}
          className="p-4 rounded-full bg-white shadow-md text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          disabled={current === 0}
        >
          <ArrowRight className="rotate-180" />
        </button>
        <button 
           onClick={() => { setFlipped(false); setCurrent(c => c < set.cards.length - 1 ? c + 1 : c); }}
           className="p-4 rounded-full bg-indigo-600 shadow-md text-white hover:bg-indigo-700 disabled:opacity-50"
           disabled={current === set.cards.length - 1}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

const Library = ({ quizzes, flashcards, onSelectQuiz, onSelectFlashcard, deleteItem }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Thư viện của tôi</h2>
      
      <div className="mb-8">
        <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2"><Brain size={20}/> Quizzes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quizzes.length === 0 ? <p className="text-slate-400 italic">Chưa có quiz nào.</p> : quizzes.map(q => (
            <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-slate-800 mb-2 truncate">{q.title}</h4>
              <p className="text-sm text-slate-500 mb-4">{q.questions.length} câu hỏi • {q.createdAt}</p>
              <div className="flex gap-2">
                <button onClick={() => onSelectQuiz(q)} className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-100">Làm bài</button>
                <button onClick={() => deleteItem('quiz', q.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2"><BookOpen size={20}/> Flashcards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashcards.length === 0 ? <p className="text-slate-400 italic">Chưa có bộ thẻ nào.</p> : flashcards.map(f => (
            <div key={f.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-slate-800 mb-2 truncate">{f.title}</h4>
              <p className="text-sm text-slate-500 mb-4">{f.cards.length} thẻ • {f.createdAt}</p>
              <div className="flex gap-2">
                <button onClick={() => onSelectFlashcard(f)} className="flex-1 bg-emerald-50 text-emerald-600 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-100">Ôn tập</button>
                <button onClick={() => deleteItem('flashcard', f.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FocusTimer = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3'));

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setAudioPlaying(false);
      audioRef.current.pause();
      if (mode === 'pomodoro') {
        onSessionComplete(25);
        alert("Hoàn thành phiên học! Bạn nhận được XP.");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (audioPlaying) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
    } else {
        audioRef.current.pause();
    }
  }, [audioPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-lg text-center relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`}></div>
        
        <div className="flex justify-center gap-2 mb-8 bg-slate-100 p-1 rounded-xl inline-flex">
          {[
            { id: 'pomodoro', label: 'Học bài', min: 25 },
            { id: 'short', label: 'Nghỉ ngắn', min: 5 },
            { id: 'long', label: 'Nghỉ dài', min: 15 }
          ].map(m => (
            <button 
              key={m.id}
              onClick={() => { setMode(m.id); setIsActive(false); setTimeLeft(m.min * 60); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="text-8xl font-black text-slate-800 tracking-tighter mb-8 font-mono">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-transform hover:scale-110 ${isActive ? 'bg-amber-500' : 'bg-emerald-500'}`}
          >
            {isActive ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
          </button>
          <button 
             onClick={() => { setIsActive(false); setTimeLeft(mode === 'pomodoro' ? 25*60 : mode === 'short' ? 5*60 : 15*60); }}
             className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-300"
          >
            <RotateCcw />
          </button>
        </div>

        <div className="border-t pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-full transition-colors ${audioPlaying ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
               <Music size={20} />
             </div>
             <div className="text-left">
               <p className="text-sm font-bold text-slate-700">Lofi Chill Beats</p>
               <p className="text-xs text-slate-500">{audioPlaying ? 'Đang phát...' : 'Nhấn để nghe'}</p>
             </div>
          </div>
          <button onClick={() => setAudioPlaying(!audioPlaying)} className="text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-full">
            {audioPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AICoach = ({ apiKey }) => {
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Chào bạn! Mình là StudyMate Coach. Hôm nay bạn cần giúp đỡ môn gì?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setLoading(true);

    const reply = await callGeminiAPI(`Bạn là một trợ lý học tập thân thiện, hãy trả lời ngắn gọn câu hỏi sau của học sinh: ${newMsg.text}`, apiKey);
    
    setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="bg-white p-4 border-b border-slate-200 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
           <Sparkles size={20} />
        </div>
        <div>
           <h3 className="font-bold text-slate-800">StudyMate Coach</h3>
           <p className="text-xs text-emerald-600 font-medium">Online • Hỗ trợ 24/7</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-400 text-xs ml-4">AI đang soạn tin...</div>}
        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-full border border-slate-200 focus-within:border-indigo-500 transition-colors">
          <input 
            type="text" 
            className="flex-1 bg-transparent outline-none text-slate-700 px-4 py-1"
            placeholder="Hỏi bài tập, phương pháp học..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={loading} className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-sm">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Community = ({ posts, addPost, user }) => {
  const [newContent, setNewContent] = useState('');
  const [tag, setTag] = useState('Chung');

  const handlePost = () => {
    if (!newContent) return;
    addPost({
      id: Date.now(),
      user: user.name,
      avatar: user.name.charAt(0),
      content: newContent,
      tag: tag,
      likes: 0,
      comments: 0,
      time: 'Vừa xong'
    });
    setNewContent('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
         <h3 className="font-bold text-slate-700 mb-4">Tạo bài viết mới</h3>
         <textarea 
           className="w-full p-3 bg-slate-50 rounded-xl border-none outline-none resize-none mb-3 focus:bg-white focus:ring-2 ring-indigo-100 transition-all"
           rows="3"
           placeholder="Chia sẻ kiến thức hoặc đặt câu hỏi..."
           value={newContent}
           onChange={(e) => setNewContent(e.target.value)}
         ></textarea>
         <div className="flex justify-between items-center">
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="bg-slate-100 text-slate-600 text-sm font-semibold py-2 px-4 rounded-lg outline-none">
              <option>Chung</option>
              <option>Toán học</option>
              <option>Văn học</option>
              <option>Tiếng Anh</option>
            </select>
            <button onClick={handlePost} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors">Đăng bài</button>
         </div>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{post.user}</h4>
                  <p className="text-xs text-slate-500">{post.time}</p>
                </div>
              </div>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">{post.tag}</span>
            </div>
            <p className="text-slate-700 mb-4 whitespace-pre-line">{post.content}</p>
            <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
              <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 text-sm font-medium"><Users size={18} /> {post.likes}</button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 text-sm font-medium"><MessageCircle size={18} /> {post.comments}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsPage = ({ apiKey, setApiKey, user, resetData }) => {
  const [keyInput, setKeyInput] = useState(apiKey);

  const handleSave = () => {
    setApiKey(keyInput);
    alert("Đã lưu API Key!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Cài đặt</h2>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap className="text-yellow-500"/> Cấu hình AI</h3>
        <p className="text-sm text-slate-500 mb-4">Nhập Google Gemini API Key để kích hoạt các tính năng thông minh.</p>
        <div className="flex gap-2">
          <input 
            type="password" 
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="flex-1 p-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
            placeholder="AIzaSy..."
          />
          <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold">Lưu</button>
        </div>
        <p className="text-xs text-slate-400 mt-2">Key được lưu an toàn trong trình duyệt của bạn.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2"><Trash2/> Vùng nguy hiểm</h3>
        <button onClick={resetData} className="border border-red-200 text-red-600 bg-red-50 px-4 py-2 rounded-lg font-bold hover:bg-red-100 w-full">
          Xóa toàn bộ dữ liệu & Reset App
        </button>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  // State Initialization with LocalStorage
  const [user, setUser] = useLocalStorage('sm_user', { name: 'Bạn', xp: 120, totalStudyTime: 270, quizzesTaken: 5 });
  const [apiKey, setApiKey] = useLocalStorage('sm_apikey', '');
  const [quizzes, setQuizzes] = useLocalStorage('sm_quizzes', []);
  const [flashcards, setFlashcards] = useLocalStorage('sm_flashcards', []);
  const [posts, setPosts] = useLocalStorage('sm_posts', [
    { id: 1, user: "Minh Anh", avatar: "M", content: "Mọi người ơi, làm sao để học thuộc công thức Lý nhanh ạ?", likes: 5, comments: 2, tag: "Vật Lý", time: "2 giờ trước" }
  ]);
  
  const [currentView, setView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeFlashcard, setActiveFlashcard] = useState(null);

  // Actions
  const addXp = (amount) => setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  const addStudyTime = (mins) => setUser(prev => ({ ...prev, totalStudyTime: prev.totalStudyTime + mins }));
  
  const handleQuizFinish = (score) => {
    addXp(score * 10);
    setUser(prev => ({ ...prev, quizzesTaken: prev.quizzesTaken + 1 }));
    alert(`Chúc mừng! Bạn nhận được ${score * 10} XP.`);
    setActiveQuiz(null);
  };

  const handleReset = () => {
    if(window.confirm("Bạn chắc chắn muốn xóa hết dữ liệu?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // View Router
  const renderContent = () => {
    if (activeQuiz) return <QuizPlayer quiz={activeQuiz} onFinish={handleQuizFinish} onExit={() => setActiveQuiz(null)} />;
    if (activeFlashcard) return <FlashcardPlayer set={activeFlashcard} onExit={() => setActiveFlashcard(null)} />;

    switch (currentView) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              StudyMate <span className="text-indigo-600">AI</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mb-8">Nền tảng học tập thông minh tất cả trong một.</p>
            <button onClick={() => setView('dashboard')} className="bg-indigo-600 text-white text-lg font-bold py-4 px-12 rounded-full shadow-xl hover:scale-105 transition-all">
              Bắt đầu học ngay
            </button>
          </div>
        );
      case 'dashboard':
        return <Dashboard setView={setView} user={user} />;
      case 'tools':
        return <AITools apiKey={apiKey} onSaveQuiz={q => setQuizzes(prev => [q, ...prev])} onSaveFlashcard={f => setFlashcards(prev => [f, ...prev])} />;
      case 'library':
        return <Library quizzes={quizzes} flashcards={flashcards} onSelectQuiz={setActiveQuiz} onSelectFlashcard={setActiveFlashcard} deleteItem={(type, id) => {
           if(type === 'quiz') setQuizzes(qs => qs.filter(q => q.id !== id));
           else setFlashcards(fs => fs.filter(f => f.id !== id));
        }} />;
      case 'focus':
        return <FocusTimer onSessionComplete={(mins) => { addStudyTime(mins); addXp(50); }} />;
      case 'coach':
        return <AICoach apiKey={apiKey} />;
      case 'community':
        return <Community posts={posts} addPost={p => setPosts([p, ...posts])} user={user} />;
      case 'settings':
        return <SettingsPage apiKey={apiKey} setApiKey={setApiKey} user={user} resetData={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {currentView !== 'home' && !activeQuiz && !activeFlashcard && (
        <Navigation currentView={currentView} setView={setView} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} user={user} />
      )}
      <main className="flex-1 h-full overflow-y-auto relative w-full">
        {renderContent()}
      </main>
      
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;