/**
 * API utility functions
 * Centralized API calls for the application
 */

import callGeminiAPI from './geminiApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
const apiCall = async (endpoint, options = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

/**
 * User API endpoints
 */
export const userApi = {
  getProfile: () => apiCall('/users/profile'),
  updateProfile: (data) => apiCall('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  getStats: () => apiCall('/users/stats'),
};

/**
 * Study API endpoints
 */
export const studyApi = {
  getQuizzes: () => apiCall('/quizzes'),
  createQuiz: (data) => apiCall('/quizzes', { method: 'POST', body: JSON.stringify(data) }),
  getFlashcards: () => apiCall('/flashcards'),
  createFlashcard: (data) => apiCall('/flashcards', { method: 'POST', body: JSON.stringify(data) }),
  getStudySessions: () => apiCall('/study-sessions'),
  recordSession: (data) => apiCall('/study-sessions', { method: 'POST', body: JSON.stringify(data) }),
};

/**
 * AI API endpoints
 */
export const aiApi = {
  generateSummary: (text) =>
    apiCall('/ai/summarize', { method: 'POST', body: JSON.stringify({ text }) }),
  generateQuiz: (text) =>
    apiCall('/ai/quiz', { method: 'POST', body: JSON.stringify({ text }) }),
  generateFlashcards: (text) =>
    apiCall('/ai/flashcards', { method: 'POST', body: JSON.stringify({ text }) }),
  askCoach: (question) =>
    apiCall('/ai/coach', { method: 'POST', body: JSON.stringify({ question }) }),
};

/**
 * Community API endpoints
 */
export const communityApi = {
  getPosts: () => apiCall('/posts'),
  createPost: (data) => apiCall('/posts', { method: 'POST', body: JSON.stringify(data) }),
  likePost: (postId) => apiCall(`/posts/${postId}/like`, { method: 'POST' }),
  getComments: (postId) => apiCall(`/posts/${postId}/comments`),
  addComment: (postId, data) =>
    apiCall(`/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(data) }),
};

export default {
  userApi,
  studyApi,
  aiApi,
  communityApi,
  callGeminiAPI,
};
