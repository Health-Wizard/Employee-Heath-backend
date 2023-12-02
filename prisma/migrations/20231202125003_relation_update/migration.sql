-- DropForeignKey
ALTER TABLE "Health_Analytics" DROP CONSTRAINT "Health_Analytics_empId_fkey";

-- AddForeignKey
ALTER TABLE "Health_Analytics" ADD CONSTRAINT "Health_Analytics_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employee"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;
