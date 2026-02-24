import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from "@/components/ui";

const schema = z.object({
  display_name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  full_name: z
    .string()
    .min(3, "O nome completo deve ter pelo menos 3 caracteres"),
  bio: z
    .string()
    .max(160, "A bio deve ter no máximo 160 caracteres")
    .optional(),
  birthday: z.string().optional(),
});

export type SetUpFormType = z.infer<typeof schema>;

export function ProfileEditUserForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SetUpFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SetUpFormType) => {
    alert("Dados do formulário:" + JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex w-full flex-col items-center"
    >
      <FieldSet className="bg-card w-full px-8 py-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Nome de Exibição</FieldLabel>
            <Input
              {...register("display_name")}
              placeholder="Digite seu nome de exibição"
            />
            <FieldError errors={[{ message: errors.display_name?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Nome Completo</FieldLabel>
            <Input
              {...register("full_name")}
              placeholder="Digite seu nome completo"
            />
            <FieldError errors={[{ message: errors.full_name?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Input
              {...register("bio")}
              placeholder="Fale um pouco sobre você (máx. 160 caracteres)"
            />
            <FieldError errors={[{ message: errors.bio?.message }]} />
          </Field>

          <Field>
            <FieldLabel>Data de Nascimento</FieldLabel>
            <Input
              type="date"
              {...register("birthday")}
              placeholder="Digite sua data de nascimento"
            />
            <FieldError errors={[{ message: errors.birthday?.message }]} />
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" className="mt-10 w-52 rounded-full font-bold">
        Salvar
      </Button>
    </form>
  );
}
