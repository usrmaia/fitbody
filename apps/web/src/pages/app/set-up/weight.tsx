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
import { type SetUpProps } from "./useSetUp";

export function SetUpWeightPage({ form }: SetUpProps) {
  const { scrollNext } = useCarousel();
  const { setValue, watch } = form;

  const weights = Array.from({ length: 170 }).map((_, index) => {
    const weight = index + 30;
    return weight;
  });

  return (
    <div className="flex flex-col items-center">
      <BackButtonNavigation />

      <Label className="mt-8 font-sans text-2xl font-bold">
        Qual é o seu peso atual?
      </Label>

      <Label className="mt-3 px-8 py-4 text-center text-xs">
        Essa informação é importante para personalizar suas recomendações de
        saúde e bem-estar, garantindo que sejam adequadas para o seu peso atual.
      </Label>

      <div className="my-10 w-full px-8">
        <Card className="flex w-full flex-row items-center justify-center rounded-3xl">
          <CardContent
            className="flex items-center justify-center"
            onClick={() => setValue("weightUnit", "KG")}
          >
            <Label
              className={
                "text-primary-foreground text-xl font-bold" +
                (watch("weightUnit") === "KG" ? " text-primary" : "")
              }
            >
              KG{watch("weightUnit") === "KG" && "*"}
            </Label>
          </CardContent>
          <CardContent className="flex items-center justify-center">
            |
          </CardContent>
          <CardContent
            className="flex items-center justify-center"
            onClick={() => setValue("weightUnit", "LB")}
          >
            <Label
              className={
                "text-primary-foreground text-xl font-bold" +
                (watch("weightUnit") === "LB" ? " text-primary" : "")
              }
            >
              LBs{watch("weightUnit") === "LB" && "*"}
            </Label>
          </CardContent>
        </Card>
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          startIndex:
            weights.findIndex((weight) => weight === watch("weightKg")) - 2,
        }}
        className="w-full"
      >
        <CarouselContent>
          {weights.map((weight, index) => (
            <CarouselItem
              key={index}
              className="m-0 basis-1/5 p-0"
              onClick={() => setValue("weightKg", weight)}
            >
              <Card className="bg-secondary rounded-none">
                <CardContent className="flex justify-center">
                  <Label className="text-4xl font-bold">{weight}</Label>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ChevronDown size={24} className="text-primary mt-2 animate-bounce" />
      <Label className="mt-8 items-baseline text-6xl font-bold">
        {watch("weightKg")}
        <span className="text-sm">{watch("weightUnit")}</span>
      </Label>

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
