import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkUsername(username: string): Promise<any> {
  // Check if the username is in the employee table
  const employee = await prisma.employee.findUnique({
  where: { username },
});

if (employee) {
  return { isRegistered: true };
}

// If not found in the employee table, return not registered
return { isRegistered: false };
}
