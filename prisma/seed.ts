import { PrismaClient } from "@prisma/client";
import { getCuid } from "./cuid";
import networkTeachers from "./teachers/network";
import intelligenceTeachers from "./teachers/intelligence";
import mediaTeachers from "./teachers/media";

const prisma = new PrismaClient();

interface Course {
  title: string;
  course_numbers: string[];
}
export interface Teacher {
  name: string;
  course: Course[];
}

const teachers: Teacher[] = [
  ...networkTeachers,
  ...intelligenceTeachers,
  ...mediaTeachers,
];

async function main() {
  teachers.forEach(async (teacher: Teacher) => {
    const [lastName, firstName] = teacher.name.split(" ");
    const id = getCuid();

    const createdTeacher = await prisma.teacher.upsert({
      where: { id },
      update: {},
      create: {
        id,
        firstName,
        lastName,
        courses: {
          create: teacher.course.map((course) => ({
            title: course.title,
            courseNumbers: {
              create: course.course_numbers.map((course_number) => ({
                number: course_number,
              })),
            },
          })),
        },
      },
    });
    console.log(createdTeacher);
  });
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
