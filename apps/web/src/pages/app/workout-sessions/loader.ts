import { useWorkoutPlan, useWorkoutSession } from "@/store";
import { ensureProfile } from "../ensure-profile";

export const WorkoutSessionsLoader = async () => {
  const profile = await ensureProfile();
  if (!profile?.userId) throw new Error("User not authenticated");

  const { getWorkoutSessions } = useWorkoutSession.getState();
  const { getWorkoutPlans } = useWorkoutPlan.getState();

  await Promise.all([
    getWorkoutSessions({
      include: {
        workoutDay: true,
        workoutSets: { include: { exercise: true } },
      },
      where: { userId: profile.userId },
      orderBy: [{ startedAt: "asc" }],
    }),
    getWorkoutPlans({
      include: {
        workoutDays: {
          include: { workoutDayExercises: { include: { exercise: true } } },
        },
      },
      where: { createdById: profile.userId },
      orderBy: [{ name: "asc" }],
    }),
  ]);

  return;
};
