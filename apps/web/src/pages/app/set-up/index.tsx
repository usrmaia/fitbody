import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import { SetUpInitPage } from "./init";
import { SetUpGenderPage } from "./gender";
import { SetUpAgePage } from "./age";
import { SetUpWeightPage } from "./weight";
import { SetUpHeightPage } from "./height";
import { SetUpGoalPage } from "./goal";
import { SetUpActivityLevelPage } from "./activity-level";
import { SetUpFinalPage } from "./final";
import { useSetUp } from "./useSetUp";

export function SetUpPage() {
  const { formSetup } = useSetUp();

  const pages = [
    <SetUpInitPage />,
    <SetUpGenderPage formSetup={formSetup} />,
    <SetUpAgePage formSetup={formSetup} />,
    <SetUpWeightPage formSetup={formSetup} />,
    <SetUpHeightPage formSetup={formSetup} />,
    <SetUpGoalPage formSetup={formSetup} />,
    <SetUpActivityLevelPage formSetup={formSetup} />,
    <SetUpFinalPage formSetup={formSetup} />,
  ];

  return (
    <Carousel opts={{ align: "start", watchDrag: false }} className="w-full">
      <CarouselContent className="mx-0 w-full px-0">
        {pages.map((page, index) => (
          <CarouselItem key={index} className="mx-0 w-full px-0">
            {page}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
