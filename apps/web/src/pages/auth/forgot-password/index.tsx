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

      <Label className="justify-center text-center text-xl font-bold">
        Esqueceu sua senha?
      </Label>
      <Label className="text-muted-foreground mt-6 justify-center px-8 text-center text-sm leading-relaxed lg:mt-4">
        Insira seu email para receber um link de recuperação de senha. Verifique
        sua caixa de entrada e siga as instruções para redefinir sua senha.
      </Label>

      <form className="mt-5">
        <FieldSet className="bg-card w-full px-8 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
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
            className="mt-4 w-44 rounded-full border font-bold backdrop-blur-md"
          >
            Enviar
          </Button>
        </div>
      </form>
    </>
  );
}
