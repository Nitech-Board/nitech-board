import { getPrismaClient } from "@/utils/prisma";
import { Student } from "@prisma/client";

export const getProfile = async (
  firebaseUid: string
): Promise<Student | null> => {
  const prisma = getPrismaClient();
  const profile = await prisma.student.findUnique({
    where: {
      firebaseUid,
    },
  });

  return profile;
};

export const createProfile = async ({
  name,
  firebaseUid,
  enrollmentYear,
}: {
  name: string;
  firebaseUid: string;
  enrollmentYear: number;
}): Promise<Student> => {
  const prisma = getPrismaClient();

  const profile = await prisma.student.create({
    data: {
      name,
      firebaseUid,
      enrollmentYear,
    },
  });
  return profile;
};
