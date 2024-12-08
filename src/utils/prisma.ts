import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};
