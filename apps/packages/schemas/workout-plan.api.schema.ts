import z from "zod";

import { orderDirection } from "./api.schema";
import {
  workoutDayExerciseSchema,
  workoutDaySchema,
  workoutPlanSchema,
} from "./workout.schema";
import { exerciseQueryOptionsSchema } from "./exercise.api.schema";

export const workoutPlanParamsSchema = z.object({
  workoutPlanId: z.string(),
});
export type WorkoutPlanParams = z.infer<typeof workoutPlanParamsSchema>;

export const workoutDayParamsSchema = z.object({
  workoutPlanId: z.string(),
  workoutDayId: z.string(),
});
export type WorkoutDayParams = z.infer<typeof workoutDayParamsSchema>;

export const workoutDayExerciseParamsSchema = z.object({
  workoutPlanId: z.string(),
  workoutDayId: z.string(),
  workoutDayExerciseId: z.string(),
});
export type WorkoutDayExerciseParams = z.infer<
  typeof workoutDayExerciseParamsSchema
>;

export const workoutDayExerciseQueryOptionsSchema = z.object({
  include: z
    .object({
      exercise: z.union([exerciseQueryOptionsSchema, z.boolean()]).optional(),
    })
    .optional(),
});
export type WorkoutDayExerciseQueryOptions = z.infer<
  typeof workoutDayExerciseQueryOptionsSchema
>;

export const workoutDayExerciseBodySchema = workoutDayExerciseSchema;
export type WorkoutDayExerciseBody = z.infer<
  typeof workoutDayExerciseBodySchema
>;

export const workoutDayQueryOptionsSchema = z.object({
  include: z
    .object({
      workoutDayExercises: z.union([
        workoutDayExerciseQueryOptionsSchema.optional(),
        z.boolean(),
      ]),
    })
    .optional(),
});
export type WorkoutDayQueryOptions = z.infer<
  typeof workoutDayQueryOptionsSchema
>;

export const workoutDayBodySchema = workoutDaySchema.and(
  z.object({
    workoutPlanId: z.string(),
  }),
);
export type WorkoutDayBody = z.infer<typeof workoutDayBodySchema>;

export const workoutPlanQueryOptionsSchema = z.object({
  include: z
    .object({
      createdBy: z.boolean().optional(),
      workoutDays: z
        .union([workoutDayQueryOptionsSchema, z.boolean()])
        .optional(),
    })
    .optional(),
  where: z
    .object({
      name: z.any().optional(),
      description: z.any().optional(),
      createdById: z.any().optional(),
    })
    .optional(),
  orderBy: z
    .array(
      z.object({
        name: orderDirection.optional(),
        goal: orderDirection.optional(),
      }),
    )
    .optional(),
});
export type WorkoutPlanQueryOptions = z.infer<
  typeof workoutPlanQueryOptionsSchema
>;

export const workoutPlanBodySchema = workoutPlanSchema.omit({
  createdBy: true,
});
export type WorkoutPlanBody = z.infer<typeof workoutPlanBodySchema>;
