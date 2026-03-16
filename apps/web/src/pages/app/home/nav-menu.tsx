import {
  Apple,
  BicepsFlexed,
  Dumbbell,
  NotepadText,
  SquareChartGantt,
  Star,
  Users,
} from "lucide-react";

import { Label, Separator } from "@/components/ui";
import { NavLink } from "react-router";

function IconLabelInfo({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ComponentType<{ className: string }>;
}) {
  return (
    <div className="flex w-16 flex-col items-center gap-2">
      <Icon className="text-primary h-8 w-8" />
      <Label className="text-primary font-mono text-xs font-light">
        {title}
      </Label>
    </div>
  );
}

export function NavigationMenu() {
  return (
    <div className="mt-4 flex h-20 items-center gap-4 overflow-auto px-8">
      <NavLink to="/app/workout-sessions">
        <IconLabelInfo title="Treino" Icon={Dumbbell} />
      </NavLink>
      <NavLink to="/app/workout-plans">
        <IconLabelInfo title="Planos" Icon={NotepadText} />
      </NavLink>
      <Separator orientation="vertical" />
      <NavLink to="/app/exercises">
        <IconLabelInfo title="Exercícios" Icon={BicepsFlexed} />
      </NavLink>
      <Separator orientation="vertical" />
      <IconLabelInfo title="Progresso" Icon={SquareChartGantt} />
      <Separator orientation="vertical" />
      <IconLabelInfo title="Nutrição" Icon={Apple} />
      <Separator orientation="vertical" />
      <IconLabelInfo title="Comunidade" Icon={Users} />
      <Separator orientation="vertical" />
      <IconLabelInfo title="Favoritos" Icon={Star} />
    </div>
  );
}
