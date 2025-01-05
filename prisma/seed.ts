import { getCuid } from "./cuid";
import networkTeachers from "./teachers/network";
import intelligenceTeachers from "./teachers/intelligence";
import mediaTeachers from "./teachers/media";
import { getPrismaClient } from "@/utils/prisma";

const prisma = getPrismaClient();

interface Course {
  title: string;
  course_numbers: string[];
}
interface FormattedCourse {
  id: string;
  title: string;
  teacherId: string;
  courseNumbers: string[];
}

export interface Teacher {
  name: string;
  course: Course[];
}

interface FormattedTeacher {
  id: string;
  firstName: string;
  lastName: string;
  course: Course[];
}

const teachers: Teacher[] = [
  ...networkTeachers,
  ...intelligenceTeachers,
  ...mediaTeachers,
];

async function main() {
  await prisma.courseNumber.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacher.deleteMany();

  // id => teacher のマップへ変換
  const teacherMap: Record<string, FormattedTeacher> = {};
  teachers.forEach((teacher) => {
    const [lastName, firstName] = teacher.name.split(" ");
    const id = getCuid();
    teacherMap[id] = {
      id,
      firstName,
      lastName,
      course: teacher.course,
    };
  });

  // teacher を作成
  const createdTeachers = await prisma.teacher.createMany({
    data: [
      ...Object.values(teacherMap).map((teacher) => ({
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
      })),
    ],
    skipDuplicates: true,
  });
  console.log("Teachers created: ", createdTeachers.count);

  // courseMap を作成
  const courseMap: Record<string, FormattedCourse> = {};
  Object.values(teacherMap).forEach((teacher) => {
    teacher.course.forEach((course) => {
      const id = getCuid();
      courseMap[id] = {
        id,
        title: course.title,
        teacherId: teacher.id,
        courseNumbers: course.course_numbers,
      };
    });
  });

  // course を作成
  const createdCourses = await prisma.course.createMany({
    data: [
      ...Object.values(courseMap).map((course) => ({
        id: course.id,
        title: course.title,
        teacherId: course.teacherId,
      })),
    ],
    skipDuplicates: true,
  });
  console.log("Courses created: ", createdCourses.count);

  // courseNumber を作成
  const createdCourseNumbers = await prisma.courseNumber.createMany({
    data: [
      ...Object.values(courseMap).flatMap((course) =>
        course.courseNumbers.map((courseNumber) => ({
          number: courseNumber,
          courseId: course.id,
        }))
      ),
    ],
    skipDuplicates: true,
  });
  console.log("CourseNumbers created: ", createdCourseNumbers.count);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
