/*
  Warnings:

  - You are about to drop the column `endDate` on the `Doctor_Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Doctor_Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `lasName` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[treatmentId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentDateTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remarks` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentDateTime" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "doctorId" TEXT,
ADD COLUMN     "patientId" TEXT,
ADD COLUMN     "serviceId" TEXT,
ADD COLUMN     "treatmentId" TEXT;

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Doctor_Schedule" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDateTime" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startDateTime" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "hospitalId" TEXT,
ADD COLUMN     "treatment_DetailId" TEXT;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "lasName",
ADD COLUMN     "hospitalId" TEXT,
ADD COLUMN     "lastName" VARCHAR(16) NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "description" VARCHAR(512) NOT NULL,
ADD COLUMN     "serviceFee" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "serviceName" VARCHAR(124) NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "remarks" VARCHAR(512) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_treatmentId_key" ON "Appointment"("treatmentId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_treatment_DetailId_fkey" FOREIGN KEY ("treatment_DetailId") REFERENCES "Treatment_Detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
