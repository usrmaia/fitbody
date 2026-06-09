import { Plus } from "lucide-react";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Separator,
} from "@/components/ui";
import type { Exercise, WorkoutSession } from "@/packages/schemas";
import { WorkoutSessionForm } from "./[workoutSessionId]/form";

export function WorkoutSessionDialog({
  userId,
  workoutDayId,
  prevWorkoutSession,
}: {
  userId: string;
  workoutDayId: string;
  prevWorkoutSession?: WorkoutSession;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Adicionar Sessão de Treino
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Adicionar Sessão de Treino
          </DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <WorkoutSessionForm
            mode="add"
            userId={userId}
            workoutDayId={workoutDayId}
            prevWorkoutSession={prevWorkoutSession}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

import defaultExerciseThumbnail from "@/assets/images/default-exercise.jpg";

export function WorkoutSessionDetails({
  workoutSession,
}: {
  workoutSession: WorkoutSession;
}) {
  const workoutSets = workoutSession.workoutSets.filter(
    (currentSet, index, sets) => {
      if (index === 0) return true;

      const currentExerciseName =
        currentSet.exercise?.name?.trim().toLowerCase() || "";
      const previousExerciseName =
        sets[index - 1].exercise?.name?.trim().toLowerCase() || "";

      return currentExerciseName !== previousExerciseName;
    },
  );

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg font-bold">
        {workoutSession.workoutDay?.dayCode}
      </Label>
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <Label className="text-foreground/70 text-sm font-medium">
            Tempo
          </Label>
          <Label className="text-sm">
            {workoutSession.endedAt
              ? workoutSession.endedAt.getTime() -
                workoutSession.startedAt.getTime()
              : "-"}
          </Label>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Label className="text-foreground/70 text-sm font-medium">
            Volume
          </Label>
          <Label className="text-sm">
            {workoutSession.workoutSets
              .map((ws) => ws.reps && ws.weightKg && ws.reps * ws.weightKg)
              .filter((ws) => typeof ws === "number")
              .reduce((acc, cur) => acc + cur, 0)}
          </Label>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {workoutSets.slice(0, 3).map((workoutSet, index) => (
          <ExerciseItem key={index} exercise={workoutSet.exercise!} />
        ))}
        {workoutSets.length > 3 && (
          <Accordion type="multiple" className="bg-card mt-5 w-full px-8 py-5">
            <AccordionItem value="more-exercises">
              <AccordionTrigger>
                Ver mais ({workoutSession.workoutSets.length - 3}) exercícios
              </AccordionTrigger>
              <AccordionContent>
                {workoutSets.slice(3).map((workoutSet, index) => (
                  <ExerciseItem key={index} exercise={workoutSet.exercise!} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}

function ExerciseItem({ exercise }: { exercise: Exercise }) {
  return (
    <div className="flex gap-2">
      <Avatar size="sm">
        <AvatarImage
          src={exercise.image || defaultExerciseThumbnail}
          alt={exercise.name || "Exercício"}
        />
      </Avatar>
      <Label>{exercise.name || "-"}</Label>
    </div>
  );
}
