// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="test" />
      </Stack>
    </AuthProvider>
  );
}