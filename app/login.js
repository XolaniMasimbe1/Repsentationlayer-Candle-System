import React from 'react';
import { View } from 'react-native';
import LoginScreen from '../components/LoginScreen';

export default function LoginRoute() {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen onLogin={() => {
        console.log('Login successful from dedicated route');
      }} />
    </View>
  );
}
