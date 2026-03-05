import { Search, X } from "lucide-react";
import { Controller } from "react-hook-form";

import {
  Badge,
  Button,
  Field,
  FieldContent,
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
import { MuscleGroup, muscleGroupParcer } from "@/packages/schemas";
import { useExercisesSearchForm } from "./useSearchForm";

export function ExercisesSearchForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    handleExerciseSearchSubmit,
  } = useExercisesSearchForm();

  return (
    <form onSubmit={handleSubmit(handleExerciseSearchSubmit)}>
      <FieldSet className="bg-card w-full px-8 py-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Exercício</FieldLabel>
            <Input
              type="text"
              placeholder="Nome do exercício"
              value={watch("search")}
              onChange={(e) => setValue("search", e.target.value)}
            />
            <FieldError errors={[{ message: errors.search?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Grupo Muscular</FieldLabel>
            <Controller
              name="muscleGroups"
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
                    <SelectValue placeholder="Selecione o grupo muscular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Grupo Muscular</SelectLabel>
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
            <FieldContent className="flex-row flex-wrap gap-2">
              {watch("muscleGroups")?.map((mg, index) => (
                <Badge
                  key={index}
                  onClick={() =>
                    setValue(
                      "muscleGroups",
                      (watch("muscleGroups") || []).filter((v) => v !== mg),
                    )
                  }
                >
                  {muscleGroupParcer(mg)}
                  <X />
                </Badge>
              ))}
            </FieldContent>
            <FieldError errors={[{ message: errors.muscleGroups?.message }]} />
          </Field>
        </FieldGroup>
        <Field orientation="horizontal">
          <Button type="submit">
            Buscar <Search />
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
}
