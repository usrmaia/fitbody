import { AtSign, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

import { BackButtonNavigation, Label } from "@/components/ui";
import { ProfileEditFitForm } from "./fit-form";
import { ProfileEditUserForm } from "./user-form";

export function ProfileEditPage() {
  return (
    <>
      <BackButtonNavigation title="Perfil" />
      <NavMenuItens />
      <ProfileEditUserForm />
      <ProfileEditFitForm />
    </>
  );
}

function NavMenuItens() {
  const menuItems = [
    {
      label: "Alterar Email",
      item: <AtSign className="h-5 w-5" />,
      to: "/app/profile/edit/email",
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-8">
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className="relative flex items-center gap-5"
        >
          {item.item}
          <Label className="font-mono">{item.label}</Label>
          <ChevronRight className="absolute right-2 h-5 w-5" />
        </NavLink>
      ))}
    </div>
  );
}
