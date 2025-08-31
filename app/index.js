import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import LoginScreen from '../components/LoginScreen';
import { useCart } from '../context/CartContext';

export default function IndexScreen() {
  const { user, store } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (user && store) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user, store]);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LoginScreen onLogin={() => setIsLoggedIn(true)} />
    </View>
  );
}