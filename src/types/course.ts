import { Course, CourseNumber, Teacher } from "@prisma/client";

export interface CourseSummary {
  courseNumber: string;
  name: string;
  teacher: string;
}

export type CourseWithNumbers = Course & { courseNumbers: CourseNumber[] };
export type CourseWithNumbersAndTeacher = CourseWithNumbers & {
  teacher: Teacher;
};

export interface ReviewData {
  clearityRating: number;
  testRating: number;
  homeworkRating: number;
  comment: string;
}

export interface ReviewDataWithStudent extends ReviewData {
  studentId: string;
  studentName: string;
  studentEnrollmentYear: number;
}

export interface CourseDetail {
  courseId: string;
  title: string;
  teacherName: string;
  courseNumber: string;
  goodSummary?: string;
  badSummary?: string;
}

export interface CourseDetailWithReviews {
  course: CourseDetail;
  reviews: ReviewDataWithStudent[];
}
