import { useParams } from "react-router";

import { BackButtonNavigation } from "@/components/ui";
import { WorkoutDayForm } from "./form";
import { useWorkoutPlan } from "@/store";

export function WorkoutDayPage() {
  const { workoutDay } = useWorkoutPlan();
  const { workoutPlanId, workoutDayId } = useParams();

  if (!workoutPlanId || !workoutDayId)
    return <div>Invalid workout plan or workout day ID.</div>;

  return (
    <>
      <BackButtonNavigation
        title={workoutDay?.dayCode || "Dia de treino"}
        className="mt-5 px-8"
      />
      <div className="bg-card m-5 px-8 py-5">
        <WorkoutDayForm
          mode="edit"
          workoutPlanId={workoutPlanId}
          workoutDayId={workoutDayId}
        />
      </div>
    </>
  );
}
