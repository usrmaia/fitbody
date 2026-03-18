import { Plus } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type { WorkoutSession } from "@/packages/schemas";
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
