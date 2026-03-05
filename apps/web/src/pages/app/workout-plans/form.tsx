import { Check, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import React from "react";

import {
  Button,
  DialogClose,
  Field,
  FieldContent,
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
  Separator,
  Textarea,
} from "@/components/ui";
import { useWorkoutPlanForm } from "./useForm";
import {
  DayFocus,
  dayFocusParcer,
  DayType,
  dayTypeParcer,
  Visibility,
  visibilityParcer,
  type WorkoutDay,
} from "@/packages/schemas";
import { Controller } from "react-hook-form";

export function WorkoutPlanForm({ mode }: { mode: "add" | "edit" }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    onSubmit,
    control,
  } = useWorkoutPlanForm({ mode });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Nome</FieldLabel>
          <FieldDescription>
            Escolha um nome fácil de identificar para este plano.
          </FieldDescription>
          <Input {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Objetivo</FieldLabel>
          <FieldDescription>
            Descreva o principal objetivo deste plano (ex.: hipertrofia).
          </FieldDescription>
          <Input {...register("goal")} />
          <FieldError>{errors.goal?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Período</FieldLabel>
          <FieldDescription>
            Defina quando o plano começa e, se quiser, a data de término.
          </FieldDescription>
          <Field orientation="horizontal">
            <Input
              {...register("startedAt")}
              type="date"
              placeholder="Data de início"
            />
            <Input
              {...register("endedAt")}
              type="date"
              placeholder="Data de término"
            />
          </Field>
          <FieldError>{errors.startedAt?.message}</FieldError>
          <FieldError>{errors.endedAt?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Descrição</FieldLabel>
          <FieldDescription>
            Adicione detalhes importantes para facilitar a execução do plano.
          </FieldDescription>
          <Textarea {...register("description")} />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Imagem</FieldLabel>
          <FieldDescription>
            Cole o link de uma imagem para representar o plano (opcional).
          </FieldDescription>
          <Input {...register("image")} type="url" />
          <FieldError>{errors.image?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Video</FieldLabel>
          <FieldDescription>
            Cole o link de um vídeo de apoio, se necessário (opcional).
          </FieldDescription>
          <Input {...register("video")} type="url" />
          <FieldError>{errors.video?.message}</FieldError>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel>Visibilidade</FieldLabel>
            <FieldDescription>
              Escolha se o plano será visível apenas para você ou para outros.
            </FieldDescription>
            <Controller
              name="visibility"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  name={field.name}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Como deseja compartilhar este plano?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Visibilidade</SelectLabel>
                      {Object.values(Visibility).map((visibility) => (
                        <SelectItem key={visibility} value={visibility}>
                          {visibilityParcer(visibility)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.visibility?.message}</FieldError>
          </FieldContent>
        </Field>

        {watch("workoutDays")?.map((_, index) => (
          <React.Fragment key={index}>
            <Separator className="my-2" />

            <Field>
              <FieldLabel>
                {watch("workoutDays")?.[index]?.dayCode ||
                  `Dia de treino ${index + 1}`}
              </FieldLabel>
              <FieldDescription>
                Defina o nome deste dia para organizar sua rotina.
              </FieldDescription>
              <Input
                {...register(`workoutDays.${index}.dayCode`)}
                placeholder={
                  [
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado",
                    "Domingo",
                  ][index]
                }
              />
              <FieldError>
                {errors.workoutDays?.[index]?.dayCode?.message}
              </FieldError>
            </Field>

            <Field>
              <FieldContent>
                <FieldLabel>Tipo</FieldLabel>
                <FieldDescription>
                  Selecione o tipo de treino planejado para este dia.
                </FieldDescription>
                <Controller
                  name={`workoutDays.${index}.type`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      name={field.name}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Qual é o tipo de treino deste dia?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo</SelectLabel>
                          {Object.values(DayType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {dayTypeParcer(type)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {errors.workoutDays?.[index]?.type?.message}
                </FieldError>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Foco</FieldLabel>
              <FieldDescription>
                Escolha o foco principal para orientar os exercícios do dia.
              </FieldDescription>
              <Controller
                name={`workoutDays.${index}.focus`}
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    name={field.name}
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Qual será o foco deste dia?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Foco</SelectLabel>
                        {Object.values(DayFocus).map((focus) => (
                          <SelectItem key={focus} value={focus}>
                            {dayFocusParcer(focus)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>
                {errors.workoutDays?.[index]?.focus?.message}
              </FieldError>
            </Field>

            {index > 0 && (
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  const workoutDays = watch("workoutDays") || [];
                  workoutDays[index].seq -= 1;
                  workoutDays[index - 1].seq += 1;
                  setValue(
                    "workoutDays",
                    [...workoutDays].sort(
                      (a, b) => (a.seq || 0) - (b.seq || 0),
                    ),
                  );
                }}
              >
                Mover para cima <ChevronUp />
              </Button>
            )}

            {index < (watch("workoutDays")?.length || 0) - 1 && (
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  const workoutDays = watch("workoutDays") || [];
                  workoutDays[index].seq += 1;
                  workoutDays[index + 1].seq -= 1;
                  setValue(
                    "workoutDays",
                    [...workoutDays].sort(
                      (a, b) => (a.seq || 0) - (b.seq || 0),
                    ),
                  );
                }}
              >
                Mover para baixo <ChevronDown />
              </Button>
            )}

            <Button
              variant="destructive"
              type="button"
              onClick={() =>
                setValue(
                  "workoutDays",
                  (watch("workoutDays") || [])
                    .filter((_, i) => i !== index)
                    .map((day, i) => ({ ...day, seq: i + 1 })),
                )
              }
            >
              Remover dia de treino <X />
            </Button>
          </React.Fragment>
        ))}

        <Button
          variant="outline"
          type="button"
          onClick={() =>
            setValue("workoutDays", [
              ...(watch("workoutDays") || []),
              { seq: (watch("workoutDays")?.length || 0) + 1 } as WorkoutDay,
            ])
          }
        >
          Adicionar dia de treino <Plus />
        </Button>

        <Field orientation="horizontal">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar <X />
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            Salvar <Check />
          </Button>
        </Field>

        <FieldError
          className="text-center"
          errors={[{ message: errors.root?.message }]}
        />
      </FieldGroup>
    </form>
  );
}
