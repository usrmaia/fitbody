import {
  BackButtonNavigation,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useProfile, useWorkoutPlan, useWorkoutSession } from "@/store";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { WorkoutSessionForm } from "./[workoutSessionId]/form";
import { NavLink } from "react-router";

export function WorkoutSessionsPage() {
  const { profile } = useProfile();

  const { workoutPlans } = useWorkoutPlan();
  const { workoutSessions } = useWorkoutSession();
  const [workoutPlanId, setWorkoutPlanId] = useState<string | undefined>();
  const [workoutDayId, setWorkoutDayId] = useState<string | undefined>();

  if (!profile || !profile.userId) return null;

  if (workoutPlans.length === 0)
    return (
      <>
        <BackButtonNavigation title="" />
        <div className="mt-5 flex w-full flex-col justify-end gap-4 overflow-x-auto px-8">
          <Label className="text-center">
            Ops! Parece que você não possui nenhum treino disponível. Crie ou
            clone um treino para começar a registrar suas sessões de treino.
          </Label>
          <NavLink to="/app/workout-plans/new" className="w-full">
            <Button variant="link" className="w-full">
              Adicionar Treino
              <Plus className="mr-2 h-4 w-4" />
            </Button>
          </NavLink>
        </div>
      </>
    );

  return (
    <>
      <BackButtonNavigation title="" />
      <div className="flex w-full justify-end gap-4 px-8">
        <Search className="text-primary h-5 w-5" />
      </div>
      <div className="mt-5 flex w-full flex-col justify-end gap-4 overflow-x-auto px-8">
        <Select value={workoutPlanId} onValueChange={setWorkoutPlanId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o treino" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Treinos</SelectLabel>
              {workoutPlans.map((wp) => (
                <SelectItem key={wp.id} value={wp.id!}>
                  {wp.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {workoutPlanId && (
          <Select
            value={workoutDayId}
            onValueChange={(value) => {
              setWorkoutDayId(value);
              useWorkoutPlan.setState({
                workoutDay: workoutPlans
                  .find((wp) => wp.id === workoutPlanId)
                  ?.workoutDays?.find((wd) => wd.id === value),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o dia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Dias</SelectLabel>
                {workoutPlans
                  .find((wp) => wp.id === workoutPlanId)
                  ?.workoutDays?.map((wd) => (
                    <SelectItem key={wd.id} value={wd.id!}>
                      {wd.dayCode}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {workoutPlanId && workoutDayId && (
          <DialogPlus userId={profile.userId} workoutDayId={workoutDayId} />
        )}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 px-8">
        {workoutSessions.map((workoutSession) => (
          <pre key={workoutSession.id}>
            {JSON.stringify(workoutSession, null, 2)}
          </pre>
        ))}
      </div>
    </>
  );
}

export function DialogPlus({
  userId,
  workoutDayId,
}: {
  userId: string;
  workoutDayId: string;
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
          <DialogTitle className="text-center">Adicionar Exercício</DialogTitle>
        </DialogHeader>
        <div className="xs:px-0 mx-3 max-h-[70vh] overflow-y-auto px-12">
          <WorkoutSessionForm
            mode="add"
            userId={userId}
            workoutDayId={workoutDayId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
