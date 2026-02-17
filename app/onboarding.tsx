import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { images } from '../constants/images'

const OnBoarding = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Image */}
      <View className="h-[60%]">
        <Image
          source={images.food} // replace with your image
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View className="flex-1 px-6 justify-between">
        <View className="mt-8">
          <Text className="text-3xl font-bold text-black">
            Bring Happiness of Local{"\n"}Food with Foody
          </Text>

          <Text className="text-gray-500 mt-4 text-base">
            This platform is designed to connect local mess/restaurent to everyone!
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity className="bg-yellow-400 rounded-full py-4 mb-8" onPress={() => router.push('/welcome')}>
          <Text className="text-center text-white font-semibold text-lg">
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default OnBoarding;