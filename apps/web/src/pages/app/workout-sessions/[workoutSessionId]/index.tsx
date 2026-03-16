import { useParams } from "react-router";

import { BackButtonNavigation } from "@/components/ui";
import { WorkoutSessionForm } from "./form";
import { useProfile } from "@/store";

export function WorkoutSessionPage() {
  const { workoutSessionId } = useParams();
  const { profile } = useProfile();

  if (!profile || !profile.userId) return null;

  return (
    <>
      <BackButtonNavigation title="" />
      <WorkoutSessionForm
        mode="edit"
        userId={profile?.userId}
        workoutSessionId={workoutSessionId}
      />
    </>
  );
}
