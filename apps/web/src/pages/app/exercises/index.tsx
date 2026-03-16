import { DialogPlus, DialogSearch, ExerciseCard } from "./component";
import { BackButtonNavigation } from "@/components/ui";
import { useExercise } from "@/store";

export function ExercisesPage() {
  const { exercises } = useExercise();

  return (
    <>
      <BackButtonNavigation title="Exercícios" />
      <div className="flex w-full justify-end gap-4 px-8">
        <DialogSearch className="text-primary h-5 w-5" />
        <DialogPlus className="text-primary h-5 w-5" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 px-8">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </>
  );
}
