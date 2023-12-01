import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkIfAdmin = async (empId: number): Promise<boolean> => {
  try {
    // Implement the logic to check if the empId belongs to an admin
    // For example, check if the role is 'admin'
    const employee = await prisma.employee.findUnique({
      where: { empId },
      select: { role: true },
    });

    return employee?.role === 'admin' || false;
  } catch (error) {
    console.error('Error in checkIfAdmin:', error);
    throw error;
  }
};