/*
  Warnings:

  - You are about to drop the column `registrationDate` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "registrationDate",
ADD COLUMN     "sector" TEXT;
