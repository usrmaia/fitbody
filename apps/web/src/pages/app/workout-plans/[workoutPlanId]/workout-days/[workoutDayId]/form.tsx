import {
  Check,
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Plus,
  Trash,
} from "lucide-react";
import { Controller } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
} from "@/components/ui";
import {
  DayFocus,
  dayFocusParcer,
  DayType,
  dayTypeParcer,
  muscleGroupParcer,
  type Exercise,
  type ExerciseMuscleGroup,
  type WorkoutDayExercise,
} from "@/packages/schemas";
import { useWorkoutDayForm } from "./useForm";
import { useExercise, useProfile } from "@/store";

import defaultExerciseThumbnail from "@/assets/images/default-exercise.jpg";
import { BodyHighlighter } from "@/components";

type Props = {
  workoutPlanId: string;
  workoutDayId?: string;
  mode: "add" | "edit";
};

export function WorkoutDayForm({ workoutPlanId, workoutDayId, mode }: Props) {
  const {
    control,
    formState: { errors, isSubmitting },
    exerciseMuscleGroup,
    handleSubmit,
    onSubmit,
    register,
    setValue,
    watch,
  } = useWorkoutDayForm({ workoutPlanId, workoutDayId, mode });
  const { exercises } = useExercise();
  const { profile } = useProfile();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Dia de treino</FieldLabel>
          <FieldDescription>
            Defina um nome para identificar este dia de treino. Ex: Upper,
            Lower, Full Body, Dia 1, Seg, Descanso, etc.
          </FieldDescription>
          <Input {...register("dayCode")} placeholder="Ex.: Segunda-feira" />
          <FieldError>{errors.dayCode?.message}</FieldError>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel>Tipo</FieldLabel>
            <FieldDescription>
              Selecione se este dia é de treino ou descanso.
            </FieldDescription>
            <Controller
              name="type"
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
                    <SelectValue placeholder="Qual é o tipo deste dia?" />
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
            <FieldError>{errors.type?.message}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel>Foco</FieldLabel>
            <FieldDescription>
              Escolha o foco principal deste dia.
            </FieldDescription>{" "}
            <Controller
              name="focus"
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
                    <SelectValue placeholder="Qual é o foco deste dia?" />
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
            <FieldError>{errors.focus?.message}</FieldError>
          </FieldContent>
        </Field>

        <FieldGroup>
          <FieldLabel>Exercícios</FieldLabel>
          <FieldDescription>
            Adicione os exercícios que farão parte deste dia de treino. Obs:
            cada exercício é uma série, então se quiser adicionar variações ou
            técnicas diferentes para um mesmo exercício, adicione o mesmo
            exercício mais de uma vez e use as anotações para diferenciar.
          </FieldDescription>
          {watch("workoutDayExercises")?.map((wde, index) => (
            <FieldGroup className="relative rounded-2xl border p-4" key={index}>
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-3 right-4" asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <EllipsisVertical />
                    <span className="sr-only">Edit</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    {index > 0 && (
                      <DropdownMenuItem
                        onClick={() => {
                          const workoutDayExercises =
                            watch("workoutDayExercises") || [];
                          workoutDayExercises[index].seq -= 1;
                          workoutDayExercises[index - 1].seq += 1;
                          setValue(
                            "workoutDayExercises",
                            [...workoutDayExercises].sort(
                              (a, b) => (a.seq || 0) - (b.seq || 0),
                            ),
                          );
                        }}
                      >
                        <ChevronUp />
                        Mover para cima
                      </DropdownMenuItem>
                    )}

                    {index <
                      (watch("workoutDayExercises")?.length || 0) - 1 && (
                      <DropdownMenuItem
                        onClick={() => {
                          const workoutDayExercises =
                            watch("workoutDayExercises") || [];
                          workoutDayExercises[index].seq += 1;
                          workoutDayExercises[index + 1].seq -= 1;
                          setValue(
                            "workoutDayExercises",
                            [...workoutDayExercises].sort(
                              (a, b) => (a.seq || 0) - (b.seq || 0),
                            ),
                          );
                        }}
                      >
                        <ChevronDown />
                        Mover para baixo
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      onClick={() =>
                        setValue(
                          "workoutDayExercises",
                          (watch("workoutDayExercises") || [])
                            .filter((_, i) => i <= index)
                            .concat({
                              // Duplicate the current exercise but reset the ID and increment the sequence
                              ...(watch("workoutDayExercises") || [])[index],
                              seq: index + 2,
                              id: undefined,
                            })
                            .concat(
                              (watch("workoutDayExercises") || [])
                                .filter((_, i) => i > index)
                                .map((exercise) => ({
                                  ...exercise,
                                  seq: exercise.seq + 1,
                                })),
                            ),
                        )
                      }
                    >
                      <Plus />
                      Adicionar Série
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() =>
                        setValue(
                          "workoutDayExercises",
                          (watch("workoutDayExercises") || [])
                            .filter((_, i) => i !== index)
                            .map((exercise, i) => ({
                              ...exercise,
                              seq: i + 1,
                            })),
                        )
                      }
                    >
                      <Trash />
                      Remover Exercício
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Field>
                <FieldLabel>
                  {wde.exercise?.name
                    ? `${wde.seq} - ${wde.exercise.name}`
                    : `Exercício ${wde.seq}`}
                </FieldLabel>
                <Controller
                  name={`workoutDayExercises.${index}.exerciseId`}
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldContent>
                        <FieldLabel>Exercício</FieldLabel>
                        <FieldDescription>
                          Escolha o exercício para este dia.
                        </FieldDescription>

                        <Combobox<Exercise>
                          items={exercises}
                          value={
                            exercises.find(
                              (exercise) => exercise.id === field.value,
                            ) ?? null
                          }
                          itemToStringValue={(exercise) => exercise.id ?? ""}
                          itemToStringLabel={(exercise) => exercise.name}
                          onValueChange={(exercise) => {
                            field.onChange(exercise?.id);
                            setValue(
                              "workoutDayExercises",
                              (watch("workoutDayExercises") || []).map(
                                (wde, i) =>
                                  i === index
                                    ? ({
                                        ...wde,
                                        workoutDayId: wde.workoutDayId,
                                        exerciseId: exercise?.id,
                                        exercise: exercise,
                                      } as WorkoutDayExercise)
                                    : wde,
                              ),
                            );
                          }}
                        >
                          <ComboboxInput placeholder="Selecione um exercício" />
                          <ComboboxContent>
                            <ComboboxEmpty>Vazio</ComboboxEmpty>
                            <ComboboxList>
                              {(exercise) => (
                                <ComboboxItem
                                  key={exercise.id}
                                  value={exercise}
                                >
                                  <span className="flex items-center gap-2">
                                    <Avatar className="size-7">
                                      <AvatarImage
                                        src={
                                          exercise.image ||
                                          defaultExerciseThumbnail
                                        }
                                        alt={exercise.name}
                                      />
                                      <AvatarFallback>
                                        {exercise.name}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="flex flex-col">
                                      <span className="font-medium">
                                        {exercise.name}
                                      </span>
                                      <span className="text-muted-foreground text-sm">
                                        {exercise.exerciseMuscleGroups
                                          .map((emg: ExerciseMuscleGroup) =>
                                            muscleGroupParcer(emg.muscleGroup),
                                          )
                                          .join(", ") || ""}
                                      </span>
                                    </span>
                                  </span>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>

                        <FieldError>{errors.focus?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />
                <FieldError>
                  {errors.workoutDayExercises &&
                    errors.workoutDayExercises[index]?.exerciseId?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Anotações</FieldLabel>
                <FieldDescription>
                  Adicione as anotações para este exercício.
                </FieldDescription>
                <Input
                  {...register(`workoutDayExercises.${index}.notes`)}
                  placeholder="Ex.: técnica, variações, etc."
                />
                <FieldError>
                  {errors.workoutDayExercises &&
                    errors.workoutDayExercises[index]?.notes?.message}
                </FieldError>
              </Field>

              <Accordion type="multiple">
                <AccordionItem value="user-workout-plans">
                  <AccordionTrigger>Mais opções</AccordionTrigger>
                  <AccordionContent>
                    <Field>
                      <FieldLabel>Início</FieldLabel>
                      <FieldDescription>
                        Adicione o horário de início para este exercício.
                      </FieldDescription>
                      <Input
                        {...register(`workoutDayExercises.${index}.startedAt`)}
                        placeholder="Ex.: 08:00"
                      />
                      <FieldError>
                        {errors.workoutDayExercises &&
                          errors.workoutDayExercises[index]?.startedAt?.message}
                      </FieldError>
                    </Field>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </FieldGroup>
          ))}

          <Button
            variant="outline"
            type="button"
            onClick={() =>
              setValue("workoutDayExercises", [
                ...(watch("workoutDayExercises") || []),
                {
                  workoutDayId: watch("id") || "",
                  seq: (watch("workoutDayExercises")?.length || 0) + 1,
                } as WorkoutDayExercise,
              ])
            }
          >
            Adicionar Exercício <Plus />
          </Button>
        </FieldGroup>

        <FieldGroup>
          <BodyHighlighter
            exerciseMuscleGroup={exerciseMuscleGroup}
            gender={profile?.gender}
          />
        </FieldGroup>

        <Button type="submit" disabled={isSubmitting}>
          Salvar <Check />
        </Button>

        <FieldError
          className="text-center"
          errors={[{ message: errors.root?.message }]}
        />
      </FieldGroup>
    </form>
  );
}
