import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { client, urlFor } from "@/lib/sanity/client";
import { Exercise } from "@/lib/sanity/types";
import { defineQuery } from "groq";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500";
    case "intermediate":
      return "bg-yellow-500";
    case "advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getDifficultyText = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

const singleExerciseQuery = defineQuery(
  `*[_type == "exercise" && _id == $id][0]`
);

const getApi = "http://localhost:3000/api/v1/exercise";

export default function ExerciseDetail() {
  const router = useRouter();
  const [exercise, setExercise] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGuidance, setAiGuidance] = useState("");

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  console.log(`type check -> ${getApi}/${id}`);

  useEffect(() => {
    if (!id) return;

    const fetchExercise = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/exercise/${id}`);
        const data = await res.json();
        console.log("Fetched Exercise Data:", data.result.videoUrl);

        setExercise(data.result || null);
      } catch (err) {
        console.error("Error fetching exercise:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Exercise not found !</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#00" />

      {/* Header with close button  */}
      <View className="absolute top-12 left-0 right-0 z-10 px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1" showsHorizontalScrollIndicator={false}>
        <View className="h-80 bg-white relative">
          {exercise?.image ? (
            <Image
              source={{ uri: urlFor(exercise.image?.asset?._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={80} color="white" />
            </View>
          )}

          {/* Gradient view  */}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></View>
        </View>
        <View className="px-6 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                {exercise.name}
              </Text>
              <View
                className={`self-start px-4 py-2 rounded-full ${getDifficultyColor(
                  exercise.difficulty
                )}`}
              >
                <Text className="text-sm font-semibold text-white">
                  {getDifficultyText(exercise.difficulty)}
                </Text>
              </View>
            </View>
          </View>

          {/* Description  */}

          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </Text>
            <Text className="text-gray-600 leading-6 text-base">
              {exercise.description ||
                "No description available for this exercise."}
            </Text>
          </View>

          {/* Video Section  */}

          {exercise.videoUrl && (
            <View className="mb-6">
              <Text className="text-xl font-semibold text-gray-800 mb-3">
                Video Tutorial
              </Text>
              <TouchableOpacity
                className="bg-red-500 rounded-xl p-4 flex-row items-center"
                onPress={() => Linking.openURL(exercise.videoUrl)}
              >
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
                  <Ionicons name="play" size={20} color="#EF4444" />
                </View>
                <View>
                  <Text className="text-white font-semibold text-lg">
                    Watch Tutorial
                  </Text>
                  <Text className="text-red-100 text-sm">
                    Learn Proper Form
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* AI Assistance  */}

          {/* --- */}

          {/* Acton Buttons  */}

          <View className="mt-8 gap-2">
            {/* AI Coach Button  */}
            <TouchableOpacity
              className={`rounded-xl py-4 items-center ${
                aiLoading
                  ? "bg-gray-400"
                  : aiGuidance
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              // onPress={getAiGuidance}
              disabled={aiLoading}
            >
              {aiLoading ? (
                <View>
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white font-bold text-lg ml-2">
                    Loading...
                  </Text>
                </View>
              ) : (
                <Text>Hello</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
