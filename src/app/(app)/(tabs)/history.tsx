import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";

export default function HistoryPage() {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const fetchWorkouts = async () => {
    if (!user.id) return;

    try {
    } catch (error) {
      console.log("Error fetching exercises", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex flex-1">
      <Text>History</Text>
    </SafeAreaView>
  );
}
