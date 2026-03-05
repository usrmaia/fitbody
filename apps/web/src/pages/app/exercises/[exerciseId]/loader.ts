import type { LoaderFunctionArgs } from "react-router";

import { useExercise } from "@/store";

export const ExerciseLoader = async ({
  params: { exerciseId },
}: LoaderFunctionArgs) => {
  if (!exerciseId) return;

  const { getExercise } = useExercise.getState();
  await getExercise(exerciseId);
};
