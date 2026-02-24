import { useNavigate } from "react-router";

import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { BackButtonNavigation } from "./back-button-nav";
import type { SetUpFormType, SetUpProp } from "./useSetUp";

export function SetUpFinalPage({ formSetup }: SetUpProp) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = formSetup;
  const navigate = useNavigate();

  const onSubmit = (data: SetUpFormType) => {
    if (data.weight_unit === "lbs") data.weight = data.weight * 0.453592; // Converter libras para kg
    alert("Dados do formulário:" + JSON.stringify(data));
    navigate("/app/home");
  };

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">Quase lá!</Label>

      <Label className="mt-3 px-8 py-4 text-center text-xs">
        Verifique se todas as informações estão corretas antes de finalizar o
        processo de configuração. Você pode voltar e editar qualquer informação
        se necessário.
      </Label>

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
              <FieldError
                errors={[{ message: errors.activityLevel?.message }]}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button type="submit" className="my-10 w-52 rounded-full font-bold">
          Confirmar e Finalizar
        </Button>
      </form>
    </div>
  );
}
