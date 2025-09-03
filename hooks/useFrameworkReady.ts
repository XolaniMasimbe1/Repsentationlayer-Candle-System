import { useEffect } from 'react';
import { Platform } from 'react-native';

// Global framework ready callback for React Native
let frameworkReadyCallback: (() => void) | undefined;

// Set the framework ready callback (can be called from native code or other parts of the app)
export const setFrameworkReadyCallback = (callback: () => void) => {
  frameworkReadyCallback = callback;
};

export function useFrameworkReady() {
  useEffect(() => {
    // In React Native, we use a callback approach instead of window object
    if (frameworkReadyCallback) {
      frameworkReadyCallback();
    }
  }, []);
}
