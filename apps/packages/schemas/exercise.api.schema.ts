import z from "zod";

import { orderDirection } from "./api.schema";
import { exerciseSchema } from "./exercise.schema";

export const exerciseParamsSchema = z.object({
  exerciseId: z.string(),
});
export type ExerciseParams = z.infer<typeof exerciseParamsSchema>;

export const exerciseQueryOptionsSchema = z.object({
  include: z
    .object({
      createdBy: z.boolean().optional(),
      exerciseMuscleGroups: z.boolean().optional(),
    })
    .optional(),
  where: z
    .object({
      name: z.any().optional(),
      exerciseMuscleGroups: z.any().optional(),
    })
    .optional(),
  orderBy: z
    .array(
      z.object({
        name: orderDirection.optional(),
        createdBy: z.object({ name: orderDirection.optional() }).optional(),
      }),
    )
    .optional(),
});
export type ExerciseQueryOptions = z.infer<typeof exerciseQueryOptionsSchema>;

export const exerciseBodySchema = exerciseSchema.omit({ createdBy: true });
export type ExerciseBody = z.infer<typeof exerciseBodySchema>;
