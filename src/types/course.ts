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

export interface CourseDetail {
  title: string;
  teacherName: string;
  courseNumber: string;
}
