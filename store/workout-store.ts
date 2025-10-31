import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface WorkoutSet {
  id: string;
  reps: string;
  weights: string;
  weightUnit: "kg" | "lbs";
  isComplete: boolean;
}

interface WorkoutExercise {
  id: string;
  sanityId: string;
  name: string;
  sets: WorkoutSet[];
}

interface WorkoutStore {
  workoutExercises: WorkoutExercise[];
  weightUnit: "kg" | "lbs";

  // Actions
  addExerciseToWorkout: (exercise: { name: string; sanityId: string }) => void;
  setWorkoutExercise: (
    exercises:
      | WorkoutExercise[]
      | ((prev: WorkoutExercise[]) => WorkoutExercise[])
  ) => void;
  setWeightUnit: (unit: "kg" | "lbs") => void;
  resetWorkout: () => void;
}
