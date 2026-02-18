import FormInput from "@/components/FormInput";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { auth } from "../../FirebaseConfig";

type Field = {
  label: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const fields: Field[] = [
    { label: "Restaurant name", value: name, setter: setName },
    {
      label: "Email",
      value: email,
      setter: setEmail,
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    { label: "Password", value: password, setter: setPassword, secure: true },
    {
      label: "Confirm Password",
      value: confirm,
      setter: setConfirm,
      secure: true,
    },
  ];

  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert("Missing fields", "Please fill all required fields.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }
    // placeholder action: navigate to welcome/index
    router.push("/welcome");
  };

  const signUp = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Missing fields", "Please fill all required fields.");
        return;
      }
      if (password !== confirm) {
        Alert.alert("Password mismatch", "Passwords do not match.");
        return;
      }
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/test");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView>
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
              Create Account
            </Text>
            <Text className="text-white/90 mt-2 max-w-[260px]">
              Join Foody to get started.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="flex-1 px-6 pt-6">
          <View>
            {fields.map((field, index) => (
              <FormInput
                key={index}
                label={field.label}
                value={field.value}
                onChangeText={field.setter}
                secureTextEntry={field.secure}
                keyboardType={field.keyboardType}
                autoCapitalize={field.autoCapitalize}
              />
            ))}
          </View>

          <TouchableOpacity
            className="bg-primary rounded-full py-4 mt-6"
            onPress={signUp}
          >
            <Text className="text-center text-white font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-400 my-2">OR</Text>

          <View className="flex-row justify-center">
            <TouchableOpacity className="flex-row items-center bg-white px-4 py-3 rounded-full border border-gray-200">
              <Image source={icons.google} className="w-6 h-6" />
              <Text className="ml-3">Continue with Google</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/welcome")}>
              <Text className="text-black font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    // react-native-paper outlined inputs include their own border; add padding for visual balance
    paddingHorizontal: 1,
  },
});
