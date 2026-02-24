import { Label } from "@/components/ui";

import fitnessTrainingImage from "@/assets/images/banners/woman-fitness-abs.jpg";

export function DisplayWeeklyChallenge() {
  return (
    <div className="bg-card mt-5 px-8 py-7">
      <div className="bg-accent flex h-32 rounded-3xl">
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <Label className="text-center text-2xl font-medium">
            Desafio da Semana
          </Label>
          <Label className="mt-2 text-center text-xs">
            Complete o desafio e ganhe recompensas!
          </Label>
        </div>
        <img
          src={fitnessTrainingImage}
          alt="Mulher treinando fitness com foco nos abdominais"
          className="h-full w-full flex-1 rounded-r-3xl object-cover"
          style={{
            backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                  radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
                `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
