import { useParams } from "react-router";

import { ExerciseActionButtons, ExerciseDetails } from "./component";
import { BackButtonNavigation } from "@/components/ui";
import { NotFoundPage } from "@/pages/not-found";
import { useExercise, useProfile } from "@/store";

export function ExercisePage() {
  const { exerciseId } = useParams();
  const { exercise } = useExercise();
  const { profile } = useProfile();

  if (!exerciseId || !exercise)
    return <NotFoundPage label="Exercício não encontrado" />;

  return (
    <>
      <BackButtonNavigation
        title={exercise?.name || "Exercício"}
        className="mt-5"
      />
      {exerciseId && profile?.userId === exercise?.createdById && (
        <ExerciseActionButtons exerciseId={exerciseId} />
      )}
      <ExerciseDetails exercise={exercise} profile={profile || undefined} />
    </>
  );
}
