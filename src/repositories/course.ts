import {
  CourseDetail,
  CourseSummary,
  CourseWithNumbersAndTeacher,
} from "@/types/course";
import { getPrismaClient } from "@/utils/prisma";
import { getCourseDetailByCourseNumberQuery } from "@prisma/client/sql";

const courseListFormatter = (
  courseRows: CourseWithNumbersAndTeacher[]
): CourseSummary[] => {
  const courseList: CourseSummary[] = [];

  courseRows.forEach((courseRow) => {
    courseRow.courseNumbers.forEach((courseNumber) => {
      courseList.push({
        name: courseRow.title,
        courseNumber: courseNumber.number,
        teacher: courseRow.teacher.lastName + " " + courseRow.teacher.firstName,
      });
    });
  });

  return courseList;
};

export const getCourseList = async () => {
  const prisma = getPrismaClient();
  const courseRows = await prisma.course.findMany({
    include: {
      courseNumbers: true,
      teacher: true,
    },
  });

  const courseList = courseListFormatter(courseRows);
  return courseList;
};

const courseDetailFormatter = (
  courseDetail: getCourseDetailByCourseNumberQuery.Result
): CourseDetail => {
  return {
    courseId: courseDetail.id,
    title: courseDetail.title,
    teacherName: courseDetail.last_name + " " + courseDetail.first_name,
    courseNumber: courseDetail.number,
    goodSummary: courseDetail.good_summary,
    badSummary: courseDetail.bad_summary,
  };
};

export const getCourseDetailByCourseNumber = async (
  courseNumber: string
): Promise<CourseDetail | null> => {
  const prisma = getPrismaClient();
  const courseDetail = await prisma.$queryRawTyped(
    getCourseDetailByCourseNumberQuery(courseNumber)
  );

  return courseDetail.length > 0
    ? courseDetailFormatter(courseDetail[0])
    : null;
};
