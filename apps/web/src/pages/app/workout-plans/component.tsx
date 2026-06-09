import { EllipsisVertical, Pencil, Plus, Trash, X } from "lucide-react";
import { NavLink } from "react-router";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from "@/components/ui";
import type { Exercise, Profile, WorkoutPlan } from "@/packages/schemas";

import defaultDefaultWorkoutPlanThumbnail from "@/assets/images/default-workout-plan.jpg";
import { WorkoutPlanForm } from "./form";
import { useWorkoutPlan } from "@/store";
import { WorkoutDayForm } from "./[workoutPlanId]/workout-days/[workoutDayId]/form";

export function WorkoutPlanCard({
  workoutPlan,
  profile,
}: {
  workoutPlan: WorkoutPlan;
  profile: Profile;
}) {
  const { deleteWorkoutPlan } = useWorkoutPlan();

  return (
    <Card className="relative m-0 mb-4 gap-0 p-0">
      {workoutPlan.createdById === profile.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-0 right-0 z-10" asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <EllipsisVertical />
              <span className="sr-only">Edit</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => deleteWorkoutPlan(workoutPlan.id!)}
              >
                <Trash />
                Remover
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <NavLink to={`/app/workout-plans/${workoutPlan.id}`}>
        <CardHeader className="relative m-0 gap-0 p-0">
          {!workoutPlan.image && workoutPlan.video ? (
            <video
              src={workoutPlan.video}
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
              src={workoutPlan.image || defaultDefaultWorkoutPlanThumbnail}
              alt={workoutPlan.name}
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
            <Label className="text-xs">{workoutPlan.name}</Label>
          </CardTitle>
          <CardDescription className="mt-1 flex flex-row justify-between">
            <Label className="text-xs">{workoutPlan.description}</Label>
          </CardDescription>
        </CardContent>
      </NavLink>
    </Card>
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
          <DialogTitle className="text-center">
            Adicionar Plano de Treino
          </DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <WorkoutPlanForm mode="add" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogEdit({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Editar Plano de Treino
          </DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <WorkoutPlanForm mode="edit" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogCreateExerciseDay({
  workoutPlanId,
  exercises,
  profile,
  className,
}: {
  workoutPlanId: string;
  exercises: Exercise[];
  profile: Profile;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className={className} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Adicionar Dia de Exercício
          </DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <WorkoutDayForm
            mode="add"
            workoutPlanId={workoutPlanId}
            exercises={exercises}
            profile={profile}
          />
          <DialogClose asChild>
            <Button type="button" variant="outline" className="mt-4 w-full">
              Cancelar <X />
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
