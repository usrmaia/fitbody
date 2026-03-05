import {
  Bell,
  ChevronRight,
  CircleQuestionMark,
  Headset,
  Key,
  LockKeyhole,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { NavLink } from "react-router";

import {
  BackButtonNavigation,
  Button,
  Label,
  Separator,
} from "@/components/ui";
import { useProfile } from "@/store";

import defaultUserImage from "@/assets/images/default-avatar-user.jpg";

export function SettingsPage() {
  return (
    <>
      <UserProfileHeader />
      <NavMenuItens />
    </>
  );
}

function UserProfileHeader() {
  const { profile } = useProfile();

  return (
    <header className="bg-card flex flex-col px-8 pb-4">
      <BackButtonNavigation title="Perfil" />
      {!profile && (
        <NavLink to="/app/set-up" className="flex">
          <Button className="w-full">
            Adicionar Perfil <Plus />
          </Button>
        </NavLink>
      )}
      {profile && (
        <>
          <div className="flex flex-col items-center">
            <img
              src={profile?.user?.image || defaultUserImage}
              alt="User Avatar"
              className="h-24 w-24 rounded-full"
            />
            <Label className="mt-1 text-xl font-bold">
              {profile?.user?.name}
            </Label>
            <Label className="text-xs font-light">{profile?.user?.email}</Label>
            <Label className="text-xs font-semibold">
              Aniv:{" "}
              <span className="font-light">
                {new Date(profile?.birthDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </span>
            </Label>
          </div>
          <div className="flex items-center justify-evenly rounded-md border p-4">
            <div className="flex flex-col items-center gap-1">
              <Label className="font-mono font-semibold">
                {profile?.weightKg} {profile?.weightUnit}
              </Label>
              <Label className="font-mono font-light">Peso</Label>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center gap-1">
              <Label className="font-mono font-semibold">
                {profile?.birthDate &&
                  Math.floor(
                    (new Date().getTime() -
                      new Date(profile.birthDate).getTime()) /
                      (1000 * 60 * 60 * 24 * 365),
                  )}
              </Label>
              <Label className="font-mono font-light">Idade</Label>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center gap-1">
              <Label className="font-mono font-semibold">
                {profile?.heightCm} {profile?.heightUnit}
              </Label>
              <Label className="font-mono font-light">Altura</Label>
            </div>
          </div>
        </>
      )}
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
      to: "/auth/reset-password",
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
      to: "/auth/sign-out",
    },
  ];

  return (
    <div className="mt-10 flex flex-col gap-4 px-8">
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
