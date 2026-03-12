import { Prisma } from "@prisma/client";
import { User } from "better-auth";

import { logger } from "@/config";
import prisma from "@/lib/prisma";
import { WorkoutSessionQueryOptions } from "@/packages/schemas";

export const getWorkoutSession = async (
  workoutSessionId: string,
  args: {
    include?: WorkoutSessionQueryOptions["include"];
  },
) => {
  const { include } = args;
  const workoutSession = await prisma.workoutSession.findUnique({
    include,
    where: {
      id: workoutSessionId,
    },
  });
  return workoutSession;
};

export const getWorkoutSessions = async (args: WorkoutSessionQueryOptions) => {
  const { include, where, orderBy } = args;
  const workoutSessions = await prisma.workoutSession.findMany({
    include,
    where,
    orderBy,
  });
  return workoutSessions;
};

export const createWorkoutSession = async (
  workoutDayId: string,
  args: {
    include?: WorkoutSessionQueryOptions["include"];
    data: Prisma.WorkoutSessionCreateManyInput & {
      workoutSets: Prisma.WorkoutSetCreateManyWorkoutSessionInput[];
    };
  },
  currentUser: User,
) => {
  const { include, data } = args;
  const { workoutSets, ...workoutSessionData } = data;
  const createMany: Prisma.WorkoutSetCreateManyWorkoutSessionInputEnvelope = {
    data: workoutSets.map((ws) => ({
      exerciseId: ws.exerciseId,
      notes: ws.notes,
      reps: ws.reps,
      rir: ws.rir,
      rpe: ws.rpe,
      seq: ws.seq,
      timeInSeconds: ws.timeInSeconds,
      weightKg: ws.weightKg,
      weightUnit: ws.weightUnit,
    })),
    skipDuplicates: true,
  };
  const payload: Prisma.WorkoutSessionCreateArgs = {
    include,
    data: {
      ...workoutSessionData,
      userId: currentUser.id,
      workoutDayId,
      workoutSets: {
        createMany,
      },
    },
  };
  const workoutSession = await prisma.workoutSession.create(payload);
  return workoutSession;
};

export const updateWorkoutSession = async (
  workoutSessionId: string,
  workoutDayId: string,
  args: {
    include?: WorkoutSessionQueryOptions["include"];
    data: Prisma.WorkoutSessionUncheckedUpdateManyInput & {
      workoutSets?: Prisma.WorkoutSetCreateManyWorkoutSessionInput[];
    };
  },
  currentUser: User,
) => {
  const workoutSession = await prisma.workoutSession.findUnique({
    select: { workoutSets: { select: { id: true } } },
    where: {
      id: workoutSessionId,
      userId: currentUser.id,
    },
  });

  if (!workoutSession) {
    logger.error(
      `Workout session with id ${workoutSessionId} not found for user ${currentUser.id}`,
    );
    return;
  }

  const { include, data } = args;
  const { workoutSets, ...workoutSessionData } = data;
  const createMany: Prisma.WorkoutSetCreateManyWorkoutSessionInputEnvelope = {
    data:
      workoutSets
        ?.filter((ws) => ws.id === undefined)
        .map((ws) => ({
          exerciseId: ws.exerciseId,
          notes: ws.notes,
          reps: ws.reps,
          rir: ws.rir,
          rpe: ws.rpe,
          seq: ws.seq,
          timeInSeconds: ws.timeInSeconds,
          weightKg: ws.weightKg,
          weightUnit: ws.weightUnit,
        })) || [],
    skipDuplicates: true,
  };
  const updatedMany:
    | Prisma.WorkoutSetUpdateManyWithWhereWithoutWorkoutSessionInput[]
    | undefined = workoutSets
    ?.filter((ws) => ws.id !== undefined)
    .map((ws) => ({
      data: {
        exerciseId: ws.exerciseId,
        notes: ws.notes,
        reps: ws.reps,
        rir: ws.rir,
        rpe: ws.rpe,
        seq: ws.seq,
        timeInSeconds: ws.timeInSeconds,
        weightKg: ws.weightKg,
        weightUnit: ws.weightUnit,
      },
      where: { id: ws.id! },
    }));
  const deleteMany: Prisma.WorkoutSetScalarWhereInput = {
    id: {
      in: workoutSession.workoutSets
        .filter(
          (ws) => !workoutSets?.some((updatedWs) => updatedWs.id === ws.id),
        )
        .map((ws) => ws.id!),
    },
  };
  const updatedWorkoutSession = await prisma.workoutSession.update({
    include,
    data: {
      ...workoutSessionData,
      workoutDayId: workoutDayId,
      userId: currentUser.id,
      workoutSets: {
        createMany,
        updatedMany,
        deleteMany,
      },
    },
    where: {
      id: workoutSessionId,
      userId: currentUser.id,
    },
  });
  return updatedWorkoutSession;
};

export const deleteWorkoutSession = async (
  workoutSessionId: string,
  args: {
    include?: WorkoutSessionQueryOptions["include"];
  },
  currentUser: User,
) => {
  const { include } = args;
  const deletedWorkoutSession = await prisma.workoutSession.delete({
    include,
    where: {
      id: workoutSessionId,
      userId: currentUser.id,
    },
  });
  return deletedWorkoutSession;
};
