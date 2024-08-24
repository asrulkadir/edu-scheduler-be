/*
  Warnings:

  - Added the required column `clientId` to the `AcademicCalendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `AcademicCalendarSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `SubjectsSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `TeachingSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicCalendar" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AcademicCalendarSchedule" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubjectsSchedule" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeachingSchedule" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingSchedule" ADD CONSTRAINT "TeachingSchedule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectsSchedule" ADD CONSTRAINT "SubjectsSchedule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicCalendar" ADD CONSTRAINT "AcademicCalendar_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicCalendarSchedule" ADD CONSTRAINT "AcademicCalendarSchedule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
