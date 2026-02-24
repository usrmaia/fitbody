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

export function SignUpPage() {
  return (
    <>
      <BackButtonNavigation title="Cadastrar" />

      <Label className="mt-16 justify-center text-center text-xl font-bold sm:mt-8">
        Bem-vindo!
      </Label>

      <form className="mt-16 sm:mt-12">
        <FieldSet className="bg-card w-full px-10 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                className="input input-bordered w-full"
              />
              <FieldDescription>
                Nunca compartilharemos seu email com mais ninguém.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirme sua senha
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirme sua senha"
                className="input input-bordered w-full"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Label className="mt-4 block flex-row px-11 text-center text-xs">
          Ao se cadastrar, você concorda com nossos{" "}
          <Link to="/terms" className="text-primary">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link to="/privacy" className="text-primary">
            Política de Privacidade
          </Link>
          .
        </Label>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="default"
            className="mt-4 w-44 rounded-full border font-bold backdrop-blur-md sm:mt-4"
          >
            Cadastrar
          </Button>
        </div>

        <Label className="mt-8 justify-center text-center text-xs">
          ou cadastre-se com sua conta do
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
          Já possui uma conta?
          <Link to="/app/auth/sign-in" className="text-primary">
            Entre aqui
          </Link>
        </Label>
      </form>
    </>
  );
}
