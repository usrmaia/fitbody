import { Button, Label, useCarousel } from "@/components/ui";

import brunetteAthleteImage from "@/assets/images/banners/sports-brunette-woman-sportswear-training-gym.jpg";

export function SetUpInitPage() {
  const { scrollNext } = useCarousel();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full flex-6">
        <img
          src={brunetteAthleteImage}
          alt="Atleta morena de roupa esportiva treinando na academia."
          className="h-full w-full rounded-b-4xl object-cover"
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

      <div className="flex flex-4 flex-col items-center gap-8 pt-8">
        <Label className="text-primary text-center font-sans text-3xl font-bold">
          Consistência é a chave para o progresso. Não pare agora!
        </Label>

        <Label className="bg-card p-8 text-center text-xs">
          Continue se dedicando, cada passo conta para alcançar seus objetivos
          de saúde e bem-estar. Estamos aqui para apoiar você em cada etapa
          dessa jornada!
        </Label>

        <Button className="w-44 rounded-full font-bold" onClick={scrollNext}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
