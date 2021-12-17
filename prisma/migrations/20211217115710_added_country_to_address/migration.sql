/*
  Warnings:

  - A unique constraint covering the columns `[hospitalId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "country" VARCHAR(64) NOT NULL,
ADD COLUMN     "hospitalId" TEXT;

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- CreateIndex
CREATE UNIQUE INDEX "Address_hospitalId_key" ON "Address"("hospitalId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;
