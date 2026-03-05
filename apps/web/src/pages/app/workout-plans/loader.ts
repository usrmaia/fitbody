import { useWorkoutPlan } from "@/store";

export const WorkoutPlansLoader = async () => {
  const { getWorkoutPlans } = useWorkoutPlan.getState();
  await getWorkoutPlans({ orderBy: [{ name: "asc" }] });
};
