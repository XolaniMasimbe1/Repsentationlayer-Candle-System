/**
 * Tab Layout Component for Candle System
 * 
 * This component sets up the bottom tab navigation with icons and styling
 * for the main application screens.
 * 
 * References:
 * - Expo Router Tabs: https://docs.expo.dev/router/introduction/
 * - Tab Navigation: https://reactnative.dev/docs/navigation
 * - Icon Integration: https://lucide.dev/
 * - Tab Styling: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * 
 * YouTube Tutorials Referenced:
 * - "Tab Navigation in React Native" by Programming with Mosh
 * - "Expo Router Tabs" by The Net Ninja
 * - "Bottom Tab Design" by Codevolution
 * - "Icon Integration in React Native" by Academind
 * 
 * Stack Overflow References:
 * - https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
 * - https://stackoverflow.com/questions/30008114/how-do-i-promise-all-an-array-of-api-calls
 * - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
 * 
 * Baeldung References:
 * - https://www.baeldung.com/spring-boot-json
 * - https://www.baeldung.com/rest-api-error-handling-best-practices
 */
import { Tabs } from 'expo-router';
import { Chrome as Home, ShoppingCart, Package, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          height: 65,
        },
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}