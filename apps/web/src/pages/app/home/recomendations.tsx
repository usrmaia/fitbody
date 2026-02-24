import { ChevronRight, Clock, Flame, Play } from "lucide-react";
import { FaStar } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from "@/components/ui";

import peopleTrainingTogetherImage from "@/assets/images/banners/front-view-people-training-together-gym.jpg";
import gymTrainingTogetherImage from "@/assets/images/banners/handsome-black-man-is-engaged-gym.jpg";

export function Recommendations() {
  return (
    <div className="flex w-full flex-col gap-2 px-8">
      <div className="flex justify-between">
        <Label className="text-lg font-medium">Recomendações</Label>
        <div className="flex items-center gap-1">
          <Label className="text-xs font-medium">Ver tudo</Label>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="m-0 gap-0 p-0">
          <CardHeader className="relative m-0 gap-0 p-0">
            <img
              src={peopleTrainingTogetherImage}
              alt="Pessoas treinando juntas"
              className="h-24 w-full rounded-t-xl object-cover"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <FaStar className="absolute top-2 right-2 h-5 w-5 text-yellow-400" />
            <Play className="bg-secondary absolute right-2 -bottom-3 h-6 w-6 rounded-full p-1" />
          </CardHeader>
          <CardContent className="gap-2 p-2">
            <CardTitle>
              <Label className="text-xs">Circuito com amigos</Label>
            </CardTitle>
            <CardDescription className="mt-1 flex flex-row justify-between">
              <div className="flex items-center gap-1">
                <Clock className="text-primary h-3 w-3" />
                <Label className="text-xs">30 min</Label>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="text-primary h-3 w-3" />
                <Label className="text-xs">250 kcal</Label>
              </div>
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="m-0 gap-0 p-0">
          <CardHeader className="relative m-0 gap-0 p-0">
            <img
              src={gymTrainingTogetherImage}
              alt="Homem treinando na academia"
              className="h-24 w-full rounded-t-xl object-cover"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <FaStar className="absolute top-2 right-2 h-5 w-5" />
            <Play className="bg-secondary absolute right-2 -bottom-3 h-6 w-6 rounded-full p-1" />
          </CardHeader>
          <CardContent className="gap-2 p-2">
            <CardTitle>
              <Label className="text-xs">Pernas em foco</Label>
            </CardTitle>
            <CardDescription className="mt-1 flex flex-row justify-between">
              <div className="flex items-center gap-1">
                <Clock className="text-primary h-3 w-3" />
                <Label className="text-xs">45 min</Label>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="text-primary h-3 w-3" />
                <Label className="text-xs">190 kcal</Label>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
