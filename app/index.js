import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import LoginScreen from '../components/LoginScreen';
import { useCart } from '../context/CartContext';

export default function IndexScreen() {
  const { user, store } = useCart();

  // Check if user is authenticated - simplified logic
  const isLoggedIn = user && store && user.username && store.storeNumber;

  console.log('IndexScreen - Auth check:', {
    hasUser: !!user,
    hasStore: !!store,
    userUsername: user?.username,
    storeNumber: store?.storeNumber,
    isLoggedIn: isLoggedIn
  });

  // If user is logged in, redirect to tabs
  if (isLoggedIn) {
    console.log('IndexScreen - User is logged in, redirecting to tabs');
    return <Redirect href="/(tabs)" />;
  }

  // If not logged in, show login screen
  console.log('IndexScreen - User is not logged in, showing LoginScreen');
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen onLogin={() => {
        console.log('Login successful, redirecting to tabs');
      }} />
    </View>
  );
}