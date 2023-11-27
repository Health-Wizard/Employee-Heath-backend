import { PrismaClient } from '@prisma/client';
import { Result } from '../interface/authInterface';

const prisma = new PrismaClient();

export async function checkUsername(username: string): Promise<Result> {
  // Check if the username is in the employee table
  const employee = await prisma.employee.findUnique({
    where: { username },
  });

  if (employee) {
    return {role: 'employee'};
  }

  // Check if the username is in the admin table
  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (admin) {
    return {role: 'admin'};
  }

  // If not found in either table, return not found
  return {role: 'none'};
}
