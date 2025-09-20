import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  return (
    <SafeAreaView>
      <Text>exercise-detail : {id}</Text>
    </SafeAreaView>
  );
}
