import React, { createContext, useContext, useState } from 'react';

/**
 * Study Context
 * Manages study sessions, quizzes, flashcards, and library items
 */
const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [studySessions, setStudySessions] = useState([]);

  const addQuiz = (quiz) => {
    setQuizzes(prev => [quiz, ...prev]);
  };

  const addFlashcard = (flashcard) => {
    setFlashcards(prev => [flashcard, ...prev]);
  };

  const deleteQuiz = (id) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const deleteFlashcard = (id) => {
    setFlashcards(prev => prev.filter(f => f.id !== id));
  };

  const recordStudySession = (session) => {
    setStudySessions(prev => [session, ...prev]);
  };

  return (
    <StudyContext.Provider
      value={{
        quizzes,
        flashcards,
        studySessions,
        addQuiz,
        addFlashcard,
        deleteQuiz,
        deleteFlashcard,
        recordStudySession,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within StudyProvider');
  }
  return context;
};

export default StudyContext;
