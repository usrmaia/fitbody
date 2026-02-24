import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

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

export function ProfileEditFitForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<SetUpFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: 25,
      weight: 70,
      weight_unit: "kg",
      height: 170,
    },
  });

  const onSubmit = (data: SetUpFormType) => {
    if (data.weight_unit === "lbs") data.weight = data.weight * 0.453592; // Converter libras para kg
    alert("Dados do formulário:" + JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex w-full flex-col items-center"
    >
      <FieldSet className="bg-card w-full px-8 py-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Gênero</FieldLabel>
            <Select
              value={watch("gender")}
              onValueChange={(value) =>
                setValue("gender", value as "male" | "female")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione seu gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gênero</SelectLabel>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[{ message: errors.gender?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Idade</FieldLabel>
            <Input
              type="number"
              min={1}
              placeholder="Digite sua idade"
              className="input input-bordered w-full"
              {...register("age")}
            />
            <FieldError errors={[{ message: errors.age?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Peso</FieldLabel>
            <Select
              name="weight_unit"
              value={watch("weight_unit")}
              onValueChange={(value) =>
                setValue("weight_unit", value as "kg" | "lbs")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a unidade de peso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Unidade de Peso</SelectLabel>
                  <SelectItem value="kg">Quilogramas (kg)</SelectItem>
                  <SelectItem value="lbs">Libras (lbs)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="number"
              min={1}
              placeholder="Digite seu peso"
              className="input input-bordered w-full"
              {...register("weight")}
            />
            <FieldError errors={[{ message: errors.weight?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Altura CM</FieldLabel>
            <Input
              type="number"
              min={1}
              placeholder="Digite sua altura"
              className="input input-bordered w-full"
              {...register("height")}
            />
            <FieldError errors={[{ message: errors.height?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Objetivo</FieldLabel>
            <Select
              name="goal"
              value={watch("goal")}
              onValueChange={(value) =>
                setValue(
                  "goal",
                  value as
                    | "lose_weight"
                    | "gain_mass"
                    | "gain_muscle"
                    | "defined_body"
                    | "other",
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione seu objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Objetivos</SelectLabel>
                  <SelectItem value="lose_weight">Perder Peso</SelectItem>
                  <SelectItem value="gain_mass">Ganhar Massa</SelectItem>
                  <SelectItem value="gain_muscle">
                    Ganhar Massa Muscular
                  </SelectItem>
                  <SelectItem value="defined_body">Corpo Definido</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[{ message: errors.goal?.message }]} />
            {watch("goal") === "other" && (
              <>
                <Input
                  id="goal_other"
                  type="text"
                  placeholder="Digite seu objetivo"
                  className="input input-bordered w-full"
                  {...register("goal_other")}
                />
                <FieldError
                  errors={[{ message: errors.goal_other?.message }]}
                />
              </>
            )}
          </Field>

          <Field>
            <FieldLabel>Nível de Atividade</FieldLabel>
            <Select
              name="activity_level"
              value={watch("activityLevel")}
              onValueChange={(value) =>
                setValue(
                  "activityLevel",
                  value as
                    | "sedentary"
                    | "lightly_active"
                    | "moderately_active"
                    | "very_active"
                    | "extra_active",
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione seu nível de atividade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Nível de Atividade</SelectLabel>
                  <SelectItem value="sedentary">Sedentário</SelectItem>
                  <SelectItem value="lightly_active">
                    Levemente Ativo
                  </SelectItem>
                  <SelectItem value="moderately_active">
                    Moderadamente Ativo
                  </SelectItem>
                  <SelectItem value="very_active">Muito Ativo</SelectItem>
                  <SelectItem value="extra_active">
                    Extremamente Ativo
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[{ message: errors.activityLevel?.message }]} />
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" className="my-10 w-52 rounded-full font-bold">
        Salvar
      </Button>
    </form>
  );
}
