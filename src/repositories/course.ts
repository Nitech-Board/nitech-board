import { CourseSummary, CourseWithNumbers } from "@/types/course";
import { getPrismaClient } from "@/utils/prisma";

const courseListFormatter = (
  courseRows: CourseWithNumbers[]
): CourseSummary[] => {
  const courseList: CourseSummary[] = [];

  courseRows.forEach((courseRow) => {
    courseRow.courseNumbers.forEach((courseNumber) => {
      courseList.push({
        name: courseRow.title,
        courseNumber: courseNumber.number,
      });
    });
  });

  return courseList;
};

export const getCourseList = async () => {
  const prisma = getPrismaClient();
  const courseRows: CourseWithNumbers[] = await prisma.course.findMany({
    include: {
      courseNumbers: true,
    },
  });

  const courseList = courseListFormatter(courseRows);
  return courseList;
};
