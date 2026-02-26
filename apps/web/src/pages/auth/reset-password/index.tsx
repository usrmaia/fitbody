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

      <Label className="mt-16 justify-center text-center text-xl font-bold sm:mt-8">
        Redefinir sua senha
      </Label>
      <Label className="text-muted-foreground mt-6 justify-center px-8 text-center text-sm leading-relaxed lg:mt-4">
        Insira sua nova senha e o token de redefinição que você recebeu por
        email. Certifique-se de escolher uma senha forte para proteger sua
        conta.
      </Label>

      <form className="mt-16 sm:mt-12">
        <FieldSet className="bg-card w-full px-8 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Nova Senha</FieldLabel>
              <Input
                id="new-password"
                type="password"
                placeholder="Digite sua nova senha"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar Nova Senha
              </FieldLabel>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirme sua nova senha"
                className="input input-bordered w-full"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="token">Token de Redefinição</FieldLabel>
              <Input
                id="token"
                type="text"
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
            className="mt-4 w-44 rounded-full border font-bold backdrop-blur-md sm:mt-4"
          >
            Redefinir Senha
          </Button>
        </div>
      </form>
    </>
  );
}
