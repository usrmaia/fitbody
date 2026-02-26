import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselSkip,
  Label,
} from "@/components/ui";

import workoutIcon from "@/assets/icons/Work Out.svg";
import nutritionIcon from "@/assets/icons/Nutrition.svg";
import communityIcon from "@/assets/icons/Community.svg";

import fitWomanTrainingImage from "@/assets/images/banners/woman-gymnastics-fitness-well-being.jpg";
import fitWomanWithVegetablesImage from "@/assets/images/banners/picture-young-woman-with-vegetables-kitchen.jpg";
import activeLifestyleOutdoorImage from "@/assets/images/banners/young-man-exercising-outdoors-park.jpg";

const values = [
  {
    icon: workoutIcon,
    title: "Inicie sua jornada rumo a um estilo de vida mais ativo",
    bgImage: fitWomanTrainingImage,
  },
  {
    icon: nutritionIcon,
    title: "Encontre dicas de nutrição que se encaixam no seu estilo de vida",
    bgImage: fitWomanWithVegetablesImage,
  },
  {
    icon: communityIcon,
    title: "Uma comunidade para você, desafie-se, compartilhe e cresça junto",
    bgImage: activeLifestyleOutdoorImage,
  },
];

export function LaunchCarousel() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <Carousel opts={{ align: "start" }} className="h-full">
        <CarouselContent className="h-full w-fit">
          {values.map((value, index) => (
            <CarouselItem
              key={index}
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
                  url(${value.bgImage})
                `,
              }}
              className="relative flex h-full w-full flex-col justify-center gap-4 bg-cover bg-center"
            >
              <div className="bg-primary flex flex-col items-center gap-2 px-4 py-4">
                <img src={value.icon} className="h-10 w-10" alt={value.title} />
                <Label className="text-center text-xl font-bold">
                  {value.title}
                </Label>
              </div>

              {values.length - 1 !== index && (
                <>
                  <CarouselSkip
                    title="PULAR"
                    className="absolute top-4 right-0"
                  >
                    <ChevronRight size={24} className="text-primary" />
                  </CarouselSkip>
                  <div className="mt-2 flex w-full justify-center">
                    <CarouselNext />
                  </div>
                </>
              )}

              {values.length - 1 === index && (
                <div className="text-center">
                  <NavLink to="/auth/sign-up">
                    <Button
                      variant="default"
                      className="rounded-full border border-white/90 bg-white/10 backdrop-blur-md hover:bg-white/30"
                    >
                      COMEÇAR AGORA
                    </Button>
                  </NavLink>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
