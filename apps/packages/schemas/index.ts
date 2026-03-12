export * from "./exercise.api.schema";
export * from "./exercise.schema";
export * from "./user.api.schema";
export * from "./user.schema";
export * from "./workout-plan.api.schema";
export * from "./workout-session.api.schema";
export * from "./workout.schema";

import z from "zod";
import { $ZodErrorTree } from "zod/v4/core";

export const resultSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    code: z.number(),
    message: z.string().optional(),
    error: z.object({ errors: z.array(z.string()) }).optional(),
  });

export type Result<T = unknown> = {
  success: boolean;
  data?: T;
  code?: number;
  message?: string;
  error?: $ZodErrorTree<T>; // { errors: string[]; properties?: Record<string, { errors: string[] }> };
};
