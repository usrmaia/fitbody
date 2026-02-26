import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

import {
  BackButtonNavigation,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
} from "@/components/ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "O nome deve conter no mínimo 2 caracteres" }),
    email: z.email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve conter no mínimo 8 caracteres" })
      .max(27, { message: "A senha deve conter no máximo 27 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpFormType = z.infer<typeof signUpSchema>;

export function SignUpPage() {
  const {
    formState: { errors, isSubmitting },
    clearErrors,
    handleSubmit,
    register,
    setError,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUpSubmit = handleSubmit(async ({ name, email, password }) => {
    clearErrors("root.serverError");

    await authClient.signUp.email(
      { email, name, password, callbackURL: "/auth/sign-in" },
      {
        onError(context) {
          const code = context?.error.code || "unknown_error";
          setError("root.serverError", {
            type: "server",
            message:
              code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
                ? "O email já está em uso. Tente outro."
                : "Ocorreu um erro ao cadastrar. Tente novamente.",
          });
          console.error("Erro ao cadastrar:", code);
        },
      },
    );
  });

  return (
    <>
      <BackButtonNavigation title="Cadastrar" />

      <Label className="mt-16 justify-center text-center text-xl font-bold sm:mt-8">
        Bem-vindo!
      </Label>

      <form className="mt-16 sm:mt-12" onSubmit={handleSignUpSubmit}>
        <FieldSet className="bg-card w-full px-8 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                className="input input-bordered w-full"
                {...register("name")}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                className="input input-bordered w-full"
                {...register("email")}
              />
              <FieldDescription>
                Nunca compartilharemos seu email com mais ninguém.
              </FieldDescription>
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="input input-bordered w-full"
                {...register("password")}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirme sua senha
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                className="input input-bordered w-full"
                {...register("confirmPassword")}
              />
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </Field>
          </FieldGroup>

          <FieldError>{errors.root?.serverError?.message}</FieldError>
        </FieldSet>

        <Label className="mt-4 block flex-row px-8 text-center text-xs">
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
            disabled={isSubmitting}
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
          <Link to="/auth/sign-in" className="text-primary">
            Entre aqui
          </Link>
        </Label>
      </form>
    </>
  );
}
