import { useExercise } from "@/store";

export const ExercisesLoader = async () => {
  const { getExercises } = useExercise.getState();
  await getExercises();
};
