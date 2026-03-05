import { useProfile, useWorkoutPlan } from "@/store";

export const useWorkoutPlanPage = () => {
  const { workoutPlan, putWorkoutPlan } = useWorkoutPlan();
  const { profile } = useProfile();

  const handleMoveDay = async (
    exerciseDayId: string,
    direction: "left" | "right",
  ) => {
    const dayIndex = workoutPlan?.workoutDays?.findIndex(
      (day) => day.id === exerciseDayId,
    );
    if (dayIndex === undefined || dayIndex === -1) return;

    const newIndex = direction === "left" ? dayIndex - 1 : dayIndex + 1;
    if (newIndex < 0 || newIndex >= (workoutPlan?.workoutDays?.length || 0))
      return;

    if (workoutPlan?.workoutDays) {
      const newWorkoutDays = [...workoutPlan.workoutDays];
      const targetSequence = newWorkoutDays[newIndex].seq;
      newWorkoutDays[newIndex].seq = newWorkoutDays[dayIndex].seq;
      newWorkoutDays[dayIndex].seq = targetSequence;

      const res = await putWorkoutPlan(workoutPlan.id!, {
        ...workoutPlan,
        workoutDays: [newWorkoutDays[newIndex], newWorkoutDays[dayIndex]].sort(
          (a, b) => a.seq - b.seq,
        ),
      });

      if (!res.success) {
        alert("Erro ao mover o dia de treino. Tente novamente.");
      }
    }
  };

  return {
    profile,
    workoutPlan,
    handleMoveDay,
  };
};
