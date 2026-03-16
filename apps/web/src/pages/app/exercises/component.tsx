import { Plus, Search } from "lucide-react";
import { NavLink } from "react-router";

import { ExerciseForm } from "./[exerciseId]/form";
import {
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from "@/components/ui";
import { muscleGroupParcer, type Exercise } from "@/packages/schemas";
import { ExercisesSearchForm } from "./searchForm";

import defaultExerciseThumbnail from "@/assets/images/default-exercise.jpg";

export function ExerciseAvatar({ exercise }: { exercise: Exercise }) {
  return (
    <div className="flex gap-4">
      <Avatar size="lg">
        <AvatarImage
          src={exercise.image || defaultExerciseThumbnail}
          alt={exercise.name}
          className="h-24 w-full rounded-t-xl object-cover"
          style={{
            backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
          radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%),
          `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Avatar>
      <Label className="text-sm">{exercise.name}</Label>
    </div>
  );
}

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const muscleGroups =
    exercise.exerciseMuscleGroups
      ?.filter((emg) => emg.role === "PRIMARY")
      .flatMap((emg) => muscleGroupParcer(emg.muscleGroup))
      .slice(0, 2)
      .concat(
        exercise.exerciseMuscleGroups
          ?.filter((emg) => emg.role === "SECONDARY")
          .flatMap((emg) => muscleGroupParcer(emg.muscleGroup))
          .slice(0, 1),
      )
      .join(", ") || "Sem grupo muscular";

  return (
    <Card className="m-0 gap-0 p-0">
      <NavLink to={`/app/exercises/${exercise.id}`}>
        <CardHeader className="relative m-0 gap-0 p-0">
          {!exercise.image && exercise.video ? (
            <video
              src={exercise.video}
              className="h-24 w-full rounded-t-xl object-cover"
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
              src={exercise.image || defaultExerciseThumbnail}
              alt={exercise.name}
              className="h-24 w-full rounded-t-xl object-cover"
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
        </CardHeader>
        <CardContent className="gap-2 p-2">
          <CardTitle>
            <Label className="text-xs">{exercise.name}</Label>
          </CardTitle>
          <CardDescription className="mt-1 flex flex-row justify-between">
            <Label className="text-xs">{muscleGroups}</Label>
          </CardDescription>
        </CardContent>
      </NavLink>
    </Card>
  );
}

export function DialogSearch({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Search className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Buscar Exercício</DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <ExercisesSearchForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogPlus({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Adicionar Exercício</DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <ExerciseForm mode="add" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
