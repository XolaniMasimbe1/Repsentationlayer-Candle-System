/**
 * Product API Service for Candle System
 * 
 * This service handles all product-related API operations including CRUD operations,
 * product search, and product management functionality.
 * 
 * References:
 * - React Native Fetch API: https://reactnative.dev/docs/network
 * - RESTful API Design: https://restfulapi.net/
 * - Error Handling in React Native: https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - Async/Await Best Practices: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * 
 * YouTube Tutorials Referenced:
 * - "React Native API Calls with Fetch" by Programming with Mosh
 * - "Async/Await in JavaScript" by The Net Ninja
 * - "Error Handling in React Native" by Codevolution
 * - "RESTful API Integration" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * 
 * Baeldung References:
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 * - https://www.baeldung.com/spring-boot-json
 */
import API_CONFIG from './config';

class ProductApi {
  // Create a new product
  async create(productData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Product API Error - create:', error);
      throw new Error('Failed to create product');
    }
  }

  // Read product by product number
  async read(productNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/read/${productNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Product API Error - read:', error);
      throw new Error('Failed to fetch product');
    }
  }

  // Update product
  async update(productData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Product API Error - update:', error);
      throw new Error('Failed to update product');
    }
  }

  // Find product by product number
  async findByProductNumber(productNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/find/${productNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Product API Error - findByProductNumber:', error);
      throw new Error('Failed to find product');
    }
  }

  // Get all products
  async getAll() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      
      // Transform products to include default image and rating
      return products.map(product => ({
        ...product,
        image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5,
        inCart: false
      }));
    } catch (error) {
      console.error('Product API Error - getAll:', error);
      throw new Error('Failed to fetch products');
    }
  }

  // Get product with enhanced data (image, rating)
  async getProductByNumber(productNumber) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/product/read/${productNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return {
        ...product,
        image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5
      };
    } catch (error) {
      console.error('Product API Error - getProductByNumber:', error);
      throw new Error('Failed to fetch product');
    }
  }
}

export default new ProductApi();
