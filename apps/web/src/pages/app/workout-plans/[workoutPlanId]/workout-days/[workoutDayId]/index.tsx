import { useParams } from "react-router";

import { BackButtonNavigation } from "@/components/ui";
import { WorkoutDayForm } from "./form";
import { useExercise, useProfile, useWorkoutPlan } from "@/store";

export function WorkoutDayPage() {
  const { workoutDay } = useWorkoutPlan();
  const { workoutPlanId, workoutDayId } = useParams();
  const { exercises } = useExercise();
  const { profile } = useProfile();

  if (!workoutPlanId || !workoutDayId)
    return <div>Invalid workout plan or workout day ID.</div>;
  if (!profile) return <div>Loading profile...</div>;

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
          exercises={exercises}
          profile={profile}
        />
      </div>
    </>
  );
}
