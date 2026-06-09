import { Pencil, Trash, X } from "lucide-react";

import { BodyHighlighter } from "@/components";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Separator,
} from "@/components/ui";
import { ExerciseForm } from "./form";
import { useExerciseForm, type ExerciseFormProps } from "./useForm";
import {
  muscleGroupParcer,
  type Exercise,
  type ProfileUser,
} from "@/packages/schemas";

import defaultExerciseThumbnail from "@/assets/images/default-exercise.jpg";

export function ExerciseActionButtons(props: Omit<ExerciseFormProps, "mode">) {
  return (
    <div className="mt-5 px-8">
      <div className="flex w-full justify-end gap-4">
        <DialogEdit {...props} className="text-primary h-5 w-5" />
        <DialogDelete {...props} className="text-primary h-5 w-5" />
      </div>
    </div>
  );
}

export function DialogEdit({
  className,
  ...props
}: Omit<ExerciseFormProps, "mode"> & { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Editar Exercício</DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <ExerciseForm {...props} mode="edit" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogDelete({
  className,
  ...props
}: Omit<ExerciseFormProps, "mode"> & {
  className?: string;
}) {
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    onSubmit,
  } = useExerciseForm({ ...props, mode: "delete" });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Excluir Exercício</DialogTitle>
          <DialogDescription className="text-center">
            {isSubmitSuccessful
              ? "Exercício excluído com sucesso!"
              : "Tem certeza que deseja excluir este exercício? Esta ação não pode ser desfeita."}
          </DialogDescription>
          <Label className="text-destructive justify-center text-center text-sm">
            {errors.root?.message}
          </Label>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              {isSubmitSuccessful ? "Fechar" : "Cancelar"} <X />
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onSubmit}
            disabled={isSubmitting || isSubmitSuccessful}
          >
            {isSubmitSuccessful ? "Excluído" : "Excluir"} <Trash />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ExerciseDetails({
  exercise,
  profile,
}: {
  exercise: Exercise;
  profile?: ProfileUser;
}) {
  return (
    <>
      <div className="bg-card mt-5 px-8 py-5">
        {!exercise?.image && exercise?.video ? (
          <video
            src={exercise?.video}
            className="rounded-xl object-cover"
            style={{
              backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
            radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
            `,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            src={exercise?.image || defaultExerciseThumbnail}
            alt={exercise?.name}
            className="rounded-xl object-cover"
            style={{
              backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
            radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
            `,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </div>
      <Card className="m-0 mx-8 mt-6 mb-2 gap-0 p-0">
        <CardContent className="gap-2 p-2">
          <CardTitle>
            <Label className="justify-center text-center text-xl">
              {exercise?.name}
            </Label>
          </CardTitle>

          <Separator className="my-1" />

          <CardDescription className="flex flex-col items-center justify-center text-center text-sm font-light">
            {exercise?.exerciseMuscleGroups
              ?.flatMap((emg) => muscleGroupParcer(emg.muscleGroup))
              .join(" • ")
              .trim() || "Nenhum grupo muscular associado"}
          </CardDescription>

          <Separator className="mt-1 mb-2" />

          <BodyHighlighter
            exerciseMuscleGroup={exercise?.exerciseMuscleGroups || []}
            gender={profile?.gender}
          />

          <CardDescription className="text-card-foreground text-center text-xs font-light whitespace-pre-line">
            {exercise?.description}
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
