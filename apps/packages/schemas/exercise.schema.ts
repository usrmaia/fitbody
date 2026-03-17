import z from "zod";

import { userSchema } from "./user.schema";

export const MuscleGroup = {
  ABDUCTORS: "ABDUCTORS",
  ABS: "ABS",
  ADDUCTORS: "ADDUCTORS",
  BICEPS: "BICEPS",
  CALVES: "CALVES",
  CHEST: "CHEST",
  FOREARMS_EXTENSORS: "FOREARMS_EXTENSORS",
  FOREARMS_FLEXORS: "FOREARMS_FLEXORS",
  GLUTES: "GLUTES",
  HAMSTRINGS: "HAMSTRINGS",
  HIP_FLEXORS: "HIP_FLEXORS",
  LOWER_BACK: "LOWER_BACK",
  MID_BACK: "MID_BACK",
  QUADS: "QUADS",
  SHOULDERS: "SHOULDERS",
  TRAPEZIUS: "TRAPEZIUS",
  TRICEPS: "TRICEPS",
  UPPER_BACK: "UPPER_BACK",
} as const;
export type MuscleGroup = (typeof MuscleGroup)[keyof typeof MuscleGroup];
export const muscleGroupParcer = (muscleGroup: MuscleGroup): string => {
  const parser: Record<MuscleGroup, string> = {
    ABDUCTORS: "Abdutores",
    ABS: "Abdômen",
    ADDUCTORS: "Adutores",
    BICEPS: "Bíceps",
    CALVES: "Panturrilhas",
    CHEST: "Peitoral",
    FOREARMS_EXTENSORS: "Extensores de Antebraço",
    FOREARMS_FLEXORS: "Flexores de Antebraço",
    GLUTES: "Glúteos",
    HAMSTRINGS: "Isquiotibiais",
    HIP_FLEXORS: "Flexores de Quadril",
    LOWER_BACK: "Parte Inferior das Costas",
    MID_BACK: "Parte Média das Costas",
    QUADS: "Quadríceps",
    SHOULDERS: "Ombros",
    TRAPEZIUS: "Trapézio",
    TRICEPS: "Tríceps",
    UPPER_BACK: "Parte Superior das Costas",
  };

  return parser[muscleGroup] || "";
};
export const muscleGroupSchema = z.enum(MuscleGroup, "Musculatura inválida");

export const MuscleGroupRole = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  STABILIZER: "STABILIZER",
  EMPHASIS: "EMPHASIS",
} as const;
export type MuscleGroupRole =
  (typeof MuscleGroupRole)[keyof typeof MuscleGroupRole];
export const muscleGroupRoleParcer = (role: MuscleGroupRole): string => {
  const parser: Record<MuscleGroupRole, string> = {
    PRIMARY: "Primário",
    SECONDARY: "Secundário",
    STABILIZER: "Estabilizador",
    EMPHASIS: "Ênfase",
  };

  return parser[role] || "";
};
export const muscleGroupRoleSchema = z.enum(
  MuscleGroupRole,
  "Função da musculatura inválida",
);

export const exerciseMuscleGroupSchema = z.object({
  exerciseId: z.ulid().optional(),
  muscleGroup: muscleGroupSchema,
  role: muscleGroupRoleSchema,

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export type ExerciseMuscleGroup = z.infer<typeof exerciseMuscleGroupSchema>;

export const Visibility = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  UNLISTED: "UNLISTED",
} as const;
export type Visibility = (typeof Visibility)[keyof typeof Visibility];
export const visibilityParcer = (visibility: Visibility): string => {
  const parser: Record<Visibility, string> = {
    PUBLIC: "Público",
    PRIVATE: "Privado",
    UNLISTED: "Não listado",
  };

  return parser[visibility] || "";
};

export const visibilitySchema = z.enum(Visibility, "Visibilidade inválida");

export const exerciseSchema = z.object({
  id: z.ulid().optional(),
  name: z
    .string()
    .min(1, "O nome do exercício é obrigatório")
    .max(256, "O nome do exercício não pode exceder 256 caracteres"),
  description: z
    .string()
    .max(2048, "A descrição não pode exceder 2048 caracteres")
    .optional(),
  image: z
    .union([z.url("URL da imagem do exercício inválida"), z.string()])
    .nullish(),
  video: z
    .union([z.url("URL do vídeo do exercício inválida"), z.string()])
    .nullish(),
  visibility: visibilitySchema.nullish(),

  createdById: z.string(),
  createdBy: userSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

  exerciseMuscleGroups: exerciseMuscleGroupSchema.array().optional(),
});
export type Exercise = z.infer<typeof exerciseSchema>;
