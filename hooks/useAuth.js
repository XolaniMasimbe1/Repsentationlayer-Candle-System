import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token or session
    // This is a simplified version - in a real app you'd check AsyncStorage
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      // Call the auth API
      const result = await ApiService.login(username, password);
      
      if (result.includes('successful')) {
        // Fetch user data after successful login
        const userData = await ApiService.getUserByUsername(username);
        setUser(userData);
        return userData;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}