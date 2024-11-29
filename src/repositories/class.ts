import { ClassSummary, CourseWithNumbers } from "@/types/course";
import { getPrismaClient } from "@/utils/prisma";

const classListFormatter = (classRows: CourseWithNumbers[]): ClassSummary[] => {
  const classList: ClassSummary[] = [];

  classRows.forEach((classRow) => {
    classRow.courseNumbers.forEach((courseNumber) => {
      classList.push({
        name: classRow.title,
        classNumber: courseNumber.number,
      });
    });
  });

  return classList;
};

export const getClassList = async () => {
  const prisma = getPrismaClient();
  const classRows: CourseWithNumbers[] = await prisma.course.findMany({
    include: {
      courseNumbers: true,
    },
  });

  const classList = classListFormatter(classRows);
  return classList;
};
