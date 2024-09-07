/*
  Warnings:

  - The values [Laki-laki,Perempuan] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `gender` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('male', 'female');
ALTER TABLE "Teacher" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
