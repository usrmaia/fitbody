import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { exerciseSchema, type Exercise } from "@/packages/schemas";
import { useExercise } from "@/store";

type ExerciseFormInput = z.input<typeof exerciseSchema>;
type ExerciseFormOutput = z.output<typeof exerciseSchema>;

export type ExerciseFormProps = {
  exerciseId?: string;
  exercise?: Exercise;
  mode: "add" | "edit" | "delete";
};

export const useExerciseForm = ({
  exerciseId,
  exercise,
  mode,
}: ExerciseFormProps) => {
  const { deleteExercise, postExercise, putExercise } = useExercise();

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

  const onSubmit = form.handleSubmit(async (data: Exercise) => {
    let res;

    if (mode === "add") res = await postExercise(data);
    else if (mode === "edit") res = await putExercise(exerciseId!, data);
    else res = await deleteExercise(exerciseId!);

    if (!res.success && res.error)
      form.setError("root", { message: res.error.errors.join(", ") });
  });

  return {
    ...form,
    onSubmit,
  };
};
