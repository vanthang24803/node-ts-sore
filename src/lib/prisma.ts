import { PrismaClient } from "@prisma/client";
import { logger } from "../helpers/logger";

export const prisma = new PrismaClient();

export async function Connection() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
