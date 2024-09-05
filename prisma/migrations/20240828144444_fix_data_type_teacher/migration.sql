/*
  Warnings:

  - You are about to drop the column `subjectIds` on the `Teacher` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Laki-laki', 'Perempuan');

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subjectIds";
