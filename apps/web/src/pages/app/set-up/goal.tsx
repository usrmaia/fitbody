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
import { goalParser, Goal } from "@/packages/schemas";
import type { SetUpProps } from "./useSetUp";

export function SetUpGoalPage({ form }: SetUpProps) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = form;

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

            {watch("goal") === Goal.OTHER && (
              <Field>
                <FieldLabel htmlFor="goalOther">Outro Objetivo?</FieldLabel>
                <Input
                  id="goalOther"
                  type="text"
                  placeholder="Digite seu objetivo"
                  className="input input-bordered w-full"
                  value={watch("goalOther")}
                  onChange={(event) =>
                    setValue("goalOther", event.target.value)
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
