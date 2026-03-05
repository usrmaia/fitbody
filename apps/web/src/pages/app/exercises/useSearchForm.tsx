import { useForm } from "react-hook-form";

import { useExercise } from "@/store";
import { MuscleGroup } from "@/packages/schemas";

export type ExerciseSearchProps = {
  searchOpen?: boolean;
  search?: string;
  muscleGroups?: MuscleGroup[];
};

export const useExercisesSearchForm = () => {
  const form = useForm<ExerciseSearchProps>({
    defaultValues: {
      searchOpen: false,
      search: undefined,
      muscleGroups: undefined,
    },
  });
  const { exercises, getExercises } = useExercise();

  const handleExerciseSearchSubmit = (data: ExerciseSearchProps) => {
    getExercises({
      include: { exerciseMuscleGroups: true },
      where: {
        name: { contains: data.search, mode: "insensitive" },
        exerciseMuscleGroups: {
          // TODO: use name
          every: { muscleGroup: { in: data.muscleGroups } },
        },
      },
      orderBy: [{ createdBy: { name: "asc" } }, { name: "asc" }],
    });
  };

  return {
    ...form,
    exercises,
    handleExerciseSearchSubmit,
  };
};
