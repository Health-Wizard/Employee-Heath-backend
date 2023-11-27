/*
  Warnings:

  - You are about to drop the column `companyName` on the `Register` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Register` table. All the data in the column will be lost.
  - Added the required column `value` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnswerValue" AS ENUM ('5', '4', '3', '2', '1');

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "value" "AnswerValue" NOT NULL;

-- AlterTable
ALTER TABLE "Register" DROP COLUMN "companyName",
DROP COLUMN "role";
