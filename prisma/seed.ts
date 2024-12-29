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
  {
    name: "玉木 徹",
    course: [
      {
        title: "ソフトウェア工学",
        course_numbers: ["2620", "2622"],
      },
      {
        title: "科学技術計算",
        course_numbers: ["6622", "6623"],
      },
    ],
  },
  {
    name: "佐藤 淳",
    course: [
      {
        title: "画像情報処理",
        course_numbers: ["2612"],
      },
      {
        title: "CG",
        course_numbers: ["6616", "6617"],
      },
    ],
  },
  {
    name: "徳田 恵一",
    course: [
      {
        title: "信号処理",
        course_numbers: ["6614"],
      },
      {
        title: "音声情報処理",
        course_numbers: ["7618"],
      },
    ],
  },
  {
    name: "李 晃伸",
    course: [
      {
        title: "プログラミングⅡ",
        course_numbers: ["1620"],
      },
      {
        title: "言語処理工学",
        course_numbers: ["2613"],
      },
      {
        title: "形式言語とオートマトン",
        course_numbers: ["6628"],
      },
    ],
  },
  {
    name: "黒柳 奨",
    course: [
      {
        title: "コンピュータアーキテクチャⅡ",
        course_numbers: ["6618", "6619"],
      },
      {
        title: "メディアセンシング",
        course_numbers: ["7620"],
      },
    ],
  },
  {
    name: "坂上 文彦",
    course: [
      {
        title: "プログラミングⅡ",
        course_numbers: ["1619"],
      },
      {
        title: "科学技術計算",
        course_numbers: ["6624"],
      },
    ],
  },
  {
    name: "酒向 慎司",
    course: [
      {
        title: "フレッシュマンセミナー",
        course_numbers: ["0346"],
      },
      {
        title: "プログラミングⅡ",
        course_numbers: ["1610"],
      },
      {
        title: "コンピュータ入門",
        course_numbers: ["5605"],
      },
    ],
  },
  {
    name: "南角 吉彦",
    course: [
      {
        title: "情報理論",
        course_numbers: ["1603"],
      },
      {
        title: "プログラミングⅢ",
        course_numbers: ["6630"],
      },
      {
        title: "メディア系演習Ⅱ",
        course_numbers: ["7625"],
      },
    ],
  },
  {
    name: "平野 智",
    course: [
      {
        title: "ディジタル回路",
        course_numbers: ["0605"],
      },
      {
        title: "電気電子回路",
        course_numbers: ["2603"],
      },
      {
        title: "信号処理",
        course_numbers: ["6608"],
      },
    ],
  },
  {
    name: "後藤 富朗",
    course: [
      {
        title: "プログラミングⅢ",
        course_numbers: ["6631", "6632"],
      },
    ],
  },
  {
    name: "舟橋 健司",
    course: [
      {
        title: "プログラミングⅠ",
        course_numbers: ["5609"],
      },
    ],
  },
  {
    name: "山本 大介",
    course: [
      {
        title: "情報工学特別講義",
        course_numbers: ["7601"],
      },
    ],
  },
  {
    name: "田口 亮",
    course: [
      {
        title: "感性情報処理",
        course_numbers: ["2614"],
      },
      {
        title: "メディア系演習Ⅰ",
        course_numbers: ["2618"],
      },
    ],
  },
  {
    name: "橋本 佳",
    course: [
      {
        title: "ディジタル回路",
        course_numbers: ["0604"],
      },
      {
        title: "情報数学Ⅱ",
        course_numbers: ["1613"],
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

  // TODO:いつか消す
  const studentId = getCuid();
  const createdStudent = await prisma.student.upsert({
    where: { id: studentId },
    update: {},
    create: {
      id: studentId,
      name: "テスト太郎君",
      enrollmentYear: 2022,
    },
  });
  console.log(createdStudent);
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
