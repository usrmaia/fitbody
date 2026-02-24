import { ChevronUp } from "lucide-react";

import { BackButtonNavigation } from "./back-button-nav";
import {
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  Label,
  useCarousel,
} from "@/components/ui";
import type { SetUpProp } from "./useSetUp";

export function SetUpAgePage({ formSetup }: SetUpProp) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = formSetup;

  const ages = Array.from({ length: 100 }).map((_, index) => {
    const age = index + 14;
    return age;
  });

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">
        Quantos anos você tem?
      </Label>

      <Label className="mt-3 px-8 py-4 text-center text-xs">
        Essa informação é importante para personalizar suas recomendações de
        saúde e bem-estar, garantindo que sejam adequadas para a sua faixa
        etária.
      </Label>

      <Label className="mt-10 text-6xl font-bold">{watch("age")}</Label>
      <ChevronUp size={24} className="text-primary mt-8 mb-2 animate-bounce" />

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          startIndex: ages.findIndex((age) => age === watch("age")) - 2,
        }}
        className="w-full"
      >
        <CarouselContent>
          {ages.map((age, index) => (
            <CarouselItem
              key={index}
              className="m-0 basis-1/5 p-0"
              onClick={() => setValue("age", age)}
            >
              <Card className="bg-secondary rounded-none">
                <CardContent className="flex justify-center">
                  <Label className="text-4xl font-bold">{age}</Label>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button
        variant="outline"
        className="mt-20 w-44 rounded-full font-bold"
        onClick={scrollNext}
      >
        Continuar
      </Button>
    </div>
  );
}
