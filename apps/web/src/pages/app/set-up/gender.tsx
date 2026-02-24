import { Mars, Venus } from "lucide-react";

import { BackButtonNavigation } from "./back-button-nav";
import { Button, Label, useCarousel } from "@/components/ui";
import type { SetUpProp } from "./useSetUp";

export function SetUpGenderPage({ formSetup }: SetUpProp) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = formSetup;

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">
        Qual é o seu gênero?
      </Label>

      <Label className="bg-card mt-3 px-8 py-4 text-center text-xs">
        Essa informação nos ajuda a personalizar sua experiência e fornecer
        recomendações mais precisas para alcançar seus objetivos de saúde e
        bem-estar.
      </Label>

      <div
        className={`bg-card border-foreground mt-10 flex h-40 w-40 items-center justify-center gap-16 rounded-full border ${watch("gender") === "male" ? "bg-primary" : ""}`}
        onClick={() => setValue("gender", "male")}
      >
        <Mars className="h-16 w-16" />
      </div>

      <Label className="mt-2 font-sans text-xl font-bold">Masculino</Label>

      <div
        className={`bg-card border-foreground mt-5 flex h-40 w-40 items-center justify-center gap-16 rounded-full border ${watch("gender") === "female" ? "bg-primary" : ""}`}
        onClick={() => setValue("gender", "female")}
      >
        <Venus className="h-16 w-16" />
      </div>

      <Label className="mt-2 font-sans text-xl font-bold">Feminino</Label>

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
