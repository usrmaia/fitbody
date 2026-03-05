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

export function ResetPasswordPage() {
  return (
    <>
      <BackButtonNavigation title="Redefinir Senha" />

      <Label className="justify-center text-center text-xl font-bold">
        Redefinir sua senha
      </Label>
      <Label className="text-muted-foreground mt-5 justify-center px-8 text-center text-sm leading-relaxed">
        Insira sua nova senha e o token de redefinição que você recebeu por
        email. Certifique-se de escolher uma senha forte para proteger sua
        conta.
      </Label>

      <form className="mt-5">
        <FieldSet className="bg-card w-full px-8 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Nova Senha</FieldLabel>
              <Input
                autoComplete="none"
                placeholder="Digite sua nova senha"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar Nova Senha
              </FieldLabel>
              <Input
                autoComplete="none"
                placeholder="Confirme sua nova senha"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="token">Token de Redefinição</FieldLabel>
              <Input
                placeholder="Digite o token recebido por email"
                className="input input-bordered w-full"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="default"
            className="mt-5 w-44 rounded-full border font-bold backdrop-blur-md"
          >
            Redefinir Senha
          </Button>
        </div>
      </form>
    </>
  );
}
