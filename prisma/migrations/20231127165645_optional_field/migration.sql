/*
  Warnings:

  - A unique constraint covering the columns `[companyEmail]` on the table `Register` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "dateOfJoining" DROP NOT NULL,
ALTER COLUMN "salary" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "department" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Register_companyEmail_key" ON "Register"("companyEmail");
