import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from "@/components/ui";
import { useEditProfile } from "./useEditProfile";

export function ProfileEditUserForm() {
  const { userForm, onUserSubmit } = useEditProfile();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = userForm;

  return (
    <form
      onSubmit={handleSubmit(onUserSubmit)}
      className="mt-10 flex w-full flex-col items-center"
    >
      <FieldSet className="bg-card w-full px-8 py-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Nome</FieldLabel>
            <Input {...register("name")} placeholder="Digite seu nome" />
            <FieldError errors={[{ message: errors.name?.message }]} />
          </Field>
        </FieldGroup>

        <FieldError errors={[{ message: errors.root?.message }]} />
      </FieldSet>

      <Button type="submit" className="mt-10 w-52 rounded-full font-bold">
        Salvar
      </Button>
    </form>
  );
}
