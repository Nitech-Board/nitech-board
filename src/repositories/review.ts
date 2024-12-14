import { ReviewData, ReviewDataWithStudent } from "@/types/course";
import { getPrismaClient } from "@/utils/prisma";
import { Review } from "@prisma/client";

const getCourseIdByCourseNumber = async (
  courseNumber: string
): Promise<string | null> => {
  const prisma = getPrismaClient();
  const res = await prisma.courseNumber.findFirst({
    select: {
      courseId: true,
    },
    where: {
      number: courseNumber,
    },
  });
  if (!res) {
    return null;
  }
  return res.courseId;
};

export const insertReview = async (
  courseNumber: string,
  studentId: string,
  review: ReviewData
) => {
  const prisma = getPrismaClient();
  const courseId = await getCourseIdByCourseNumber(courseNumber);
  if (!courseId) {
    throw new Error("Course not found");
  }

  const res = await prisma.review.create({
    data: {
      courseId,
      studentId,
      clearityRating: review.clearityRating,
      testRating: review.testRating,
      homeworkRating: review.homeworkRating,
      comment: review.comment,
    },
  });

  return res;
};

export const getReviewsByCourseId = async (
  courseId: string
): Promise<ReviewDataWithStudent[]> => {
  const prisma = getPrismaClient();
  const res = await prisma.review.findMany({
    where: {
      courseId,
    },
  });

  return res.map(reviewFormatter);
};

const reviewFormatter = (review: Review): ReviewDataWithStudent => {
  return {
    studentId: review.studentId,
    clearityRating: review.clearityRating,
    testRating: review.testRating,
    homeworkRating: review.homeworkRating,
    comment: review.comment,
  };
};
