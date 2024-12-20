import { Course, CourseNumber } from "@prisma/client";

export interface CourseSummary {
  courseNumber: string;
  name: string;
}

export type CourseWithNumbers = Course & { courseNumbers: CourseNumber[] };

export interface ReviewData {
  clearityRating: number;
  testRating: number;
  homeworkRating: number;
  comment: string;
}

export interface ReviewDataWithStudent extends ReviewData {
  studentId: string;
}

export interface CourseDetail {
  courseId: string;
  title: string;
  teacherName: string;
  courseNumber: string;
}

export interface CourseDetailWithReviews {
  course: CourseDetail;
  reviews: ReviewDataWithStudent[];
}
