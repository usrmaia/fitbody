import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

import { profileUserSchema, userSchema } from "@/packages/schemas";
import { useProfile } from "@/store";

type UserFormInput = z.input<typeof userSchema>;
type UserFormOutput = z.output<typeof userSchema>;
type ProfileFormInput = z.input<typeof profileUserSchema>;
type ProfileFormOutput = z.output<typeof profileUserSchema>;

export type SetUpProps = {
  form: ReturnType<typeof useEditProfile>;
};

export const useEditProfile = () => {
  const { profile, putUser, putProfile } = useProfile();

  const profileForm = useForm<ProfileFormInput, unknown, ProfileFormOutput>({
    resolver: zodResolver(profileUserSchema),
    values: {
      ...profile,
      birthDate: profile?.birthDate
        ? new Date(profile.birthDate).toISOString().split("T")[0]
        : undefined,
    } as unknown as ProfileFormOutput,
  });

  const onProfileSubmit = async (data: ProfileFormOutput) => {
    const res = await putProfile(profile!.userId, data, {
      include: { user: true },
    });

    if (!res.success)
      profileForm.setError("root", { message: res.error?.errors.join(", ") });
  };

  const userForm = useForm<UserFormInput, unknown, UserFormOutput>({
    resolver: zodResolver(userSchema),
    values: profile?.user as UserFormOutput,
  });

  const onUserSubmit = async (data: UserFormOutput) => {
    const res = await putUser(profile!.userId, data);

    if (!res.success)
      userForm.setError("root", { message: res.error?.errors.join(", ") });
  };

  return { profileForm, userForm, onProfileSubmit, onUserSubmit };
};
