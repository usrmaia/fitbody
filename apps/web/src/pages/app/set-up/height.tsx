import { ChevronDown } from "lucide-react";

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
import type { SetUpProps } from "./useSetUp";

export function SetUpHeightPage({ form }: SetUpProps) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = form;

  const heights = Array.from({ length: 151 }).map((_, index) => {
    const height = index + 100;
    return height;
  });

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">
        Qual é a sua altura?
      </Label>

      <Label className="mt-3 px-8 py-4 text-center text-xs">
        Essa informação é importante para personalizar suas recomendações de
        saúde e bem-estar, garantindo que sejam adequadas ao seu perfil físico.
      </Label>

      <Label className="mt-10 text-6xl font-bold">{watch("heightCm")}</Label>
      <ChevronDown
        size={24}
        className="text-primary mt-8 mb-2 animate-bounce"
      />

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          startIndex:
            heights.findIndex((height) => height === watch("heightCm")) - 2,
        }}
        className="w-full"
      >
        <CarouselContent>
          {heights.map((height, index) => (
            <CarouselItem
              key={index}
              className="m-0 basis-1/5 p-0"
              onClick={() => setValue("heightCm", height)}
            >
              <Card className="bg-secondary rounded-none">
                <CardContent className="flex justify-center">
                  <Label className="text-4xl font-bold">{height}</Label>
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
