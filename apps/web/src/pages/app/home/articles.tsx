import { ChevronRight } from "lucide-react";
import { FaStar } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
} from "@/components/ui";

import trainingBoxImage from "@/assets/images/banners/boxer-box-sport-men.jpg";
import strongAcademySportsImage from "@/assets/images/banners/strong-academy-sports-fitness.jpg";
import gymWorkoutSessionImage from "@/assets/images/banners/woman-fitness-workout-muscles.jpg";

export function Articles() {
  return (
    <div className="mt-5 flex w-full flex-col gap-2 px-8">
      <div className="flex justify-between">
        <Label className="text-lg font-medium">Artigos</Label>
        <div className="flex items-center gap-1">
          <Label className="text-xs font-medium">Ver tudo</Label>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="m-0 gap-0 p-0">
          <CardHeader className="relative m-0 gap-0 p-0">
            <img
              src={trainingBoxImage}
              alt="Homem treinando boxe"
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
          </CardHeader>
          <CardContent className="gap-2 p-2">
            <CardTitle>
              <Label className="text-sm">Treino de Híbrido com Boxe</Label>
            </CardTitle>
          </CardContent>
        </Card>

        <Card className="m-0 gap-0 p-0">
          <CardHeader className="relative m-0 gap-0 p-0">
            <img
              src={strongAcademySportsImage}
              alt="Mulher treinando forte na academia"
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
          </CardHeader>
          <CardContent className="gap-2 p-2">
            <CardTitle>
              <Label className="text-sm">Treino de Força para Superior</Label>
            </CardTitle>
          </CardContent>
        </Card>

        <Card className="m-0 gap-0 p-0">
          <CardHeader className="relative m-0 gap-0 p-0">
            <img
              src={gymWorkoutSessionImage}
              alt="Mulher treinando para corrida"
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
          </CardHeader>
          <CardContent className="gap-2 p-2">
            <CardTitle>
              <Label className="text-sm">Treino de Corrida</Label>
            </CardTitle>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
