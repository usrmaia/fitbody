import { Bell, Search, UserCog } from "lucide-react";

import { Label } from "@/components/ui";
import { ModeToggle } from "@/theme/mode-toggle";
import { NavigationMenu } from "./nav-menu";
import { Recommendations } from "./recomendations";
import { DisplayWeeklyChallenge } from "./weekly-challenge";
import { Articles } from "./articles";
import { NavLink } from "react-router";

export function HomePage() {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-2">
      <header className="flex justify-between px-8">
        <div className="flex flex-col gap-1">
          <Label className="text-primary pt-1 text-xl font-bold">Oi,</Label>
          <Label className="font-mono text-xs font-bold">
            É hora de desafiar seus limites!
          </Label>
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/app/search">
            <Search className="text-primary h-5 w-5" />
          </NavLink>
          <NavLink to="/app/notifications">
            <Bell className="text-primary h-5 w-5" />
          </NavLink>
          <NavLink to="/app/settings">
            <UserCog className="text-primary h-5 w-5" />
          </NavLink>
          <ModeToggle />
        </div>
      </header>

      <NavigationMenu />
      <Recommendations />
      <DisplayWeeklyChallenge />
      <Articles />
    </div>
  );
}
