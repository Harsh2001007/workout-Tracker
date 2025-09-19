import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Exercise } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/client";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseCardProps {
  item: Exercise;
  onPress: () => void;
  showChevron?: boolean;
}

export default function ExerciseCard({
  item,
  onPress,
  showChevron,
}: ExerciseCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row p-6">
        <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden">
          {item.image ? (
            <Image
              source={{ uri: urlFor(item.image?.asset?._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={24} color="white" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
