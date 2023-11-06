-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "dateOfJoining" TIMESTAMP(3) NOT NULL,
    "salary" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_empId_key" ON "Employee"("empId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
