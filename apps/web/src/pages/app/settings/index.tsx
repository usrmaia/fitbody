import {
  Bell,
  ChevronRight,
  CircleQuestionMark,
  Headset,
  Key,
  LockKeyhole,
  LogOut,
  User,
} from "lucide-react";
import { NavLink } from "react-router";

import { BackButtonNavigation, Label, Separator } from "@/components/ui";

import defaultUserImage from "@/assets/images/default-avatar-user.jpg";

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-2">
      <UserProfileHeader />
      <NavMenuItens />
    </div>
  );
}

function UserProfileHeader() {
  return (
    <header className="bg-card mb-8 flex flex-col gap-2 px-8 pt-5 pb-2">
      <BackButtonNavigation title="Perfil" />
      <div className="mt-1 flex flex-col items-center">
        <img
          src={defaultUserImage}
          alt="User Avatar"
          className="h-24 w-24 rounded-full"
        />
        <Label className="mt-1 text-xl font-bold">Nome de Usuário</Label>
        <Label className="text-xs font-light">usuario@email.com</Label>
        <Label className="text-xs font-semibold">
          Aniv: <span className="font-light">01 de Janeiro</span>
        </Label>
      </div>
      <div className="flex items-center justify-evenly rounded-md border p-4">
        <div className="flex flex-col items-center gap-1">
          <Label className="font-mono font-semibold">75 kg</Label>
          <Label className="font-mono font-light">Peso</Label>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center gap-1">
          <Label className="font-mono font-semibold">28</Label>
          <Label className="font-mono font-light">Idade</Label>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center gap-1">
          <Label className="font-mono font-semibold">1,75 m</Label>
          <Label className="font-mono font-light">Altura</Label>
        </div>
      </div>
    </header>
  );
}

function NavMenuItens() {
  const menuItems = [
    {
      label: "Editar Perfil",
      item: <User className="h-5 w-5" />,
      to: "/app/profile/edit",
    },
    {
      label: "Configurações de Privacidade",
      item: <LockKeyhole className="h-5 w-5" />,
      to: "/app/profile/privacy",
    },
    {
      label: "Notificações",
      item: <Bell className="h-5 w-5" />,
      to: "/app/settings/notifications",
    },
    {
      label: "Redefinir Senha",
      item: <Key className="h-5 w-5" />,
      to: "/app/auth/reset-password",
    },
    {
      label: "Suporte",
      item: <Headset className="h-5 w-5" />,
      to: "/app/support",
    },
    {
      label: "FAQ",
      item: <CircleQuestionMark className="h-5 w-5" />,
      to: "/app/faq",
    },
    {
      label: "Sair da Conta",
      item: <LogOut className="h-5 w-5" />,
      to: "/app/auth/sign-out",
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
