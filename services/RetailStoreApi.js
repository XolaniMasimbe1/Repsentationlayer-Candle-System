/**
 * Retail Store API Service for Candle System
 * 
 * This service handles all retail store-related API operations including CRUD operations,
 * store authentication, and store management functionality.
 * 
 * References:
 * - React Native Fetch API: https://reactnative.dev/docs/network
 * - RESTful API Design: https://restfulapi.net/
 * - Authentication Flow: https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - Error Handling in React Native: https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * 
 * YouTube Tutorials Referenced:
 * - "React Native API Calls with Fetch" by Programming with Mosh
 * - "Authentication in React Native" by The Net Ninja
 * - "Error Handling in React Native" by Codevolution
 * - "RESTful API Integration" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * 
 * Baeldung References:
 * - https://www.baeldung.com/spring-security-login
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 */
import API_CONFIG from './config';

class RetailStoreApi {
  // Create a new retail store
  async create(retailStoreData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(retailStoreData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - create:', error);
      throw new Error(error.message || 'Failed to create retail store');
    }
  }

  // Read retail store by store ID
  async readById(storeId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/read/id/${storeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - readById:', error);
      throw new Error('Failed to fetch retail store by ID');
    }
  }

  // Read retail store by store number
  async readByStoreNumber(storeNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/read/${storeNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - readByStoreNumber:', error);
      throw new Error('Failed to fetch retail store by store number');
    }
  }

  // Read retail store by user ID
  async readByUserId(userId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/read/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - readByUserId:', error);
      throw new Error('Failed to fetch retail store by user ID');
    }
  }

  // Update retail store
  async update(retailStoreData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(retailStoreData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - update:', error);
      throw new Error('Failed to update retail store');
    }
  }

  // Get all retail stores
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - getAll:', error);
      throw new Error('Failed to fetch retail stores');
    }
  }

  // Register a new retail store
  async register(storeData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - register:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }

  // Login retail store
  async login(loginData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/store/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('RetailStore API Error - login:', error);
      throw new Error(error.message || 'Login failed');
    }
  }
}

export default new RetailStoreApi();
