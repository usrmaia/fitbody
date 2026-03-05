/*
  Warnings:

  - You are about to drop the column `weight` on the `workout_set` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "HeightUnit" AS ENUM ('CM', 'IN');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('BUILD_MUSCLE', 'LOSE_FAT', 'MAINTAIN_WEIGHT', 'IMPROVE_STRENGTH', 'ENHANCE_ENDURANCE', 'INCREASE_FLEXIBILITY', 'IMPROVE_HEALTH', 'OTHER');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE', 'EXTRA_ACTIVE');

-- AlterTable
ALTER TABLE "workout_set" DROP COLUMN "weight",
ADD COLUMN     "weightKg" DECIMAL(5,2);

-- CreateTable
CREATE TABLE "profile" (
    "userId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "bio" VARCHAR(1024),
    "birthDate" TIMESTAMP(3) NOT NULL,
    "heightCm" DECIMAL(5,2) NOT NULL,
    "heightUnit" "HeightUnit" NOT NULL DEFAULT 'CM',
    "weightKg" DECIMAL(5,2) NOT NULL,
    "weightUnit" "WeightUnit" NOT NULL DEFAULT 'KG',
    "goal" "Goal" NOT NULL,
    "goalOther" VARCHAR(256),
    "activityLevel" "ActivityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "profile_userId_idx" ON "profile"("userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
