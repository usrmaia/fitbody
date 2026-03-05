import Body, { type ExtendedBodyPart, type Slug } from "@/lib/body-highlighter";
import type {
  ExerciseMuscleGroup,
  Gender,
  MuscleGroup,
  MuscleGroupRole,
} from "@/packages/schemas";

type Props = {
  exerciseMuscleGroup: ExerciseMuscleGroup[];
  double?: boolean;
  gender?: Gender;
};

const muscleGroupToBodyPartSlug: { [key in MuscleGroup]: Slug[] } = {
  ABDUCTORS: ["gluteal"],
  ABS: ["abs", "obliques"],
  ADDUCTORS: ["adductors"],
  BICEPS: ["biceps"],
  CALVES: ["calves"],
  CHEST: ["chest", "deltoids"],
  FOREARMS_EXTENSORS: ["forearm"],
  FOREARMS_FLEXORS: ["forearm"],
  GLUTES: ["gluteal"],
  HAMSTRINGS: ["hamstring"],
  HIP_FLEXORS: ["quadriceps"],
  LOWER_BACK: ["lower-back"], // lombar
  MID_BACK: ["upper-back", "trapezius", "deltoids"],
  QUADS: ["quadriceps", "adductors"],
  SHOULDERS: ["deltoids"],
  TRAPEZIUS: ["trapezius"],
  TRICEPS: ["triceps"],
  UPPER_BACK: ["upper-back", "deltoids"],
};

const muscleGroupRoleToIntensity: { [key in MuscleGroupRole]: number } = {
  PRIMARY: 1,
  SECONDARY: 2,
  STABILIZER: 3,
  EMPHASIS: 1,
};

const muscleGroupToSide: { [key in MuscleGroup]: ("front" | "back")[] } = {
  ABDUCTORS: ["back"],
  ABS: ["front"],
  ADDUCTORS: ["front", "back"],
  BICEPS: ["front"],
  CALVES: ["back"],
  CHEST: ["front"],
  FOREARMS_EXTENSORS: ["back"],
  FOREARMS_FLEXORS: ["front"],
  GLUTES: ["back"],
  HAMSTRINGS: ["back"],
  HIP_FLEXORS: ["front"],
  LOWER_BACK: ["back"], // lombar
  MID_BACK: ["back"],
  QUADS: ["front", "back"],
  SHOULDERS: ["front", "back"],
  TRAPEZIUS: ["back"],
  TRICEPS: ["back"],
  UPPER_BACK: ["back"],
};

export function BodyHighlighter({
  exerciseMuscleGroup,
  gender = "MALE",
}: Props) {
  const data: ExtendedBodyPart[] = exerciseMuscleGroup.flatMap((emg) => {
    const slugs = muscleGroupToBodyPartSlug[emg.muscleGroup];
    const intensity = muscleGroupRoleToIntensity[emg.role];
    return slugs.map((slug) => ({ slug, intensity }));
  });
  const sides = [
    ...new Set(
      exerciseMuscleGroup.flatMap((emg) => muscleGroupToSide[emg.muscleGroup]),
    ),
  ];
  const normalizedGender = gender === "MALE" ? "male" : "female";

  return (
    <div className="flex flex-row items-center justify-center">
      {sides.length === 2 ? (
        <>
          <Body data={data} gender={normalizedGender} side="front" />
          <Body data={data} gender={normalizedGender} side="back" />
        </>
      ) : (
        <Body data={data} gender={normalizedGender} side={sides[0]} />
      )}
    </div>
  );
}
