import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Exercise } from "@/lib/sanity/types";

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
      <Text>Card</Text>
    </TouchableOpacity>
  );
}
