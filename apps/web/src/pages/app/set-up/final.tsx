import {
  Button,
  Field,
  FieldDescription,
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
  Textarea,
} from "@/components/ui";
import { BackButtonNavigation } from "./back-button-nav";
import type { SetUpProps } from "./useSetUp";
import {
  ActivityLevel,
  activityLevelParser,
  Gender,
  genderParser,
  Goal,
  goalParser,
  WeightUnit,
  weightUnitParser,
} from "@/packages/schemas";

export function SetUpFinalPage({ form }: SetUpProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
    register,
    setValue,
    watch,
  } = form;

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
                onValueChange={(value) => setValue("gender", value as Gender)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione seu gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gênero</SelectLabel>
                    {Object.values(Gender).map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {genderParser(gender)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError errors={[{ message: errors.gender?.message }]} />
            </Field>

            <Field>
              <FieldLabel>Data de Nascimento</FieldLabel>
              <Input
                type="date"
                placeholder="Digite sua data de nascimento"
                className="input input-bordered w-full"
                {...register("birthDate")}
              />
              <FieldError errors={[{ message: errors.birthDate?.message }]} />
            </Field>

            <Field>
              <FieldLabel>Peso</FieldLabel>
              <Select
                name="weightUnit"
                value={watch("weightUnit")}
                onValueChange={(value) =>
                  setValue("weightUnit", value as WeightUnit)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a unidade de peso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unidade de Peso</SelectLabel>
                    {Object.values(WeightUnit).map((weightUnit) => (
                      <SelectItem key={weightUnit} value={weightUnit}>
                        {weightUnitParser(weightUnit)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="number"
                min={1}
                placeholder="Digite seu peso"
                className="input input-bordered w-full"
                {...register("weightKg")}
              />
              <FieldError errors={[{ message: errors.weightKg?.message }]} />
            </Field>

            <Field>
              <FieldLabel>Altura CM</FieldLabel>
              <Input
                type="number"
                min={1}
                placeholder="Digite sua altura"
                className="input input-bordered w-full"
                {...register("heightCm")}
              />
              <FieldError errors={[{ message: errors.heightCm?.message }]} />
            </Field>

            <Field>
              <FieldLabel>Objetivo</FieldLabel>
              <Select
                name="goal"
                value={watch("goal")}
                onValueChange={(value) => setValue("goal", value as Goal)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Objetivos</SelectLabel>
                    {Object.values(Goal).map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goalParser(goal)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError errors={[{ message: errors.goal?.message }]} />
              {watch("goal") === "OTHER" && (
                <>
                  <Input
                    id="goalOther"
                    type="text"
                    placeholder="Digite seu objetivo"
                    className="input input-bordered w-full"
                    {...register("goalOther")}
                  />
                  <FieldError
                    errors={[{ message: errors.goalOther?.message }]}
                  />
                </>
              )}
            </Field>

            <Field>
              <FieldLabel>Nível de Atividade</FieldLabel>
              <Select
                name="activityLevel"
                value={watch("activityLevel")}
                onValueChange={(value) =>
                  setValue("activityLevel", value as ActivityLevel)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione seu nível de atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Nível de Atividade</SelectLabel>
                    {Object.values(ActivityLevel).map((activityLevel) => (
                      <SelectItem key={activityLevel} value={activityLevel}>
                        {activityLevelParser(activityLevel)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError
                errors={[{ message: errors.activityLevel?.message }]}
              />
            </Field>

            <Field>
              <FieldLabel>Bio</FieldLabel>
              <FieldDescription>
                Conte um pouco sobre você, seus interesses e objetivos de
                fitness. Isso nos ajudará a personalizar sua experiência!
              </FieldDescription>
              <Textarea
                id="bio"
                placeholder="Digite sua biografia"
                className="textarea textarea-bordered w-full"
                {...register("bio")}
              />
              <FieldError errors={[{ message: errors.bio?.message }]} />
            </Field>

            <FieldError
              className="text-center"
              errors={[{ message: errors.root?.message }]}
            />
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          className="my-10 w-52 rounded-full font-bold"
          disabled={isSubmitting}
        >
          Confirmar e Finalizar
        </Button>
      </form>
    </div>
  );
}
