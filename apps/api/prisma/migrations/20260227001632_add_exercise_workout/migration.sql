-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'TRICEPS', 'SHOULDERS', 'TRAPEZIUS', 'UPPER_BACK', 'MID_BACK', 'LOWER_BACK', 'BICEPS', 'FOREARMS_FLEXORS', 'FOREARMS_EXTENSORS', 'ABS', 'HIP_FLEXORS', 'QUADS', 'HAMSTRINGS', 'CALVES', 'GLUTES', 'ADDUCTORS', 'ABDUCTORS');

-- CreateEnum
CREATE TYPE "MuscleGroupRole" AS ENUM ('PRIMARY', 'SECONDARY', 'STABILIZER', 'EMPHASIS');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('REST', 'WORKOUT');

-- CreateEnum
CREATE TYPE "DayFocus" AS ENUM ('BODYBUILDING', 'STRENGTH', 'CARDIO', 'FLEXIBILITY');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LB');

-- CreateTable
CREATE TABLE "exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "video" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_muscle_group" (
    "exerciseId" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "role" "MuscleGroupRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_muscle_group_pkey" PRIMARY KEY ("exerciseId","muscleGroup","role")
);

-- CreateTable
CREATE TABLE "workout_plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goal" TEXT,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "description" TEXT,
    "image" TEXT,
    "video" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_day" (
    "id" TEXT NOT NULL,
    "dayCode" TEXT,
    "seq" SMALLINT NOT NULL DEFAULT 0,
    "type" "DayType" NOT NULL DEFAULT 'WORKOUT',
    "focus" "DayFocus",
    "workoutPlanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_day_exercise" (
    "id" TEXT NOT NULL,
    "seq" SMALLINT NOT NULL DEFAULT 0,
    "notes" VARCHAR(2048),
    "startedAt" TIMESTAMP(3),
    "workoutDayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_day_exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_session" (
    "id" TEXT NOT NULL,
    "notes" VARCHAR(1024),
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
    "workoutDayId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_set" (
    "id" TEXT NOT NULL,
    "reps" SMALLINT,
    "weight" DECIMAL(10,2),
    "weightUnit" "WeightUnit",
    "timeInSeconds" SMALLINT,
    "rpe" SMALLINT NOT NULL DEFAULT 1,
    "rir" SMALLINT DEFAULT 0,
    "seq" INTEGER NOT NULL DEFAULT 0,
    "notes" VARCHAR(1024),
    "workoutSessionId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_set_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercise_name_createdById_key" ON "exercise"("name", "createdById");

-- CreateIndex
CREATE INDEX "workout_plan_id_createdById_idx" ON "workout_plan"("id", "createdById");

-- CreateIndex
CREATE INDEX "workout_day_workoutPlanId_idx" ON "workout_day"("workoutPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "workout_day_workoutPlanId_seq_key" ON "workout_day"("workoutPlanId", "seq");

-- CreateIndex
CREATE INDEX "workout_day_exercise_workoutDayId_idx" ON "workout_day_exercise"("workoutDayId");

-- CreateIndex
CREATE UNIQUE INDEX "workout_day_exercise_workoutDayId_seq_key" ON "workout_day_exercise"("workoutDayId", "seq");

-- CreateIndex
CREATE INDEX "workout_session_workoutDayId_userId_idx" ON "workout_session"("workoutDayId", "userId");

-- CreateIndex
CREATE INDEX "workout_set_workoutSessionId_idx" ON "workout_set"("workoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "workout_set_workoutSessionId_seq_key" ON "workout_set"("workoutSessionId", "seq");

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_muscle_group" ADD CONSTRAINT "exercise_muscle_group_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_plan" ADD CONSTRAINT "workout_plan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_day" ADD CONSTRAINT "workout_day_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_day_exercise" ADD CONSTRAINT "workout_day_exercise_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "workout_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_day_exercise" ADD CONSTRAINT "workout_day_exercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "workout_day"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_set" ADD CONSTRAINT "workout_set_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_set" ADD CONSTRAINT "workout_set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
