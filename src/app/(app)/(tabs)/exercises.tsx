import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Exerceises = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [refreshing, setRefresing] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  const fetchExercise = async () => {
    try {
      const exercises = await client.fetch(exercisesQuery);
      setExercises(exercises);
      setFilteredExercises(exercises);
    } catch (err) {
      console.log("error fetching exercises : ", err);
    }
  };

  const onRefresh = async () => {
    setRefresing(true);
    await fetchExercise();
    setRefresing(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header  */}

      <View className="px-6 py-4 bg-white borber-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Exercise Library
        </Text>
        <Text className="text-gray-600 mt-1">
          Discover and master new exercises.
        </Text>

        {/* Searchbar  */}

        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-4">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="search exercises"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Exercise List  */}

      <FlatList
        data={[]}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <ExerciseCard
            item={item}
            onPress={() => router.push(`/exercise-detail?id=${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
            title="Pull to refresh exercises"
            titleColor="#6B7280"
          />
        }
        ListEmptyComponent={
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="fitness-outline" size={64} color="#9CA3AF" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              {searchQuery ? "No exercise found" : "Loading exercises..."}
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              {searchQuery
                ? "Try adjusting your search"
                : "Your exercises will appear here"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Exerceises;
