import React, { useState } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import LoginScreen from '../components/LoginScreen';

export default function IndexScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LoginScreen onLogin={() => setIsLoggedIn(true)} />
    </View>
  );
}