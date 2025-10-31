import {
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useStopwatch } from "react-timer-hook";

const ActiveWorkout = () => {
  const { seconds, minutes, hours, totalSeconds, reset } = useStopwatch({
    autoStart: true,
  });

  const getWorkoutDuration = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      {/* Top safe area */}

      <View
        className="bg-gray-800"
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
        }}
      >
        {/* Header  */}

        <View className="bg-gray-800 px-6 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-xl font-semibold">
                Active Workout
              </Text>
              <Text className="text-gray-300">get workoutDuration</Text>
            </View>
            <View className="flex-row items-center space-x-3 gap-2">
              {/* Weight unit toggle  */}
              <View className="flex-row bg-gray-700 rounded-lg p-1">
                {/* <TouchableOpacity className={`px-3 py-1 rounded ${weightUnit === "lbs" ? "text-white": "text-gray-300"}`} onPress={() => {}}>
                    <Text className={`text-sm font-semibold ${weightUnit === "lbs" ? "text-white" : "text-gray-300"}`}>lbs</Text>

                </TouchableOpacity>
                <TouchableOpacity className={`px-3 py-1 rounded ${weightUnit === "kg" ? "bg-blue-600"  :""}`}>
                  <Text className={`text-sm font-medium ${weightUnit === "kg" ?"text-white" :"text-gray-300"}`}>KG</Text> */}
                {/* </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActiveWorkout;
