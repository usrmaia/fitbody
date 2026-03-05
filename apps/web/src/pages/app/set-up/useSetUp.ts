import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import {
  profileUserSchema,
  type ProfileUser,
  type Result,
} from "@/packages/schemas";
import { useProfile } from "@/store";

type ProfileFormInput = z.input<typeof profileUserSchema>;
type ProfileFormOutput = z.output<typeof profileUserSchema>;

export type SetUpFormType = z.infer<typeof profileUserSchema>;

export type SetUpProps = {
  form: ReturnType<typeof useSetUp>;
};

export const useSetUp = () => {
  const { data: userSession } = authClient.useSession();
  const { profile, postProfile, putProfile } = useProfile();

  const formSetup = useForm<ProfileFormInput, unknown, ProfileFormOutput>({
    resolver: zodResolver(profileUserSchema),
    defaultValues: {
      weightKg: 70,
      weightUnit: "KG",
      heightCm: 170,
      heightUnit: "CM",
      ...profile,
      birthDate: profile?.birthDate
        ? new Date(profile.birthDate).toISOString().split("T")[0]
        : undefined,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SetUpFormType) => {
    if (data.weightUnit === "LB" && data.weightKg)
      data.weightKg = data.weightKg * 0.453592; // Converter libras para kg

    let res: Result<ProfileUser>;
    if (profile?.userId)
      res = await putProfile(profile.userId, data, { include: { user: true } });
    else
      res = await postProfile(userSession?.user.id || "", data, {
        include: { user: true },
      });

    if (res.error) {
      formSetup.setError("root", { message: res.error.errors.join(", ") });
      return;
    }

    navigate("/app/home");
  };

  return { ...formSetup, onSubmit };
};
