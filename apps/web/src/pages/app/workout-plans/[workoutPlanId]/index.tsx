import { useNavigate } from "react-router";

import {
  BackButtonNavigation,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from "@/components/ui";
import { DialogCreateExerciseDay, DialogEdit } from "../component";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { useWorkoutPlanPage } from "./usePage";
import { useExercise } from "@/store";

export function WorkoutPlanPage() {
  const navigate = useNavigate();
  const { profile, workoutPlan, handleMoveDay } = useWorkoutPlanPage();
  const { exercises } = useExercise();

  if (!profile || !workoutPlan) return null;
  if (!workoutPlan.id) return null;

  return (
    <>
      <BackButtonNavigation title={workoutPlan.name} />
      <div className="flex w-full justify-end gap-4 px-8">
        <DialogEdit className="text-primary h-5 w-5" />
        <DialogCreateExerciseDay
          className="text-primary h-5 w-5"
          workoutPlanId={workoutPlan.id}
          exercises={exercises}
          profile={profile}
        />
      </div>
      <Carousel opts={{ align: "start" }} className="bg-card my-5 w-full px-6">
        <CarouselContent className="mx-0 w-full px-0">
          {workoutPlan.workoutDays?.map((day, index) => (
            <CarouselItem
              key={index}
              className="relative mx-0 w-full basis-3/5 px-2"
            >
              {workoutPlan.createdById === profile.userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="absolute top-3 right-0 z-10"
                    asChild
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <EllipsisVertical />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate(`workout-days/${day.id}`)}
                      >
                        <Pencil />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash />
                        Remover
                      </DropdownMenuItem>
                      {index < (workoutPlan.workoutDays?.length || 0) - 1 && (
                        <DropdownMenuItem
                          onClick={() => handleMoveDay(day.id!, "right")}
                        >
                          <ChevronRight />
                          Mover para direita
                        </DropdownMenuItem>
                      )}
                      {index > 0 && (
                        <DropdownMenuItem
                          onClick={() => handleMoveDay(day.id!, "left")}
                        >
                          <ChevronLeft />
                          Mover para esquerda
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div className="flex flex-col items-center">
                <Label className="mt-4 mb-4 text-lg font-bold">
                  {day.dayCode}
                </Label>
                <div className="flex w-full flex-col gap-4">
                  {day.workoutDayExercises
                    ?.filter(
                      (workoutDayExercise, index) =>
                        !(
                          day.workoutDayExercises &&
                          day.workoutDayExercises[index - 1] &&
                          day.workoutDayExercises[index - 1].exercise?.name !==
                            workoutDayExercise.exercise?.name
                        ) &&
                        !(
                          day.workoutDayExercises &&
                          day.workoutDayExercises[index + 1] &&
                          day.workoutDayExercises[index + 1].exercise?.name ===
                            workoutDayExercise.exercise?.name
                        ),
                    )
                    .map((workoutDayExercises, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg border p-4"
                      >
                        <div>
                          <Label className="text-sm font-semibold">
                            {workoutDayExercises.exercise?.name}
                          </Label>
                          {workoutDayExercises.exercise?.video ? (
                            <video
                              src={workoutDayExercises.exercise?.video}
                              controls
                              className="mt-2 h-48 w-full rounded-lg object-cover"
                            />
                          ) : (
                            workoutDayExercises.exercise?.image && (
                              <img
                                src={
                                  workoutDayExercises.exercise?.image ||
                                  "/placeholder.png"
                                }
                                alt={workoutDayExercises.exercise?.name}
                              />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
