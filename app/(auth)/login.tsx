import FormInput from "@/components/ui/FormInput";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
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
  isError: boolean;
  errorMessage?: string;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState<Field[]>([
    {
      label: "Email",
      value: email,
      setter: setEmail,
      keyboardType: "email-address",
      autoCapitalize: "none",
      isError: false,
    },
    {
      label: "Password",
      value: password,
      setter: setPassword,
      secure: true,
      isError: false,
    },
  ]);

  // Update fields when email/password change
  React.useEffect(() => {
    setFields([
      {
        label: "Email",
        value: email,
        setter: setEmail,
        keyboardType: "email-address",
        autoCapitalize: "none",
        isError: fields[0]?.isError || false,
      },
      {
        label: "Password",
        value: password,
        setter: setPassword,
        secure: true,
        isError: fields[1]?.isError || false,
      },
    ]);
  }, [email, password]);

  const handleChange = (index: number, text: string) => {
    fields[index].setter(text);
    // Clear error for this field when user types
    setFields((prev) =>
      prev.map((field, i) =>
        i === index
          ? { ...field, isError: false, errorMessage: undefined }
          : field
      )
    );
  };

  const setFieldError = (label: string, errorMessage: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.label === label
          ? { ...field, isError: true, errorMessage }
          : field
      )
    );
  };

  const handleLogin = async () => {
    // Reset errors
    setFields((prev) =>
      prev.map((field) => ({
        ...field,
        isError: false,
        errorMessage: undefined,
      }))
    );

    // Validate
    if (!email || !password) {
      if (!email) setFieldError("Email", "Email is required");
      if (!password) setFieldError("Password", "Password is required");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/test"); // Navigate to main app screen
    } catch (error: any) {
      console.log(error);
      // Handle Firebase login errors
      if (error.code === "auth/user-not-found") {
        setFieldError("Email", "No account found with this email");
      } else if (error.code === "auth/wrong-password") {
        setFieldError("Password", "Incorrect password");
      } else if (error.code === "auth/invalid-email") {
        setFieldError("Email", "Invalid email format");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert(
          "Too many attempts",
          "Access temporarily disabled due to many failed login attempts. Try again later."
        );
      } else {
        Alert.alert("Login failed", error.message);
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
              Welcome Back
            </Text>
            <Text className="text-white/90 mt-2 max-w-[260px]">
              Sign in to continue.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="flex-1 px-6 pt-6">
          <View>
            {fields.map((field, index) => (
              <View key={index}>
                <FormInput
                  label={field.label}
                  value={field.value}
                  onChangeText={(text) => handleChange(index, text)}
                  secureTextEntry={field.secure}
                  keyboardType={field.keyboardType}
                  autoCapitalize={field.autoCapitalize}
                  //@ts-ignore – if your FormInput expects an error prop
                  isError={field.isError}
                  error={field.isError}
                />
                {field.errorMessage && (
                  <Text className="text-red-500 text-sm ml-1">
                    {field.errorMessage}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Forgot password (optional) */}
          <TouchableOpacity className="self-end mt-2" onPress={() => {router.navigate("/(auth)/forgot-password")}}>
            <Text className="text-gray-500">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`bg-primary rounded-full py-4 mt-6 ${loading ? "opacity-50" : ""}`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-center text-white font-semibold text-lg">
              {loading ? "Signing In..." : "Sign In"}
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
            <Text className="text-gray-500">Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/SignUp")}>
              <Text className="text-black font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;