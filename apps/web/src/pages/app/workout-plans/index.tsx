import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  BackButtonNavigation,
} from "@/components/ui";
import { useProfile, useWorkoutPlan } from "@/store";
import { DialogPlus, WorkoutPlanCard } from "./component";

export function WorkoutPlansPage() {
  const { profile } = useProfile();
  const { workoutPlans } = useWorkoutPlan();

  if (!profile) return null;

  const userWorkoutPlans = workoutPlans.filter(
    (workoutPlan) => workoutPlan.createdById === profile?.userId,
  );
  const otherWorkoutPlans = workoutPlans.filter(
    (workoutPlan) => workoutPlan.createdById !== profile?.userId,
  );

  return (
    <>
      <BackButtonNavigation title="Treinos" />
      <div className="px-8">
        <div className="flex w-full justify-end gap-4">
          <DialogPlus className="text-primary h-5 w-5" />
        </div>
        <Accordion
          type="multiple"
          className="bg-card mt-5 w-full px-8 py-5"
          defaultValue={[
            userWorkoutPlans.length > 0
              ? "user-workout-plans"
              : "other-workout-plans",
          ]}
        >
          <AccordionItem value="user-workout-plans">
            <AccordionTrigger>
              Meus Treinos ({userWorkoutPlans.length})
            </AccordionTrigger>
            <AccordionContent>
              {userWorkoutPlans.map((workoutPlan) => (
                <WorkoutPlanCard
                  key={workoutPlan.id}
                  workoutPlan={workoutPlan}
                  profile={profile}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="other-workout-plans">
            <AccordionTrigger>
              Outros Treinos ({otherWorkoutPlans.length})
            </AccordionTrigger>
            <AccordionContent>
              {otherWorkoutPlans.map((workoutPlan) => (
                <WorkoutPlanCard
                  key={workoutPlan.id}
                  workoutPlan={workoutPlan}
                  profile={profile}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
