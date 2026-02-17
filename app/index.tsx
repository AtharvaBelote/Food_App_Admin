import { router } from "expo-router";
import { ArrowBigRight } from "lucide-react-native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";

export default function App() {
  const offset = useSharedValue(-5);

  useEffect(() => {
    // animate between -5 and 5 indefinitely
    offset.value = withRepeat(withTiming(5, { duration: 700 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Hero Image */}
      <View className="h-[50%] relative rounded-b-3xl overflow-hidden">
        <Image
          source={images.food}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute bottom-8 left-6">
          <Text className="text-3xl font-extrabold text-white">
            Bring Happiness of Local{"\n"}Food with Foody
          </Text>
          <Text className="text-white/90 mt-2 max-w-[300px]">
            Connect local mess and restaurants with hungry customers nearby.
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 justify-between pt-6">
        <View>
          <Text className="text-xl font-bold">
            Built to help small restaurants manage orders, menus and customers.
          </Text>
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          className="bg-yellow-400 rounded-full py-4 mb-12 shadow-xl flex-row justify-center items-center"
          onPress={() => router.replace("/welcome")}
          accessibilityRole="button"
        >
          <Text className="text-center text-white font-semibold text-lg mr-4">
            Get started
          </Text>
          <Animated.View style={animatedStyle}>
            <ArrowBigRight color="white" fill="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
