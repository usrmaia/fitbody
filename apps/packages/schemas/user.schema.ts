import { z } from "zod";

export const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export const roleParcer = (role: Role): string => {
  const parser: Record<Role, string> = {
    ADMIN: "Administrador",
    USER: "Usuário",
  };

  return parser[role] || "";
};
export const roleSchema = z.enum(Role, "Função do usuário inválida");

export const userSchema = z.object({
  id: z.string().optional(),
  role: z.array(roleSchema).optional(),
  name: z.string("Nome do usuário é obrigatório"),
  email: z.email("Email do usuário é inválido"),
  emailVerified: z.boolean().optional(),
  image: z.string().nullish(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export type User = z.infer<typeof userSchema>;

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];
export const genderParser = (gender: Gender): string => {
  const parser: Record<Gender, string> = {
    MALE: "Masculino",
    FEMALE: "Feminino",
  };

  return parser[gender] || "";
};
export const genderSchema = z.enum(Gender, "Gênero do usuário inválido");

export const HeightUnit = {
  CM: "CM",
  IN: "IN",
} as const;
export type HeightUnit = (typeof HeightUnit)[keyof typeof HeightUnit];
export const heightUnitParser = (unit: HeightUnit): string => {
  const parser: Record<HeightUnit, string> = {
    CM: "Centímetros",
    IN: "Polegadas",
  };

  return parser[unit] || "";
};
export const heightUnitSchema = z.enum(
  HeightUnit,
  "Unidade de altura inválida",
);

export const WeightUnit = {
  KG: "KG",
  LB: "LB",
} as const;
export type WeightUnit = (typeof WeightUnit)[keyof typeof WeightUnit];
export const weightUnitParser = (unit: WeightUnit): string => {
  const parser: Record<WeightUnit, string> = {
    KG: "Quilogramas",
    LB: "Libras",
  };

  return parser[unit] || "";
};
export const weightUnitSchema = z.enum(WeightUnit, "Unidade de peso inválida");

export const Goal = {
  BUILD_MUSCLE: "BUILD_MUSCLE",
  LOSE_FAT: "LOSE_FAT",
  MAINTAIN_WEIGHT: "MAINTAIN_WEIGHT",
  IMPROVE_STRENGTH: "IMPROVE_STRENGTH",
  INCREASE_FLEXIBILITY: "INCREASE_FLEXIBILITY",
  IMPROVE_HEALTH: "IMPROVE_HEALTH",
  OTHER: "OTHER",
} as const;
export type Goal = (typeof Goal)[keyof typeof Goal];
export const goalParser = (goal: Goal): string => {
  const parser: Record<Goal, string> = {
    BUILD_MUSCLE: "Ganhar massa muscular",
    LOSE_FAT: "Perder gordura",
    MAINTAIN_WEIGHT: "Manter peso",
    IMPROVE_STRENGTH: "Melhorar força",
    INCREASE_FLEXIBILITY: "Aumentar flexibilidade",
    IMPROVE_HEALTH: "Melhorar saúde geral",
    OTHER: "Outro",
  };

  return parser[goal] || "";
};
export const goalSchema = z.enum(Goal, "Objetivo do usuário inválido");

export const ActivityLevel = {
  SEDENTARY: "SEDENTARY",
  LIGHTLY_ACTIVE: "LIGHTLY_ACTIVE",
  MODERATELY_ACTIVE: "MODERATELY_ACTIVE",
  VERY_ACTIVE: "VERY_ACTIVE",
  EXTRA_ACTIVE: "EXTRA_ACTIVE",
} as const;
export type ActivityLevel = (typeof ActivityLevel)[keyof typeof ActivityLevel];
export const activityLevelParser = (level: ActivityLevel): string => {
  const parser: Record<ActivityLevel, string> = {
    SEDENTARY: "Sedentário",
    LIGHTLY_ACTIVE: "Levemente ativo",
    MODERATELY_ACTIVE: "Moderadamente ativo",
    VERY_ACTIVE: "Muito ativo",
    EXTRA_ACTIVE: "Extremamente ativo",
  };

  return parser[level] || "";
};
export const activityLevelSchema = z.enum(
  ActivityLevel,
  "Nível de atividade do usuário inválido",
);

export const profileSchema = z
  .object({
    userId: z.string(),
    gender: genderSchema,
    bio: z.coerce
      .string()
      .max(1024, "A biografia deve ter no máximo 1024 caracteres")
      .nullish()
      .default(null),
    birthDate: z.coerce
      .date("Data de nascimento deve ser uma data válida")
      .min(new Date(1900, 0, 1), "Data de nascimento inválida")
      .max(new Date(), "Data de nascimento inválida"),
    heightCm: z.coerce
      .number()
      .positive("A altura deve ser um número positivo"),
    heightUnit: heightUnitSchema,
    weightKg: z.coerce.number().positive("O peso deve ser um número positivo"),
    weightUnit: weightUnitSchema,
    goal: goalSchema,
    goalOther: z.coerce
      .string()
      .max(256, "O campo 'Outro objetivo' deve ter no máximo 256 caracteres")
      .nullish()
      .default(null),
    activityLevel: activityLevelSchema,

    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .refine(
    (arg) => {
      if (arg.goal !== "OTHER") return true;
      return !!arg.goalOther;
    },
    {
      message:
        "O campo 'Outro objetivo' é obrigatório quando o objetivo é 'Outro'",
      path: ["goalOther"],
    },
  );
export type Profile = z.infer<typeof profileSchema>;

export const profileUserSchema = profileSchema.extend({
  user: userSchema.optional(),
});
export type ProfileUser = z.infer<typeof profileUserSchema>;
