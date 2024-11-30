import { PrismaClient } from "@prisma/client";

let prisma;
export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};
