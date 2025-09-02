/**
 * Centralized API Configuration for Candle System
 * 
 * This file centralizes all API configuration to avoid hardcoding URLs throughout the application.
 * Change the IP address here and it will update across all API services.
 * 
 * References:
 * - React Native Environment Variables: https://reactnative.dev/docs/environment-setup
 * - Expo Configuration: https://docs.expo.dev/guides/environment-variables/
 * - API Configuration Best Practices: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * - Centralized Configuration Pattern: https://www.baeldung.com/configuration-properties-in-spring-boot
 * 
 * YouTube Tutorials Referenced:
 * - "React Native API Integration" by Programming with Mosh
 * - "Expo Development Setup" by The Net Ninja
 * - "Environment Variables in React Native" by Codevolution
 * - "API Configuration in React Native" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 */

const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: 'http://192.168.12.236:8080/CandleSystem',
  
  // API Endpoints
  ENDPOINTS: {
    // User Management
    RETAIL_STORE: '/api/retailstore',
    ADMIN: '/api/admin',
    DRIVER: '/api/driver',
    
    // Product Management
    PRODUCT: '/api/product',
    MANUFACTURE: '/api/manufacture',
    
    // Order Management
    ORDER: '/api/order',
    ORDER_ITEM: '/api/orderitem',
    
    // Payment Management
    PAYMENT: '/api/payment',
    PAYMENT_METHOD: '/api/paymentmethod',
    
    // Invoice & Delivery
    INVOICE: '/api/invoice',
    DELIVERY: '/api/delivery',
  },
  
  // Request Configuration
  REQUEST_CONFIG: {
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }
};

export default API_CONFIG;
