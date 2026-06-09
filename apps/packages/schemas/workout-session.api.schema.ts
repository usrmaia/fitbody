import z from "zod";

import { exerciseQueryOptionsSchema } from "./exercise.api.schema";
import { workoutDayQueryOptionsSchema } from "./workout-plan.api.schema";
import { workoutSessionSchema } from "./workout.schema";
import { orderDirection } from "./api.schema";

export const workoutSetsQueryOptionsSchema = z.object({
  include: z
    .object({
      exercise: z.union([z.boolean(), exerciseQueryOptionsSchema]).optional(),
    })
    .optional(),
});
export type WorkoutSetsQueryOptions = z.infer<
  typeof workoutSetsQueryOptionsSchema
>;

export const workoutSessionBodySchema = workoutSessionSchema.omit({
  user: true,
});
export type WorkoutSessionBody = z.infer<typeof workoutSessionBodySchema>;

export const workoutSessionPostParamsSchema = z.object({
  workoutDayId: z.string(),
});
export type WorkoutSessionPostParams = z.infer<
  typeof workoutSessionPostParamsSchema
>;

export const workoutDayParamsSchema = z.object({
  workoutDayId: z.uuid(),
});
export type WorkoutDayParams = z.infer<typeof workoutDayParamsSchema>;

export const workoutSessionParamsSchema = z.object({
  workoutSessionId: z.uuid(),
});
export type WorkoutSessionParams = z.infer<typeof workoutSessionParamsSchema>;

export const workoutSessionQueryOptionsSchema = z.object({
  include: z
    .object({
      workoutDay: z
        .union([workoutDayQueryOptionsSchema, z.boolean()])
        .optional(),
      workoutSets: z
        .union([workoutSetsQueryOptionsSchema, z.boolean()])
        .optional(),
    })
    .optional(),
  where: z
    .object({
      startedAt: z
        .object({
          gte: z.coerce.date().optional(),
          lte: z.coerce.date().optional(),
        })
        .optional(),
      notes: z.string().optional(),
      userId: z.string().optional(),
      workoutDayId: z.string().optional(),
    })
    .optional(),
  orderBy: z
    .array(
      z.object({
        startedAt: orderDirection.optional(),
      }),
    )
    .optional(),
});
export type WorkoutSessionQueryOptions = z.infer<
  typeof workoutSessionQueryOptionsSchema
>;
