/*
  Warnings:

  - You are about to drop the column `days` on the `SubjectsSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `days` on the `TeachingSchedule` table. All the data in the column will be lost.
  - Added the required column `day` to the `SubjectsSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `TeachingSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- AlterTable
ALTER TABLE "SubjectsSchedule" DROP COLUMN "days",
ADD COLUMN     "day" "Day" NOT NULL;

-- AlterTable
ALTER TABLE "TeachingSchedule" DROP COLUMN "days",
ADD COLUMN     "day" "Day" NOT NULL;
