import { Course, CourseNumber } from "@prisma/client";

export interface ClassSummary {
  classNumber: string;
  name: string;
}

export type CourseWithNumbers = Course & { courseNumbers: CourseNumber[] };
