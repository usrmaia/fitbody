import { ChevronLeft } from "lucide-react";

import { Button, Label, useCarousel } from "@/components/ui";

export function BackButtonNavigation() {
  const { scrollPrev } = useCarousel();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex w-full items-center justify-start"
      onClick={scrollPrev}
    >
      <ChevronLeft size={24} className="text-primary ml-2" />
      <Label className="text-primary font-mono text-xs font-semibold">
        Voltar
      </Label>
    </Button>
  );
}
