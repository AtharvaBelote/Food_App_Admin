import { images } from "@/constants/images";
import { router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants/icons";
const Welcome = () => {
  const handleSignIn = () => {
    Alert.alert("Sign In", "Sign In flow is coming soon.");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Image */}
      <View className="h-[50%] relative rounded-b-3xl overflow-hidden">
        <Image
          source={images.food}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute left-6 bottom-8">
          <Text className="text-3xl text-white font-extrabold ">
            Welcome to Foody
          </Text>
          <Text className="text-white/90 mt-1 max-w-[300px]">
            Connect your restaurant, manage orders and reach customers nearby.
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-6">
        <Text className="text-gray-600 text-base mb-4 text-center">
          Ready to manage orders and menus?
        </Text>

        <TouchableOpacity
          className="bg-yellow-400 w-full rounded-full py-4 mt-2 shadow-md"
          onPress={handleSignIn}
          accessibilityRole="button"
          accessibilityLabel="Sign in"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-400 my-3 text-center">or</Text>

        <TouchableOpacity
          className="bg-black w-full rounded-full py-4 shadow-md flex-row items-center justify-center"
          onPress={() => router.replace("/SignUp")}
          accessibilityRole="button"
          accessibilityLabel="Sign up"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        <View className="my-6 flex-row items-center">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-3 text-gray-400">or continue with</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 rounded-full py-3 px-4 bg-white">
          <Image source={icons.google} className="w-6 h-6" />
          <Text className="ml-3 text-gray-700">Continue with Google</Text>
        </TouchableOpacity>

        <View className="mt-6 items-center">
          <Text className="text-gray-400 text-sm">
            By continuing you agree to our Terms & Privacy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
