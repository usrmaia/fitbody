import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { exerciseSchema, type Exercise } from "@/packages/schemas";
import { useExercise } from "@/store";

type ExerciseFormInput = z.input<typeof exerciseSchema>;
type ExerciseFormOutput = z.output<typeof exerciseSchema>;

type Props = {
  exerciseId?: string;
  mode: "add" | "edit" | "delete";
};

export const useExerciseForm = ({ exerciseId, mode }: Props) => {
  const { exercise, deleteExercise, postExercise, putExercise } = useExercise();

  if (
    (mode === "edit" || mode === "delete") &&
    (!exercise || exercise.id !== exerciseId)
  )
    throw new Error("Exercise not found for the given exerciseId");

  const form = useForm<ExerciseFormInput, unknown, ExerciseFormOutput>({
    resolver: zodResolver(exerciseSchema),
    values:
      mode === "edit" || mode === "delete"
        ? (exercise as ExerciseFormInput)
        : undefined,
  });

  const onSubmit = async (data: Exercise) => {
    let res;

    if (mode === "add") res = await postExercise(data);
    else if (mode === "edit") res = await putExercise(exerciseId!, data);
    else res = await deleteExercise(exerciseId!);

    if (!res.success && res.error)
      form.setError("root", { message: res.error.errors.join(", ") });
  };

  return {
    ...form,
    exercise,
    onSubmit,
  };
};
