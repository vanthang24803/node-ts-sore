import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function Connection() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
