import { useWorkoutSession } from "@/store";
import type { LoaderFunctionArgs } from "react-router";

export const WorkoutSessionLoader = async ({
  params: { workoutSessionId },
}: LoaderFunctionArgs) => {
  if (!workoutSessionId) return;

  const { getWorkoutSession } = useWorkoutSession.getState();
  await getWorkoutSession(workoutSessionId);

  return;
};
