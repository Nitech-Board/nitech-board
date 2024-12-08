import { Course, CourseNumber } from "@prisma/client";

export interface CourseSummary {
  courseNumber: string;
  name: string;
}

export type CourseWithNumbers = Course & { courseNumbers: CourseNumber[] };

export interface CourseDetail {
  title: string;
  teacherName: string;
  courseNumber: string;
}
