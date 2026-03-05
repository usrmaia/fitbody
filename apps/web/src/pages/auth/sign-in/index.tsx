import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

import {
  BackButtonNavigation,
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
} from "@/components/ui";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve conter no mínimo 6 caracteres" }),
  rememberMe: z.boolean().optional(),
});

type SignInFormType = z.infer<typeof signInSchema>;

export function SignInPage() {
  const {
    formState: { errors, isSubmitting },
    clearErrors,
    handleSubmit,
    register,
    control,
    setError,
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      rememberMe: true,
    },
  });

  const handleSignInSubmit = handleSubmit(
    async ({ email, password, rememberMe }) => {
      clearErrors("root.serverError");

      await authClient.signIn.email(
        { email, password, rememberMe, callbackURL: "/app/home" },
        {
          onError() {
            setError("root.serverError", {
              type: "server",
              message: "Ocorreu um erro ao fazer login. Tente novamente.",
            });
          },
        },
      );
    },
  );

  return (
    <>
      <BackButtonNavigation title="Entrar" />

      <Label className="justify-center text-center text-xl font-bold">
        Bem-vindo de volta!
      </Label>
      <Label className="text-muted-foreground mt-5 justify-center px-8 text-center text-sm leading-relaxed">
        Acesse sua conta para acompanhar seus treinos e progresso. Registre
        exercícios, alcance suas metas e evolua constantemente!
      </Label>

      <form className="mt-5" onSubmit={handleSignInSubmit}>
        <FieldSet className="bg-card w-full px-8 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                autoComplete="email"
                placeholder="Digite seu email"
                {...register("email")}
              />
              <FieldError errors={[{ message: errors.email?.message }]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                autoComplete="current-password"
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
              />
              <FieldError errors={[{ message: errors.password?.message }]} />
            </Field>

            <Field orientation="horizontal">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                )}
              />
              <FieldLabel htmlFor="rememberMe">Lembrar-me</FieldLabel>
              <FieldDescription className="text-right">
                <Link to="/auth/forgot-password" className="text-primary">
                  Esqueceu sua senha?
                </Link>
              </FieldDescription>
            </Field>
            <FieldError errors={[{ message: errors.rememberMe?.message }]} />
          </FieldGroup>

          <FieldError>{errors.root?.serverError?.message}</FieldError>
        </FieldSet>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-4 w-44 rounded-full border font-bold backdrop-blur-md"
            disabled={isSubmitting}
          >
            Entrar
          </Button>
        </div>

        <Label className="mt-8 justify-center text-center text-xs">
          ou entre com sua conta do
        </Label>

        <div className="mt-4 flex justify-center gap-4">
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
          <Link to="/auth/sign-up" className="text-primary">
            Cadastre-se
          </Link>
        </Label>
      </form>
    </>
  );
}
