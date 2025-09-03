/**
 * Main Index Screen for Candle System
 * 
 * This is the entry point of the application that handles authentication routing
 * and redirects users to appropriate dashboards based on their role.
 * 
 * References:
 * - Expo Router: https://docs.expo.dev/router/introduction/
 * - React Native Navigation: https://reactnative.dev/docs/navigation
 * - Authentication Routing: https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - Conditional Rendering: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * 
 * YouTube Tutorials Referenced:
 * - "Expo Router Tutorial" by Programming with Mosh
 * - "React Native Navigation" by The Net Ninja
 * - "Authentication Flow in React Native" by Codevolution
 * - "Conditional Rendering in React" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * 
 * Baeldung References:
 * - https://www.baeldung.com/spring-security-authentication
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 */
import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import LoginScreen from '../components/LoginScreen';
import { useCart } from '../context/CartContext';

export default function IndexScreen() {
  const { user, store } = useCart();

  // Check if user is authenticated
  const isLoggedIn = user && user.username;
  const isStoreOwner = isLoggedIn && store && store.storeNumber;
  const isAdmin = isLoggedIn && !store && user.role === 'ADMIN'; // Admin has role and no store
  // const isDriver = isLoggedIn && !store && user.role === 'DRIVER'; // Driver has role and no store - TEMPORARILY DISABLED

  console.log('IndexScreen - Auth check:', {
    hasUser: !!user,
    hasStore: !!store,
    userUsername: user?.username,
    userRole: user?.role,
    storeNumber: store?.storeNumber,
    isLoggedIn: isLoggedIn,
    isStoreOwner: isStoreOwner,
    isAdmin: isAdmin,
    // isDriver: isDriver - TEMPORARILY DISABLED
  });

  // If admin is logged in, redirect to admin dashboard
  if (isAdmin) {
    console.log('IndexScreen - Admin is logged in, redirecting to admin dashboard');
    return <Redirect href="/admin-dashboard" />;
  }

  // DRIVER FUNCTIONALITY TEMPORARILY DISABLED
  // If driver is logged in, redirect to driver dashboard
  // if (isDriver) {
  //   console.log('IndexScreen - Driver is logged in, redirecting to driver dashboard');
  //   return <Redirect href="/driver-dashboard" />;
  // }

  // If store owner is logged in, redirect to tabs
  if (isStoreOwner) {
    console.log('IndexScreen - Store owner is logged in, redirecting to tabs');
    return <Redirect href="/(tabs)" />;
  }

  // If not logged in, show login screen
  console.log('IndexScreen - User is not logged in, showing LoginScreen');
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen onLogin={() => {
        console.log('Login successful, will redirect based on user type');
      }} />
    </View>
  );
}