/**
 * Root Layout Component for Candle System
 * 
 * This component sets up the main navigation structure and provides
 * the CartProvider context to all child components.
 * 
 * References:
 * - Expo Router: https://docs.expo.dev/router/introduction/
 * - React Context Provider: https://reactjs.org/docs/context.html
 * - Navigation Stack: https://reactnative.dev/docs/navigation
 * - Status Bar Configuration: https://docs.expo.dev/versions/latest/sdk/status-bar/
 * 
 * YouTube Tutorials Referenced:
 * - "Expo Router Setup" by Programming with Mosh
 * - "React Native Navigation" by The Net Ninja
 * - "Context Provider Setup" by Codevolution
 * - "App Layout Design" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * 
 * Baeldung References:
 * - https://www.baeldung.com/spring-boot-json
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 */
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="admin-dashboard" />
        <Stack.Screen name="driver-dashboard" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}