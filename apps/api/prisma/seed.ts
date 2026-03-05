import { DayFocus, DayType, PrismaClient, Visibility } from "@prisma/client";
import { getDefault } from "./default";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando o seed...");

  let users = await prisma.user.findMany();

  if (users.length === 0)
    users = await prisma.user.createManyAndReturn({
      data: [
        {
          name: "FitBody",
          email: "fitbody.app@fitbody.com",
        },
      ],
    });

  const fitBodyUser = users.find((u) => u.email === "fitbody.app@fitbody.com");

  if (!fitBodyUser)
    throw new Error("Usuário FitBody não encontrado após criação.");

  console.log("✅ Usuário FitBody criado com sucesso!");

  const { defaultExerciseData } = getDefault(fitBodyUser.id);

  const exercisesList = await prisma.exercise.findMany({
    where: { createdById: fitBodyUser.id },
  });

  console.log(
    "✅ Exercícios existentes no banco de dados:",
    exercisesList.length,
  );

  // Deleta os exercícios que não estão mais presentes no defaultExerciseData
  const exercisesDeleted = await Promise.all(
    exercisesList
      .filter(
        (e) =>
          !defaultExerciseData.some(
            (de) => de.name === e.name && de.createdById === e.createdById,
          ),
      )
      .map(
        async (e) =>
          await prisma.exercise.delete({
            where: { id: e.id },
          }),
      ),
  );

  console.log("✅ Exercícios deletados com sucesso:", exercisesDeleted.length);

  // Verificar quais exercícios já existem no banco de dados
  const existingExercises = await Promise.all(
    defaultExerciseData
      .filter(
        async (e) =>
          await prisma.exercise.findUnique({
            where: {
              name_createdById: { name: e.name, createdById: e.createdById },
            },
          }),
      )
      .map(
        async (e) =>
          await prisma.exercise.findUnique({
            where: {
              name_createdById: { name: e.name, createdById: e.createdById },
            },
          }),
      ),
  );

  console.log(
    "✅ Verificação de exercícios concluída. Exercícios existentes:",
    existingExercises.length,
  );

  // Criar os exercícios que não existem
  const newExercises = await prisma.exercise.createManyAndReturn({
    data: defaultExerciseData
      .filter(
        (e) =>
          !existingExercises.some(
            (ex) => ex?.name === e.name && ex?.createdById === e.createdById,
          ),
      )
      .map((e) => ({
        name: e.name,
        description: e.description ?? null,
        image: e.image ?? null,
        video: e.video ?? null,
        visibility: e.visibility ?? Visibility.PUBLIC,
        createdById: e.createdById,
      })),
  });

  console.log("✅ Exercícios criados com sucesso:", newExercises.length);

  // Atualizar os exercícios que já existem
  const updatedExercises = await Promise.all(
    existingExercises
      .filter((e) => e !== null)
      .map(
        async (e) =>
          await prisma.exercise.update({
            where: { id: e.id },
            data: e,
          }),
      ),
  );

  console.log(
    "✅ Exercícios atualizados com sucesso!",
    updatedExercises.length,
  );

  const exercises = await prisma.exercise.findMany({
    where: { createdById: fitBodyUser.id },
  });

  console.log("✅ Exercícios carregados com sucesso:", exercises.length);

  const exerciseMuscleGroups = await prisma.exerciseMuscleGroup.findMany();

  console.log(
    "✅ ExerciseMuscleGroups existentes no banco de dados:",
    exerciseMuscleGroups.length,
  );

  // Criar as relações de ExerciseMuscleGroup para os exercícios
  const defaultMuscleGroups = defaultExerciseData.flatMap((e) => {
    const muscleGroups = e.muscleGroups || [];
    const exercise = exercises.find(
      (ex) => ex.name === e.name && ex.createdById === e.createdById,
    );

    if (!exercise) return [];

    return muscleGroups.map((mg) => ({
      exerciseId: exercise.id,
      muscleGroup: mg.muscleGroup,
      role: mg.role,
    }));
  });

  console.log(
    "✅ Relações de ExerciseMuscleGroup default:",
    defaultMuscleGroups.length,
  );

  // Deleta as relações de ExerciseMuscleGroup que não estão mais presentes no defaultMuscleGroups
  const exerciseMuscleGroupsDeleted = await Promise.all(
    exerciseMuscleGroups
      .filter(
        (emg) =>
          !defaultMuscleGroups.some(
            (dmg) =>
              dmg.exerciseId === emg.exerciseId &&
              dmg.muscleGroup === emg.muscleGroup &&
              dmg.role === emg.role,
          ),
      )
      .map(
        async (emg) =>
          await prisma.exerciseMuscleGroup.delete({
            where: {
              exerciseId_muscleGroup_role: {
                exerciseId: emg.exerciseId,
                muscleGroup: emg.muscleGroup,
                role: emg.role,
              },
            },
          }),
      ),
  );

  console.log(
    "✅ Relações de ExerciseMuscleGroup deletadas com sucesso:",
    exerciseMuscleGroupsDeleted.length,
  );

  // Verificar quais relações de ExerciseMuscleGroup já existem
  const existingExerciseMuscleGroups = await Promise.all(
    defaultMuscleGroups.map(
      async (mg) =>
        await prisma.exerciseMuscleGroup.findFirst({
          where: {
            exerciseId: mg.exerciseId,
            muscleGroup: mg.muscleGroup,
            role: mg.role,
          },
        }),
    ),
  );

  console.log(
    "✅ Verificação de ExerciseMuscleGroup concluída. Relações existentes:",
    existingExerciseMuscleGroups.length,
  );

  // Criar os ExerciseMuscleGroup que não existem
  const newExerciseMuscleGroups = defaultMuscleGroups.filter(
    (mg) =>
      !existingExerciseMuscleGroups.some(
        (emg) =>
          emg?.exerciseId === mg.exerciseId &&
          emg?.muscleGroup === mg.muscleGroup &&
          emg?.role === mg.role,
      ),
  );

  // Salva as novas relações de ExerciseMuscleGroup no banco de dados
  const newExerciseMuscleGroupsCreated =
    await prisma.exerciseMuscleGroup.createManyAndReturn({
      data: newExerciseMuscleGroups,
    });

  console.log(
    "✅ Novas relações de ExerciseMuscleGroup criadas com sucesso:",
    newExerciseMuscleGroupsCreated.length,
  );

  const { defaultWorkoutPlanData } = getDefault(fitBodyUser.id);

  console.log(
    "✅ Dados default de WorkoutPlan carregados:",
    defaultWorkoutPlanData.length,
  );

  for (const dwp of defaultWorkoutPlanData) {
    console.log(`✅ Processando plano de treino "${dwp.name}"...`);

    let workoutPlan = await prisma.workoutPlan.findFirst({
      where: { name: dwp.name, createdById: dwp.createdById },
    });

    if (!workoutPlan)
      workoutPlan = await prisma.workoutPlan.create({
        data: {
          name: dwp.name,
          description: dwp.description ?? null,
          goal: dwp.goal ?? null,
          visibility: dwp.visibility ?? Visibility.PUBLIC,
          createdById: fitBodyUser.id,
        },
      });

    console.log(
      `✅ Plano de treino "${dwp.name}" criado/verificado com sucesso! ID: ${workoutPlan.id}`,
    );

    for (const wd of dwp.workoutDays) {
      let workoutDay = await prisma.workoutDay.findFirst({
        where: {
          workoutPlanId: workoutPlan.id,
          dayCode: wd.dayCode ?? null,
          seq: wd.seq ?? 0,
        },
      });

      if (!workoutDay)
        workoutDay = await prisma.workoutDay.create({
          data: {
            workoutPlanId: workoutPlan.id,
            dayCode: wd.dayCode ?? null,
            seq: wd.seq ?? 0,
            type: wd.type ?? DayType.WORKOUT,
            focus: wd.focus ?? DayFocus.BODYBUILDING,
          },
        });

      if (!wd.workoutDayExercises) continue;

      console.log(
        `✅ Processando dia de treino "${wd.dayCode}" do plano "${dwp.name}"...`,
      );

      for (const wde of wd.workoutDayExercises) {
        let workoutDayExercise = await prisma.workoutDayExercise.findFirst({
          where: {
            workoutDayId: workoutDay.id,
            exerciseId:
              exercises.find(
                (e) =>
                  e.name === wde.exerciseName &&
                  e.createdById === fitBodyUser.id,
              )?.id ?? "",
            seq: wde.seq,
          },
        });

        if (!workoutDayExercise)
          workoutDayExercise = await prisma.workoutDayExercise.create({
            data: {
              workoutDayId: workoutDay.id,
              exerciseId:
                exercises.find(
                  (e) =>
                    e.name === wde.exerciseName &&
                    e.createdById === fitBodyUser.id,
                )?.id ?? "",
              seq: wde.seq,
            },
          });

        console.log(
          `✅ Exercício "${wde.exerciseName}" do dia "${wd.dayCode}" criado/verificado com sucesso! ID: ${workoutDayExercise.id}`,
        );
      }
    }
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
