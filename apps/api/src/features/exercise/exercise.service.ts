import { User } from "better-auth";
import { Prisma } from "@prisma/client";

import { logger } from "@/config";
import prisma from "@/lib/prisma";
import { ExerciseQueryOptions } from "@/packages/schemas";

export const getExercise = async (
  exerciseId: string,
  args: { include?: ExerciseQueryOptions["include"] },
  currentUser: User,
) => {
  const { include } = args;
  const qry: Prisma.ExerciseFindUniqueArgs = {
    include,
    where: {
      id: exerciseId,
      OR: [
        { visibility: { in: ["PUBLIC", "UNLISTED"] } },
        { visibility: { not: "PUBLIC" }, createdById: currentUser.id },
      ],
    },
  };
  const exercise = await prisma.exercise.findUnique(qry);
  return exercise;
};

export const getExercises = async (
  args: {
    include?: ExerciseQueryOptions["include"];
    where?: ExerciseQueryOptions["where"];
    orderBy?: ExerciseQueryOptions["orderBy"];
  },
  currentUser: User,
) => {
  const { include, where } = args;
  const qry: Prisma.ExerciseFindManyArgs = {
    include,
    where: {
      ...where,
      OR: [
        { visibility: { in: ["PUBLIC", "UNLISTED"] } },
        { visibility: { not: "PUBLIC" }, createdById: currentUser.id },
      ],
    },
    ...(args.orderBy ? { orderBy: args.orderBy } : {}),
  };
  const exercises = await prisma.exercise.findMany(qry);
  return exercises;
};

export const createExercise = async (
  args: {
    include?: ExerciseQueryOptions["include"];
    data: Prisma.ExerciseCreateManyInput & {
      exerciseMuscleGroups?: Prisma.ExerciseMuscleGroupCreateManyExerciseInput[];
    };
  },
  currentUser: User,
) => {
  const { include, data } = args;
  const { exerciseMuscleGroups, ...exerciseData } = data;
  const payload = {
    include,
    data: {
      ...exerciseData,
      createdById: currentUser.id,
      exerciseMuscleGroups: {
        createMany: { data: exerciseMuscleGroups || [], skipDuplicates: true },
      },
    },
  };

  const exercise = await prisma.exercise.create(payload);
  return exercise;
};

export const updateExercise = async (
  exerciseId: string,
  args: {
    include?: ExerciseQueryOptions["include"];
    data: Prisma.ExerciseUncheckedUpdateManyInput & {
      exerciseMuscleGroups?: Prisma.ExerciseMuscleGroupCreateManyExerciseInput[];
    };
  },
  currentUser: User,
) => {
  const exercise = await prisma.exercise.findUnique({
    select: { id: true, exerciseMuscleGroups: true },
    where: { id: exerciseId, createdById: currentUser.id },
  });

  if (!exercise) {
    logger.warn(
      `Exercise with id ${exerciseId} and createdById ${currentUser.id} not found for update`,
    );
    return;
  }

  const { include, data } = args;
  const { exerciseMuscleGroups, ...exerciseData } = data;
  const addedMuscleGroups =
    exerciseMuscleGroups?.filter(
      (emg) =>
        !exercise.exerciseMuscleGroups.some(
          (existing) =>
            existing.muscleGroup === emg.muscleGroup &&
            existing.role === emg.role,
        ),
    ) || [];
  const removedMuscleGroups =
    exercise.exerciseMuscleGroups.filter(
      (existing) =>
        !exerciseMuscleGroups?.some(
          (emg) =>
            emg.muscleGroup === existing.muscleGroup &&
            emg.role === existing.role,
        ),
    ) || [];

  const payload: Prisma.ExerciseUpdateArgs = {
    include,
    where: { id: exerciseId },
    data: {
      ...exerciseData,
      createdById: undefined, // Prevent changing ownership
      exerciseMuscleGroups: {
        createMany: {
          data: addedMuscleGroups?.map((emg) => ({
            muscleGroup: emg.muscleGroup,
            role: emg.role,
          })),
          skipDuplicates: true,
        },
        deleteMany: removedMuscleGroups.map((emg) => ({
          exerciseId,
          muscleGroup: emg.muscleGroup,
          role: emg.role,
        })),
      },
    },
  };

  const updatedExercise = await prisma.exercise.update(payload);
  return updatedExercise;
};
