import { BackButtonNavigation } from "./back-button-nav";
import {
  Button,
  FieldGroup,
  FieldSet,
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

export function SetUpActivityLevelPage({ formSetup }: SetUpProp) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = formSetup;

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">
        Qual é o seu nível de atividade?
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
