import { ReviewData, ReviewDataWithStudent } from "@/types/course";
import { getPrismaClient } from "@/utils/prisma";
import {
  getCommentsQuery,
  getReviewsByCourseIdQuery,
} from "@prisma/client/sql";

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
  const res = await prisma.$queryRawTyped(getReviewsByCourseIdQuery(courseId));

  return res.map(reviewFormatter);
};

export const getComments = async (
  courseId: string,
  limit?: number
): Promise<string[]> => {
  const prisma = getPrismaClient();
  const res = await prisma.$queryRawTyped(getCommentsQuery(courseId));

  if (!limit) {
    return res.map((comment) => comment.comment);
  }

  return res.map((comment) => comment.comment).slice(0, limit);
};

export const updateSummary = async (
  courseId: string,
  goodSummary: string,
  badSummary: string
) => {
  const prisma = getPrismaClient();
  const res = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      goodSummary,
      badSummary,
    },
  });

  return res;
};

const reviewFormatter = (
  res: getReviewsByCourseIdQuery.Result
): ReviewDataWithStudent => {
  return {
    studentId: res.student_id,
    studentName: res.student_name,
    studentEnrollmentYear: res.student_enrollment_year,
    clearityRating: res.clearity_rating,
    testRating: res.test_rating,
    homeworkRating: res.homework_rating,
    comment: res.comment,
  };
};
