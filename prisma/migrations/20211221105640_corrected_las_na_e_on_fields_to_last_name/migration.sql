/*
  Warnings:

  - You are about to drop the column `lasName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `lasName` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "lasName",
ADD COLUMN     "lastName" VARCHAR(16) NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "lasName",
ADD COLUMN     "lastName" VARCHAR(16) NOT NULL,
ADD COLUMN     "nationality" VARCHAR(32),
ALTER COLUMN "gender" SET DATA TYPE CHAR;
