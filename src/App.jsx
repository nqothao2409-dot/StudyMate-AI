import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AITools from './pages/AITools';
import Library from './pages/Library';
import FocusTimer from './pages/FocusTimer';
import AICoach from './pages/AICoach';
import Community from './pages/Community';
import SettingsPage from './pages/SettingsPage';
import QuizPlayer from './components/QuizPlayer';
import FlashcardPlayer from './components/FlashcardPlayer';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/globals.css';

/**
 * Main App Component
 * Routes between different pages and manages global state
 */
export default function App() {
  const [currentView, setCurrentView] = useState('home');

  // User state
  const [user, setUser] = useLocalStorage('sm_user', {
    name: 'Bạn',
    xp: 120,
    totalStudyTime: 270,
    quizzesTaken: 5,
  });

  // API Key state
  const [apiKey, setApiKey] = useLocalStorage('sm_apikey', '');

  // Study materials
  const [quizzes, setQuizzes] = useLocalStorage('sm_quizzes', []);
  const [flashcards, setFlashcards] = useLocalStorage('sm_flashcards', []);

  // Community posts
  const [posts, setPosts] = useLocalStorage('sm_posts', [
    {
      id: 1,
      user: 'Minh Anh',
      avatar: 'M',
      content: 'Mọi người ơi, làm sao để học thuộc công thức Lý nhanh ạ?',
      likes: 5,
      comments: 2,
      tag: 'Vật Lý',
      time: '2 giờ trước',
    },
  ]);

  // Active quiz/flashcard
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeFlashcard, setActiveFlashcard] = useState(null);

  // User actions
  const addXp = (amount) => {
    setUser((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  const addStudyTime = (mins) => {
    setUser((prev) => ({ ...prev, totalStudyTime: prev.totalStudyTime + mins }));
  };

  const handleQuizFinish = (score) => {
    addXp(score * 10);
    setUser((prev) => ({ ...prev, quizzesTaken: prev.quizzesTaken + 1 }));
    alert(`Chúc mừng! Bạn nhận được ${score * 10} XP.`);
    setActiveQuiz(null);
  };

  const handleReset = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa hết dữ liệu?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render page content
  const renderContent = () => {
    if (activeQuiz) {
      return (
        <QuizPlayer
          quiz={activeQuiz}
          onFinish={handleQuizFinish}
          onExit={() => setActiveQuiz(null)}
        />
      );
    }

    if (activeFlashcard) {
      return (
        <FlashcardPlayer
          set={activeFlashcard}
          onExit={() => setActiveFlashcard(null)}
        />
      );
    }

    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;

      case 'dashboard':
        return <Dashboard user={user} onNavigate={handleNavigate} />;

      case 'tools':
        return (
          <AITools
            apiKey={apiKey}
            onSaveQuiz={(q) => setQuizzes((prev) => [q, ...prev])}
            onSaveFlashcard={(f) => setFlashcards((prev) => [f, ...prev])}
          />
        );

      case 'library':
        return (
          <Library
            quizzes={quizzes}
            flashcards={flashcards}
            onSelectQuiz={setActiveQuiz}
            onSelectFlashcard={setActiveFlashcard}
            deleteItem={(type, id) => {
              if (type === 'quiz') {
                setQuizzes((qs) => qs.filter((q) => q.id !== id));
              } else {
                setFlashcards((fs) => fs.filter((f) => f.id !== id));
              }
            }}
          />
        );

      case 'focus':
        return (
          <FocusTimer
            onSessionComplete={(mins) => {
              addStudyTime(mins);
              addXp(50);
            }}
          />
        );

      case 'coach':
        return <AICoach apiKey={apiKey} />;

      case 'community':
        return (
          <Community
            posts={posts}
            addPost={(p) => setPosts([p, ...posts])}
            user={user}
          />
        );

      case 'settings':
        return (
          <SettingsPage
            apiKey={apiKey}
            setApiKey={setApiKey}
            user={user}
            resetData={handleReset}
          />
        );

      default:
        return null;
    }
  };

  // On home page, don't show the layout (sidebar/topbar)
  if (currentView === 'home') {
    return <HomePage onNavigate={handleNavigate} />;
  }

  return (
    <Layout currentView={currentView} user={user} onNavigate={handleNavigate}>
      <main className="min-h-screen">
        {renderContent()}
      </main>
    </Layout>
  );
}
