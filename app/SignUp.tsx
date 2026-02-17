import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants/icons";
import { images } from "../constants/images";
import { auth } from "../FirebaseConfig";
import { Eye } from "lucide-react-native";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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
              Join Foody to connect your local restaurant and reach more
              customers.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="flex-1 px-6 pt-6">
          <View>
            <TextInput
              label="Restaurant name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              selectionColor="#9CA3AF"
              style={styles.input}
              activeOutlineColor="#facc15"
              outlineColor="black"
              dense
              outlineStyle={{ borderRadius: 10 }}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              selectionColor="#9CA3AF"
              style={styles.input}
              activeOutlineColor="#facc15"
              outlineColor="black"
              dense
              outlineStyle={{ borderRadius: 10 }}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              selectionColor="#9CA3AF"
              style={styles.input}
              activeOutlineColor="#facc15"
              outlineColor="black"
              dense
              outlineStyle={{ borderRadius: 10 }}
            />

            <TextInput
              label="Confirm Password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              mode="outlined"
              selectionColor="#9CA3AF"
              style={styles.input}
              activeOutlineColor="#facc15"
              outlineColor="black"
              dense
              outlineStyle={{ borderRadius: 10 }}
            />
          </View>

          <TouchableOpacity
            className="bg-yellow-400 rounded-full py-4 mt-6"
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
