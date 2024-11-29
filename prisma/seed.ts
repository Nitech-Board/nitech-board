import { PrismaClient } from "@prisma/client";
import { getCuid } from "./cuid";

const prisma = new PrismaClient();

interface Course {
  title: string;
  course_numbers: string[];
}
interface Teacher {
  name: string;
  course: Course[];
}

const teachers: Teacher[] = [
  {
    name: "本谷 秀堅",
    course: [
      {
        title: "パターン認識",
        course_numbers: ["2611"],
      },
      {
        title: "データサイエンス",
        course_numbers: ["6615"],
      },
      {
        title: "計算幾何学",
        course_numbers: ["6620", "6621"],
      },
    ],
  },
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
