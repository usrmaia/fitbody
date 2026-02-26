import {
  BackButtonNavigation,
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
} from "@/components/ui";

export function ForgotPasswordPage() {
  return (
    <>
      <BackButtonNavigation title="Recuperar Senha" />

      <Label className="mt-16 justify-center text-center text-xl font-bold sm:mt-8">
        Esqueceu sua senha?
      </Label>
      <Label className="text-muted-foreground mt-6 justify-center px-8 text-center text-sm leading-relaxed lg:mt-4">
        Insira seu email para receber um link de recuperação de senha. Verifique
        sua caixa de entrada e siga as instruções para redefinir sua senha.
      </Label>

      <form className="mt-16 sm:mt-12">
        <FieldSet className="bg-card w-full px-8 py-6">
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
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="default"
            className="mt-4 w-44 rounded-full border font-bold backdrop-blur-md sm:mt-4"
          >
            Enviar
          </Button>
        </div>
      </form>
    </>
  );
}
