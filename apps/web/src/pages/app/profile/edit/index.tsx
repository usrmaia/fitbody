import { BackButtonNavigation, Label } from "@/components/ui";
import { AtSign, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import { ProfileEditUserForm } from "./user-form";
import { ProfileEditFitForm } from "./fit-form";

export function ProfileEditPage() {
  return (
    <div className="mt-5">
      <BackButtonNavigation title="Perfil" />
      <NavMenuItens />
      <ProfileEditUserForm />
      <ProfileEditFitForm />
    </div>
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
    <div className="mt-5 flex flex-col gap-4 px-8">
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
