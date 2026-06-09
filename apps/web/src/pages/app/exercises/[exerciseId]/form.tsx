import { Check, Plus, X } from "lucide-react";
import { Controller } from "react-hook-form";

import {
  Button,
  DialogClose,
  Field,
  FieldDescription,
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
import {
  MuscleGroup,
  muscleGroupParcer,
  MuscleGroupRole,
  muscleGroupRoleParcer,
  Visibility,
  visibilityParcer,
  type ExerciseMuscleGroup,
} from "@/packages/schemas";
import { useExerciseForm, type ExerciseFormProps } from "./useForm";

export function ExerciseForm({
  exerciseId,
  exercise,
  mode,
}: ExerciseFormProps) {
  const {
    control,
    formState: { errors },
    getValues,
    onSubmit,
    register,
    setValue,
    watch,
  } = useExerciseForm({ exerciseId, exercise, mode });

  return (
    <form onSubmit={onSubmit}>
      <FieldSet className="bg-card w-full px-8 py-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Nome</FieldLabel>
            <Input placeholder="Nome do exercício" {...register("name")} />
            <FieldError errors={[{ message: errors.name?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Descrição</FieldLabel>
            <Input
              type="text"
              placeholder="Descrição do exercício"
              {...register("description")}
            />
            <FieldError errors={[{ message: errors.description?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Image</FieldLabel>
            <Input
              type="text"
              placeholder="URL da imagem do exercício"
              {...register("image")}
            />
            <FieldError errors={[{ message: errors.image?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Vídeo</FieldLabel>
            <Input
              type="text"
              placeholder="URL do vídeo do exercício"
              {...register("video")}
            />
            <FieldError errors={[{ message: errors.video?.message }]} />
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
                    <SelectValue placeholder="Selecione a visibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Visibilidade</SelectLabel>
                      {Object.values(Visibility).map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {visibilityParcer(tag)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[{ message: errors.visibility?.message }]} />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Musculaturas</FieldLabel>
          <FieldDescription>
            Adicione as musculaturas envolvidas no exercício e opcionalmente a
            sua função (primária, secundária ou estabilizadora).
          </FieldDescription>
          {watch("exerciseMuscleGroups")?.map((_, index) => (
            <FieldGroup className="rounded-2xl border p-4" key={index}>
              <Field>
                <FieldLabel>Musculatura</FieldLabel>
                <Controller
                  name={`exerciseMuscleGroups.${index}.muscleGroup`}
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
                        <SelectValue placeholder="Musculatura" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Musculatura</SelectLabel>
                          {Object.values(MuscleGroup).map((mg) => (
                            <SelectItem key={mg} value={mg}>
                              {muscleGroupParcer(mg)}
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
                        errors.exerciseMuscleGroups?.[index]?.muscleGroup
                          ?.message,
                    },
                  ]}
                />
              </Field>

              <Field>
                <FieldLabel>Função</FieldLabel>
                <FieldDescription></FieldDescription>
                <Controller
                  name={`exerciseMuscleGroups.${index}.role`}
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
                        <SelectValue placeholder="Função" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Função</SelectLabel>
                          {Object.values(MuscleGroupRole).map((role) => (
                            <SelectItem key={role} value={role}>
                              {muscleGroupRoleParcer(role)}
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
                        errors.exerciseMuscleGroups?.[index]?.role?.message,
                    },
                  ]}
                />
              </Field>

              <Field>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setValue(
                      "exerciseMuscleGroups",
                      (getValues("exerciseMuscleGroups") || []).filter(
                        (_, i) => i !== index,
                      ),
                    )
                  }
                >
                  Remover Musculatura
                </Button>
              </Field>
            </FieldGroup>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setValue("exerciseMuscleGroups", [
                ...(getValues("exerciseMuscleGroups") || []),
                { role: MuscleGroupRole.PRIMARY } as ExerciseMuscleGroup,
              ])
            }
          >
            Adicionar Musculatura <Plus />
          </Button>
        </FieldGroup>
        <Field orientation="horizontal">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar <X />
            </Button>
          </DialogClose>
          <Button type="submit">
            Salvar <Check />
          </Button>
        </Field>

        <FieldError
          className="text-center"
          errors={[{ message: errors.root?.message }]}
        />
      </FieldSet>
    </form>
  );
}
