import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import Loading from "@/components/ui/Loading";
import { useState, useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto-hiding
SplashScreen.preventAutoHideAsync();

// Dummy functions (replace with real Firebase calls)
const fetchUserProfile = () => new Promise(resolve => setTimeout(resolve, 1000));
const fetchUserSettings = () => new Promise(resolve => setTimeout(resolve, 800));
const fetchUserPosts = () => new Promise(resolve => setTimeout(resolve, 1200));

export default function Index() {
  const { user, isLoading: authLoading } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setAppReady(true);
      return;
    }

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
        setAppReady(true);
      }
    };

    loadData();
  }, [authLoading, user]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (authLoading || !appReady) {
    return <Loading progressNum={progress} />;
  }

  if (user) {
    return <Redirect href="/test" />;
  } else {
    return <Redirect href="/onboarding" />;
  }
}