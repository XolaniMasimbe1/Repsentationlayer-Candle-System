import { useState, useEffect } from 'react';
import { RetailStoreApi, AdminApi /*, DriverApi - TEMPORARILY DISABLED */ } from '../services';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token or session
    // This is a simplified version - in a real app you'd check AsyncStorage
    setIsLoading(false);
  }, []);

  const login = async (username, password, userType = 'store') => {
    setIsLoading(true);
    try {
      let result;
      
      // Call the appropriate API based on user type
      if (userType === 'store') {
        result = await RetailStoreApi.login({
          user: { username, password }
        });
      } else if (userType === 'admin') {
        result = await AdminApi.login({
          user: { username, password }
        });
      } else {
        // DRIVER FUNCTIONALITY TEMPORARILY DISABLED
        // } else if (userType === 'driver') {
        //   result = await DriverApi.login({
        //     user: { username, password }
        //   });
        // }
        throw new Error('Invalid user type');
      }
      
      if (result) {
        setUser(result.user);
        return result;
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