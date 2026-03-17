import z from "zod";

import { exerciseSchema, visibilitySchema } from "./exercise.schema";
import { userSchema, weightUnitSchema } from "./user.schema";

export const workoutDayExerciseSchema = z.object({
  id: z.string().optional(),
  seq: z
    .number()
    .int()
    .min(0, "A sequência não pode ser negativa")
    .max(60, "A sequência não pode exceder 60"),
  notes: z
    .string()
    .max(2048, "Anotação não pode exceder 2048 caracteres")
    .nullish(),
  startedAt: z.preprocess(
    (value) => (value == null || value === "" ? null : value),
    z.coerce.date().nullable(),
  ),

  workoutDayId: z.string(),
  exerciseId: z.string(),
  exercise: exerciseSchema.optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export type WorkoutDayExercise = z.infer<typeof workoutDayExerciseSchema>;

export const DayType = {
  REST: "REST",
  WORKOUT: "WORKOUT",
} as const;
export type DayType = (typeof DayType)[keyof typeof DayType];
export const dayTypeSchema = z.enum(DayType, "Tipo do dia inválido");
export const dayTypeParcer = (value: DayType): string => {
  const parser: Record<DayType, string> = {
    REST: "Descanso",
    WORKOUT: "Treino",
  };

  return parser[value] || "";
};

export const DayFocus = {
  BODYBUILDING: "BODYBUILDING",
  STRENGTH: "STRENGTH",
  CARDIO: "CARDIO",
  FLEXIBILITY: "FLEXIBILITY",
} as const;
export type DayFocus = (typeof DayFocus)[keyof typeof DayFocus];
export const dayFocusSchema = z.enum(DayFocus, "Foco do dia inválido");
export const dayFocusParcer = (value: DayFocus): string => {
  const parser: Record<DayFocus, string> = {
    BODYBUILDING: "Hipertrofia",
    STRENGTH: "Força",
    CARDIO: "Cardio",
    FLEXIBILITY: "Flexibilidade",
  };

  return parser[value] || "";
};

export const workoutDaySchema = z.object({
  id: z.string().optional(),
  dayCode: z
    .string()
    .max(64, "O código do dia não pode exceder 64 caracteres")
    .optional(),
  seq: z
    .number()
    .int()
    .min(0, "A sequência não pode ser negativa")
    .max(60, "A sequência não pode exceder 60"),
  type: dayTypeSchema.optional(),
  focus: dayFocusSchema.nullish(),

  workoutPlanId: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

  workoutDayExercises: workoutDayExerciseSchema.array().optional(),
});
export type WorkoutDay = z.infer<typeof workoutDaySchema>;

export const workoutPlanSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .max(256, "O nome do plano de treino não pode exceder 256 caracteres"),
  goal: z
    .string()
    .max(512, "O objetivo do plano de treino não pode exceder 512 caracteres")
    .optional(),
  startedAt: z.coerce.date().nullish(),
  endedAt: z.coerce.date().nullish(),
  description: z
    .string()
    .max(2048, "A descrição não pode exceder 2048 caracteres")
    .optional(),
  image: z.string().nullish(),
  video: z.string().nullish(),
  visibility: visibilitySchema.optional(),

  workoutDays: workoutDaySchema
    .array()
    .refine((days) => {
      if (!days) return true;
      return days.every((day, index) => day.seq === index + 1);
    }, "A sequência dos dias de treino deve ser contínua")
    .optional(),

  createdById: z.string(),
  createdBy: userSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export type WorkoutPlan = z.infer<typeof workoutPlanSchema>;

export const workoutSetSchema = z.object({
  id: z.ulid().optional(),
  reps: z.coerce.number().int().optional(),
  weight: z.coerce
    .number()
    .min(0, "O peso não pode ser negativo")
    .max(1000, "O peso não pode exceder 1000")
    .optional(),
  weightUnit: weightUnitSchema.optional(),
  timeInSeconds: z.coerce
    .number()
    .min(0, "O tempo não pode ser negativo")
    .max(3600, "O tempo não pode exceder 3600 segundos (1 hora)")
    .int()
    .optional(),
  rpe: z.coerce
    .number()
    .min(0, "O RPE não pode ser negativo")
    .max(100, "O RPE não pode exceder 100")
    .optional(),
  rir: z.coerce
    .number()
    .int()
    .min(0, "O RIR não pode ser negativo")
    .max(30, "O RIR não pode exceder 30")
    .optional(),
  seq: z.coerce
    .number()
    .int()
    .min(0, "A sequência não pode ser negativa")
    .max(60, "A sequência não pode exceder 60")
    .optional(),
  notes: z
    .string()
    .max(1024, "Anotação não pode exceder 1024 caracteres")
    .optional(),

  workoutSessionId: z.ulid().optional(),
  exerciseId: z.ulid(),
  exercise: exerciseSchema.optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type WorkoutSet = z.infer<typeof workoutSetSchema>;

export const workoutSessionSchema = z.object({
  id: z.ulid().optional(),
  notes: z
    .string()
    .max(1024, "Anotação não pode exceder 1024 caracteres")
    .optional(),
  startedAt: z.coerce.date(),
  endedAt: z.preprocess(
    (value) => (value == null || value === "" ? undefined : value),
    z.coerce.date().optional(),
  ),
  visibility: visibilitySchema.optional(),

  workoutDayId: z.string(),
  workoutDay: workoutDaySchema.optional(),
  userId: z.string(),
  user: userSchema.optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

  workoutSets: workoutSetSchema.array(),
});
export type WorkoutSession = z.infer<typeof workoutSessionSchema>;
