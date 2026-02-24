import { BackButtonNavigation } from "./back-button-nav";
import {
  Button,
  Field,
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
  useCarousel,
} from "@/components/ui";
import type { SetUpProp } from "./useSetUp";

export function SetUpGoalPage({ formSetup }: SetUpProp) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = formSetup;

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">
        Qual é o seu objetivo?
      </Label>

      <Label className="mt-3 px-8 py-4 text-center text-xs">
        Essa informação nos ajuda a personalizar sua experiência e fornecer
        recomendações mais precisas para alcançar seus objetivos de saúde e
        bem-estar.
      </Label>

      <form className="bg-card my-10 w-full px-8 py-5">
        <FieldSet className="w-full">
          <FieldGroup>
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

            {watch("goal") === "other" && (
              <Field>
                <FieldLabel htmlFor="goal_other">Outro Objetivo?</FieldLabel>
                <Input
                  id="goal_other"
                  type="text"
                  placeholder="Digite seu objetivo"
                  className="input input-bordered w-full"
                  value={watch("goal_other")}
                  onChange={(event) =>
                    setValue("goal_other", event.target.value)
                  }
                />
              </Field>
            )}
          </FieldGroup>
        </FieldSet>
      </form>

      <Button
        variant="outline"
        className="mt-10 w-44 rounded-full font-bold"
        onClick={scrollNext}
      >
        Continuar
      </Button>
    </div>
  );
}
