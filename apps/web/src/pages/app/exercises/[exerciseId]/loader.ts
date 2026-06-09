import type { LoaderFunctionArgs } from "react-router";

import { useExercise } from "@/store";
import { ensureProfile } from "@/pages/app/ensure-profile";

export const ExerciseLoader = async ({
  params: { exerciseId },
}: LoaderFunctionArgs) => {
  if (!exerciseId) throw new Error("exerciseId is required");

  const { getExercise } = useExercise.getState();
  await Promise.all([ensureProfile(), getExercise(exerciseId)]);
};
