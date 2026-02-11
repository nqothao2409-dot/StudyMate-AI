import React, { createContext, useContext, useState } from 'react';

/**
 * User Context
 * Manages global user state including profile, XP, level, etc.
 */
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Student',
    email: 'student@example.com',
    xp: 250,
    level: 3,
    avatar: 'S',
    totalStudyTime: 450,
    quizzesTaken: 12,
    joinDate: new Date('2024-01-15'),
  });

  const addXP = (amount) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + amount,
      level: Math.floor((prev.xp + amount) / 100) + 1,
    }));
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, addXP, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export default UserContext;
