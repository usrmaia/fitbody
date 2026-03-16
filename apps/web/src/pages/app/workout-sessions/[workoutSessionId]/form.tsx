import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { type Props, useWorkoutSessionForm } from "./useForm";
import { Controller } from "react-hook-form";
import {
  Visibility,
  visibilityParcer,
  WeightUnit,
  weightUnitParser,
} from "@/packages/schemas";
import { ExerciseAvatar } from "../../exercises/component";
import { Check } from "lucide-react";

export function WorkoutSessionForm({
  mode,
  workoutSessionId,
  workoutDayId,
  userId,
  prevWorkoutSession,
}: Props) {
  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    onSubmit,
    register,
    watch,
  } = useWorkoutSessionForm({
    mode,
    workoutSessionId,
    workoutDayId,
    userId,
    prevWorkoutSession,
  });

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel>Resumo da sessão</FieldLabel>
          <FieldDescription>
            Anote como foi o treino e o que você quer melhorar no próximo.
          </FieldDescription>
          <Textarea
            {...register("notes")}
            placeholder="Ex.: Hoje rendi bem no supino, mas senti o agachamento pesado."
          />
          <FieldError>{errors.notes?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Início da sessão</FieldLabel>
          <FieldDescription>
            Marque quando você começou o treino.
          </FieldDescription>
          <Input
            type="datetime-local"
            {...register("startedAt")}
            placeholder="Selecione a data e hora"
          />
          <FieldError>{errors.startedAt?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Fim da sessão</FieldLabel>
          <FieldDescription>
            Marque quando você finalizou o treino.
          </FieldDescription>
          <Input
            type="datetime-local"
            {...register("endedAt")}
            placeholder="Selecione a data e hora"
          />
          <FieldError>{errors.endedAt?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Visibilidade</FieldLabel>
          <Controller
            name="visibility"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                name={field.name}
                value={field.value?.toString() ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <SelectValue placeholder="Escolha quem pode ver esta sessão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Opções de visibilidade</SelectLabel>
                    {Object.values(Visibility).map((value) => (
                      <SelectItem key={value} value={value}>
                        {visibilityParcer(value)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[{ message: errors.visibility?.message }]} />
        </Field>

        <FieldGroup>
          <FieldLabel>Registro por exercício</FieldLabel>
          <FieldDescription>
            Preencha os dados de cada série para acompanhar sua evolução com
            clareza.
          </FieldDescription>
          {watch("workoutSets")?.map((_, index) => (
            <FieldGroup className="rounded-2xl border p-4" key={index}>
              <ExerciseAvatar
                exercise={getValues(`workoutSets.${index}.exercise`)!}
              />
              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={
                  getValues(`workoutSets.${index}.notes`) ? ["notes"] : []
                }
              >
                <AccordionItem value="notes">
                  <AccordionTrigger>Observações da série</AccordionTrigger>
                  <AccordionContent>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Observações da série</FieldLabel>
                        <FieldDescription>
                          Registre técnica, sensação ou ajuste para a próxima
                          vez.
                        </FieldDescription>
                        <Textarea
                          {...register(`workoutSets.${index}.notes`)}
                          placeholder="Ex.: Execução estável, subir 2 kg na próxima."
                        />
                        <FieldError>
                          {errors.workoutSets?.[index]?.notes?.message}
                        </FieldError>
                      </Field>
                    </FieldGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <FieldGroup className="flex-row">
                <Field>
                  <FieldLabel>Repetições</FieldLabel>
                  <FieldDescription>
                    Quantas repetições você completou nesta série.
                  </FieldDescription>
                  <Input
                    {...register(`workoutSets.${index}.reps`)}
                    placeholder="Ex.: 10"
                  />
                  <FieldError>
                    {errors.workoutSets?.[index]?.reps?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Carga</FieldLabel>
                  <FieldDescription>
                    Informe o peso usado nesta série.
                  </FieldDescription>
                  <Input
                    {...register(`workoutSets.${index}.weight`)}
                    placeholder="Ex.: 40"
                  />
                  <FieldError>
                    {errors.workoutSets?.[index]?.weight?.message}
                  </FieldError>
                </Field>
              </FieldGroup>

              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={
                  getValues(`workoutSets.${index}.timeInSeconds`) ||
                  getValues(`workoutSets.${index}.rpe`) ||
                  getValues(`workoutSets.${index}.rir`) ||
                  getValues(`workoutSets.${index}.weightUnit`)
                    ? ["other-info"]
                    : []
                }
              >
                <AccordionItem value="other-info">
                  <AccordionTrigger>
                    Outras informações (opcional)
                  </AccordionTrigger>
                  <AccordionContent>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Tempo (segundos)</FieldLabel>
                        <FieldDescription>
                          Use para exercícios cronometrados, como prancha.
                        </FieldDescription>
                        <Input
                          {...register(`workoutSets.${index}.timeInSeconds`)}
                          placeholder="Ex.: 60"
                        />
                        <FieldError>
                          {errors.workoutSets?.[index]?.timeInSeconds?.message}
                        </FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>RPE (1-10)</FieldLabel>
                        <FieldDescription>
                          Nível de esforço percebido ao final da série.
                        </FieldDescription>
                        <Input
                          {...register(`workoutSets.${index}.rpe`)}
                          placeholder="Ex.: 8"
                        />
                        <FieldError>
                          {errors.workoutSets?.[index]?.rpe?.message}
                        </FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>RIR</FieldLabel>
                        <FieldDescription>
                          Quantas repetições ainda caberiam com boa execução.
                        </FieldDescription>
                        <Input
                          {...register(`workoutSets.${index}.rir`)}
                          placeholder="Ex.: 2"
                        />
                        <FieldError>
                          {errors.workoutSets?.[index]?.rir?.message}
                        </FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>Unidade da carga</FieldLabel>
                        <Controller
                          name={`workoutSets.${index}.weightUnit`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Select
                              value={field.value ?? ""}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                aria-invalid={fieldState.invalid}
                                className="w-full"
                              >
                                <SelectValue placeholder="Escolha a unidade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    Unidades disponíveis
                                  </SelectLabel>
                                  {Object.values(WeightUnit).map((value) => (
                                    <SelectItem key={value} value={value}>
                                      {weightUnitParser(value)}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError
                          errors={[
                            {
                              message:
                                errors.workoutSets?.[index]?.weightUnit
                                  ?.message,
                            },
                          ]}
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Ordem da série</FieldLabel>
                        <FieldDescription>
                          Número da série dentro do exercício.
                        </FieldDescription>
                        <Input
                          {...register(`workoutSets.${index}.seq`)}
                          placeholder="Ex.: 1"
                        />
                        <FieldError>
                          {errors.workoutSets?.[index]?.seq?.message}
                        </FieldError>
                      </Field>
                    </FieldGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FieldGroup>
          ))}
        </FieldGroup>

        <FieldError
          className="text-center"
          errors={[{ message: errors.root?.message }]}
        />
        <Button type="submit" disabled={isSubmitting}>
          Salvar <Check />
        </Button>
      </FieldGroup>
    </form>
  );
}
