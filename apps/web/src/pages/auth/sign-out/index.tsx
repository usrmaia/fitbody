import { NavLink, useNavigate } from "react-router";

import { BackButtonNavigation, Button, Label } from "@/components/ui";
import { authClient } from "@/lib/auth-client";

export function SignOutPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/auth/sign-in");
        },
      },
    });
  };

  return (
    <div className="mt-5 px-8">
      <BackButtonNavigation title="Sair da Conta" />

      <Label className="mt-5 text-center text-xl font-bold">
        Você tem certeza que deseja sair da sua conta?
      </Label>

      <div className="mt-5 flex flex-col items-center justify-center gap-4">
        <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
          Não, manter-me conectado
        </Button>
        <NavLink to="/auth/sign-in">
          <Button variant="destructive" size="lg" onClick={handleSignOut}>
            Sim, sair da minha conta
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
