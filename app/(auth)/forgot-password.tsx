import FormInput from "@/components/ui/FormInput";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import { auth } from "../../FirebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Email Sent",
        "Check your inbox for instructions to reset your password.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.log(error);
      // Handle Firebase errors
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {/* Top image with overlay title */}
        <View className="h-[45%] relative">
          <Image
            source={images.food}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/30" />
          <View className="absolute bottom-8 left-6">
            <Text className="text-white text-3xl font-extrabold">
              Forgot Password?
            </Text>
            <Text className="text-white/90 mt-2 max-w-[260px]">
              Enter your email to reset your password.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="flex-1 px-6 pt-6">
          <View>
            <FormInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(""); // Clear error when typing
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!error}
            />
            {error ? (
              <Text className="text-red-500 text-sm ml-1 mt-1">{error}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            className={`bg-primary rounded-full py-4 mt-6 ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-center text-white font-semibold text-lg">
              {loading ? "Sending..." : "Send Reset Email"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4 self-center"
            onPress={() => router.back()}
          >
            <Text className="text-black font-semibold">Back to Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;