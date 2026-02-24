import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

import {
  BackButtonNavigation,
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
} from "@/components/ui";

export function SignInPage() {
  return (
    <>
      <BackButtonNavigation title="Entrar" />

      <Label className="mt-16 justify-center text-center text-xl font-bold sm:mt-8">
        Bem-vindo de volta!
      </Label>
      <Label className="text-muted-foreground mt-6 justify-center px-11 text-center text-sm leading-relaxed lg:mt-4">
        Acesse sua conta para acompanhar seus treinos e progresso. Registre
        exercícios, alcance suas metas e evolua constantemente!
      </Label>

      <form className="mt-16 sm:mt-12">
        <FieldSet className="bg-card w-full px-10 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="input input-bordered w-full"
              />
              <FieldDescription className="text-right">
                <Link to="/app/auth/forgot-password" className="text-primary">
                  Esqueceu sua senha?
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="default"
            className="mt-8 w-44 rounded-full border font-bold backdrop-blur-md sm:mt-4"
          >
            Entrar
          </Button>
        </div>

        <Label className="mt-8 justify-center text-center text-xs">
          ou entre com sua conta do
        </Label>

        <div className="mt-4 flex justify-center gap-4 sm:mt-2">
          <div className="bg-primary rounded-xl p-2">
            <FaGoogle className="text-primary-foreground" />
          </div>
          <div className="bg-primary rounded-xl p-2">
            <FaGithub className="text-primary-foreground" />
          </div>
          <div className="bg-primary rounded-xl p-2">
            <FaLinkedin className="text-primary-foreground" />
          </div>
        </div>

        <Label className="mt-8 justify-center text-center text-xs">
          Não possui uma conta?
          <Link to="/app/auth/sign-up" className="text-primary">
            Cadastre-se
          </Link>
        </Label>
      </form>
    </>
  );
}
