import { CourseDetail, CourseSummary } from "@/types/course";
import { getPrismaClient } from "@/utils/prisma";
import {
  getCourseDetailByCourseNumberQuery,
  getCourseListQuery,
} from "@prisma/client/sql";

const courseListFormatter = (
  courseRows: getCourseListQuery.Result[]
): CourseSummary[] => {
  const courseList: CourseSummary[] = [];

  courseRows.forEach((courseRow) => {
    courseList.push({
      name: courseRow.course_title,
      courseNumber: courseRow.course_number,
      teacher: courseRow.teacher_last_name + " " + courseRow.teacher_first_name,
      reviewCount: Number(courseRow.review_count),
    });
  });

  return courseList;
};

export const getCourseList = async () => {
  const prisma = getPrismaClient();
  // const courseRows = await prisma.course.findMany({
  //   include: {
  //     courseNumbers: true,
  //     teacher: true,
  //   },
  // });
  const courseRows = await prisma.$queryRawTyped(getCourseListQuery());

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
