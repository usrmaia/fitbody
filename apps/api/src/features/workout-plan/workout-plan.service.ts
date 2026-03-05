import { Prisma } from "@prisma/client";
import { User } from "better-auth";

import { logger } from "@/config";
import prisma from "@/lib/prisma";
import {
  WorkoutDayExerciseQueryOptions,
  WorkoutDayQueryOptions,
  WorkoutPlanQueryOptions,
} from "@/packages/schemas";

export const getWorkoutPlan = async (
  workoutPlanId: string,
  args: { include?: WorkoutPlanQueryOptions["include"] },
  currentUser: User,
) => {
  const qry = {
    ...args,
    where: {
      id: workoutPlanId,
      OR: [
        { visibility: "PUBLIC" },
        { visibility: { not: "PUBLIC" }, createdById: currentUser.id },
      ],
    },
  } as Prisma.WorkoutPlanFindUniqueArgs;

  const workoutPlan = await prisma.workoutPlan.findUnique(qry);
  return workoutPlan;
};

export const getWorkoutPlans = async (
  args: WorkoutPlanQueryOptions,
  currentUser: User,
) => {
  const qry: Prisma.WorkoutPlanFindManyArgs = {
    ...args,
    where: {
      ...args.where,
      OR: [
        { visibility: "PUBLIC" },
        { visibility: { not: "PUBLIC" }, createdById: currentUser.id },
      ],
    },
  };

  const workoutPlans = await prisma.workoutPlan.findMany(qry);
  return workoutPlans;
};

export const createWorkoutPlan = async (
  args: {
    include?: WorkoutPlanQueryOptions["include"];
    data: Prisma.WorkoutPlanCreateManyInput & {
      workoutDays?: Prisma.WorkoutDayCreateManyWorkoutPlanInput[];
    };
  },
  currentUser: User,
) => {
  const { include, data } = args;
  const { workoutDays, ...workoutPlanData } = data;
  const payload = {
    include,
    data: {
      ...workoutPlanData,
      createdById: currentUser.id,
      workoutDays: {
        createMany: { data: workoutDays || [], skipDuplicates: true },
      },
    },
  };

  const workoutPlan = await prisma.workoutPlan.create(payload);
  return workoutPlan;
};

export const updateWorkoutPlan = async (
  workoutPlanId: string,
  args: {
    include?: WorkoutPlanQueryOptions["include"];
    data: Prisma.WorkoutPlanUncheckedUpdateInput & {
      workoutDays?: Prisma.WorkoutDayCreateManyWorkoutPlanInput[];
    };
  },
  currentUser: User,
) => {
  const { include, data } = args;
  const { workoutDays, ...workoutPlanData } = data;
  const createMany: Prisma.WorkoutDayCreateManyWorkoutPlanInputEnvelope = {
    data:
      workoutDays
        // Only consider workout days without an ID for creation
        ?.filter((wd) => !wd.id)
        .map((wd) => ({
          dayCode: wd.dayCode,
          focus: wd.focus,
          seq: wd.seq,
          type: wd.type,
        })) || [],
    skipDuplicates: true,
  };
  const updateMany:
    | Prisma.WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInput[]
    | undefined = workoutDays
    // Only consider workout days with an ID for updates
    ?.filter((wd) => wd.id)
    .map((wd) => ({
      data: {
        dayCode: wd.dayCode,
        focus: wd.focus,
        seq: wd.seq,
        type: wd.type,
      },
      where: { id: wd.id },
    }));

  const payload: Prisma.WorkoutPlanUpdateArgs = {
    include,
    data: {
      ...workoutPlanData,
      createdById: undefined, // Prevent changing ownership
      workoutDays: {
        createMany,
        updateMany,
      },
    },
    where: { id: workoutPlanId, createdById: currentUser.id },
  };

  const updatedWorkoutPlan = await prisma.workoutPlan.update(payload);
  return updatedWorkoutPlan;
};

export const deleteWorkoutPlan = async (
  workoutPlanId: string,
  args: { include?: WorkoutPlanQueryOptions["include"] },
  currentUser: User,
) => {
  const { include } = args;
  const deletedWorkoutPlan = await prisma.workoutPlan.delete({
    include,
    where: { id: workoutPlanId, createdById: currentUser.id },
  });

  if (!deletedWorkoutPlan) {
    logger.warn(
      `Workout plan with id ${workoutPlanId} and user id ${currentUser.id} not found for deletion`,
    );
    return;
  }

  return deletedWorkoutPlan;
};

export const cloneWorkoutPlan = async (
  workoutPlanId: string,
  args: { include?: WorkoutPlanQueryOptions["include"] },
  currentUser: User,
) => {
  const workoutPlan = await prisma.workoutPlan.findUnique({
    include: {
      workoutDays: {
        include: {
          workoutDayExercises: {
            include: {
              exercise: true,
            },
          },
        },
      },
    },
    where: {
      id: workoutPlanId,
      OR: [
        { visibility: "PUBLIC" },
        { visibility: { not: "PUBLIC" }, createdById: currentUser.id },
      ],
    },
  });

  if (!workoutPlan) {
    logger.warn(
      `Workout plan with id ${workoutPlanId} and user id ${currentUser.id} not found for copy`,
    );
    return;
  }

  const { include } = args;
  const payload = {
    include,
    data: {
      ...workoutPlan,
      name: `${workoutPlan.name} (Copy)`,
      createdById: currentUser.id,
      workoutDays: {
        create: workoutPlan.workoutDays.map((wd) => ({
          ...wd,
          workoutDayExercises: {
            create: wd.workoutDayExercises.map((wde) => ({
              ...wde,
            })),
          },
        })),
      },
    },
  };

  const copiedWorkoutPlan = await prisma.workoutPlan.create(payload);
  return copiedWorkoutPlan;
};

export const getWorkoutDay = async (
  workoutPlanId: string,
  workoutDayId: string,
  args: { include?: WorkoutDayQueryOptions["include"] },
  currentUser: User,
) => {
  const { include } = args;
  const qry: Prisma.WorkoutDayFindUniqueArgs = {
    include,
    where: {
      id: workoutDayId,
      workoutPlan: {
        id: workoutPlanId,
        OR: [
          { visibility: "PUBLIC" },
          { visibility: { not: "PUBLIC" }, createdById: currentUser.id },
        ],
      },
    },
  };
  const workoutDay = await prisma.workoutDay.findUnique(qry);
  return workoutDay;
};

export const creteWorkoutDay = async (
  workoutPlanId: string,
  args: {
    include?: WorkoutDayQueryOptions["include"];
    data: Prisma.WorkoutDayCreateManyInput & {
      workoutDayExercises?: Prisma.WorkoutDayExerciseCreateManyWorkoutDayInput[];
    };
  },
  currentUser: User,
) => {
  const { include, data } = args;
  const { workoutDayExercises, ...workoutDayData } = data;
  const createMany: Prisma.WorkoutDayExerciseCreateManyWorkoutDayInputEnvelope =
    {
      data:
        workoutDayExercises?.map((wde) => ({
          seq: wde.seq,
          notes: wde.notes,
          exerciseId: wde.exerciseId,
          startedAt: wde.startedAt,
        })) || [],
      skipDuplicates: true,
    };
  const payload: Prisma.WorkoutDayCreateArgs = {
    include,
    data: {
      ...workoutDayData,
      workoutPlanId: undefined, // Ensure we don't allow setting workoutPlanId directly
      workoutPlan: {
        connect: { id: workoutPlanId, createdById: currentUser.id },
      },
      workoutDayExercises: { createMany },
    },
  };

  const workoutDay = await prisma.workoutDay.create(payload);
  return workoutDay;
};

export const updateWorkoutDay = async (
  workoutPlanId: string,
  workoutDayId: string,
  args: {
    include?: WorkoutDayQueryOptions["include"];
    data: Prisma.WorkoutDayCreateManyInput & {
      workoutDayExercises?: Prisma.WorkoutDayExerciseCreateManyWorkoutDayInput[];
    };
  },
  currentUser: User,
) => {
  const workoutPlan = await prisma.workoutPlan.findUnique({
    select: {
      id: true,
      workoutDays: {
        select: {
          id: true,
          workoutDayExercises: {
            select: {
              id: true,
            },
          },
        },
      },
    },
    where: {
      id: workoutPlanId,
      createdById: currentUser.id,
      workoutDays: { some: { id: workoutDayId } },
    },
  });

  if (!workoutPlan) {
    logger.warn(
      `Workout plan with id ${workoutPlanId} and user id ${currentUser.id} not found for workout day update`,
    );
    return;
  }

  const { include, data } = args;
  const { workoutDayExercises, ...workoutDayData } = data;
  const createMany: Prisma.WorkoutDayExerciseCreateManyWorkoutDayInputEnvelope =
    {
      data:
        workoutDayExercises
          // Only consider exercises without an ID for creation
          ?.filter((wde) => !wde.id)
          .map((wde) => ({
            exerciseId: wde.exerciseId,
            notes: wde.notes,
            seq: wde.seq,
            startedAt: wde.startedAt,
          })) || [],
      skipDuplicates: true,
    };
  const updateMany:
    | Prisma.WorkoutDayExerciseUpdateManyWithWhereWithoutWorkoutDayInput[]
    | undefined = workoutDayExercises
    // Only consider exercises with an ID for updates
    ?.filter((wde) => wde.id)
    .map((wde) => ({
      data: {
        exerciseId: wde.exerciseId,
        notes: wde.notes,
        seq: wde.seq,
        startedAt: wde.startedAt,
      },
      where: { id: wde.id },
    }));

  const payload: Prisma.WorkoutDayUpdateArgs = {
    include,
    data: {
      ...workoutDayData,
      workoutDayExercises: {
        createMany,
        updateMany,
      },
    },
    where: { id: workoutDayId },
  };
  const workoutDay = await prisma.workoutDay.update(payload);

  return workoutDay;
};

export const deleteWorkoutDay = async (
  workoutPlanId: string,
  workoutDayId: string,
  args: { include?: WorkoutDayQueryOptions["include"] },
  currentUser: User,
) => {
  const { include } = args;
  const deletedWorkoutDay = await prisma.workoutDay.delete({
    include,
    where: {
      id: workoutDayId,
      workoutPlan: { id: workoutPlanId, createdById: currentUser.id },
    },
  });

  if (!deletedWorkoutDay) {
    logger.warn(
      `Workout day with id ${workoutDayId} and user id ${currentUser.id} not found for deletion`,
    );
    return;
  }

  return deletedWorkoutDay;
};

export const deleteWorkoutDayExercises = async (
  workoutPlanId: string,
  workoutDayId: string,
  workoutDayExerciseId: string,
  args: { include?: WorkoutDayExerciseQueryOptions["include"] },
  currentUser: User,
) => {
  const { include } = args;
  const workoutDay = await prisma.workoutDayExercise.delete({
    include,
    where: {
      id: workoutDayExerciseId,
      workoutDay: {
        id: workoutDayId,
        workoutPlan: { id: workoutPlanId, createdById: currentUser.id },
      },
    },
  });

  if (!workoutDay) {
    logger.warn(
      `Workout day exercise with id ${workoutDayExerciseId} and user id ${currentUser.id} not found for workout day exercise deletion`,
    );
    return;
  }

  return workoutDay;
};
