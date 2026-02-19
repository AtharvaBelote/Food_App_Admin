// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Loading from "@/components/ui/Loading";
import "./global.css";
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from "react";

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Dummy data-loading functions (replace with your actual Firebase calls)
const fetchUserProfile = () => new Promise(resolve => setTimeout(resolve, 1000));
const fetchUserSettings = () => new Promise(resolve => setTimeout(resolve, 800));
const fetchUserPosts = () => new Promise(resolve => setTimeout(resolve, 1200));

// Inner component that uses Auth context and handles loading
function InitialLayout() {
  const { user, isLoading: authLoading } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load data after auth is determined
  useEffect(() => {
    if (authLoading) return; // still waiting for Firebase

    if (!user) {
      // No user → no data to load, we're ready immediately
      setAppReady(true);
      return;
    }

    // User is logged in – load app data with progress
    const loadData = async () => {
      try {
        await fetchUserProfile();
        setProgress(33);
        await fetchUserSettings();
        setProgress(66);
        await fetchUserPosts();
        setProgress(100);
        setAppReady(true);
      } catch (error) {
        console.error("Data loading failed:", error);
        // Even on error, let the user into the app
        setAppReady(true);
      }
    };

    loadData();
  }, [authLoading, user]);

  // Hide the native splash screen once the app is ready
  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  // While loading, show your custom loading screen with progress
  if (!appReady || authLoading) {
    return <Loading progressNum={progress} />;
  }

  // App is ready – render the Stack navigator
  return (
    <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="test" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}