/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyEmail]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_empId_key" ON "Admin"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_companyEmail_key" ON "Admin"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_companyEmail_key" ON "Employee"("companyEmail");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
