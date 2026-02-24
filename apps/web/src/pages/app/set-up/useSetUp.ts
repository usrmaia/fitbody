import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    gender: z.enum(["male", "female"], { error: "Gênero é obrigatório" }),
    age: z
      .number()
      .min(0, "Idade deve ser maior que 0")
      .max(120, "Idade deve ser menor que 120"),
    weight: z
      .number()
      .min(0, "Peso deve ser maior que 0")
      .max(200, "Peso deve ser menor que 200"),
    weight_unit: z.enum(["kg", "lbs"]),
    height: z
      .number()
      .min(0, "Altura deve ser maior que 0")
      .max(250, "Altura deve ser menor que 250"),
    goal: z.enum(
      ["lose_weight", "gain_mass", "gain_muscle", "defined_body", "other"],
      { error: "Objetivo é obrigatório" },
    ),
    goal_other: z.string().optional(),
    activityLevel: z.enum(
      [
        "sedentary",
        "lightly_active",
        "moderately_active",
        "very_active",
        "extra_active",
      ],
      { error: "Nível de atividade é obrigatório" },
    ),
  })
  .refine(
    (data) => {
      if (data.goal === "other" && !data.goal_other) return false;
      return true;
    },
    { message: "Por favor, descreva seu objetivo", path: ["goal_other"] },
  );

export type SetUpFormType = z.infer<typeof schema>;

export type SetUpProp = {
  formSetup: UseFormReturn<SetUpFormType>;
};

export const useSetUp = () => {
  const formSetup = useForm<SetUpFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: 25,
      weight: 70,
      weight_unit: "kg",
      height: 170,
    },
  });

  return { formSetup };
};
