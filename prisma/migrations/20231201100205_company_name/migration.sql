/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_empId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "companyName" TEXT;

-- DropTable
DROP TABLE "Admin";
