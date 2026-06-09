import { useExercise, useWorkoutPlan } from "@/store";

export const WorkoutPlansLoader = async () => {
  const { getWorkoutPlans } = useWorkoutPlan.getState();
  const { getExercises } = useExercise.getState();

  await Promise.all([getWorkoutPlans(), getExercises()]);
};
