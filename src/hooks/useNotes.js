/**
 * Custom Hook for Notes Management
 * Handles localStorage persistence with error handling
 */
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'calendar-notes';

export const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn('Failed to load notes from localStorage:', error);
      return {};
    }
  });

  const [error, setError] = useState(null);

  // Persist notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (storageError) {
      // Safe to set error state in catch block - this is error handling
      // for an exceptional condition during a side effect
      const errorMessage = storageError.name === 'QuotaExceededError'
        ? 'Storage quota exceeded. Some notes may not be saved.'
        : 'Could not save notes. Please check your browser storage settings.';
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(errorMessage);
      console.warn('Failed to save notes to localStorage:', storageError);
    }
  }, [notes]);

  const updateNote = (key, content) => {
    setNotes(prev => ({
      ...prev,
      [key]: content
    }));
  };

  // Clear error state when called by component
  const clearError = () => setError(null);

  return { notes, updateNote, error, clearError };
};
