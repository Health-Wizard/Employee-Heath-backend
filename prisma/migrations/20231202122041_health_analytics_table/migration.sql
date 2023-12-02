-- CreateTable
CREATE TABLE "Health_Analytics" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "health_data" JSONB,

    CONSTRAINT "Health_Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Health_Analytics_empId_key" ON "Health_Analytics"("empId");

-- AddForeignKey
ALTER TABLE "Health_Analytics" ADD CONSTRAINT "Health_Analytics_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
