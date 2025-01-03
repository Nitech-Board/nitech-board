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
  //知能
  {
    name: "烏山 昌幸",
    course: [
      {
        title: "機械学習論",
        course_numbers: ["2610"],
      },
      {
        title: "数理情報概論",
        course_numbers: ["5141"],
      },
    ],
  },
  {
    name: "櫻井 祐子",
    course: [
      {
        title: "マルチエージェントシステム",
        course_numbers: ["2606"],
      },
    ],
  },
  {
    name: "加藤 昇平",
    course: [
      {
        title: "知能プログラミング演習 I",
        course_numbers: ["2617"],
      },
      {
        title: "知識表現と推論",
        course_numbers: ["6610", "6611", "7609", "7610"],
      },
      {
        title: "知能ロボット制御論",
        course_numbers: ["7615"],
      },
    ],
  },
  {
    name: "白松 俊",
    course: [
      {
        title: "ウェブインテリジェンス",
        course_numbers: ["2607"],
      },
      {
        title: "データベース論",
        course_numbers: ["7612", "7614"],
      },
    ],
  },
  {
    name: "田中 剛平",
    course: [
      {
        title: "情報数学 I",
        course_numbers: ["5612"],
      },
    ],
  },
  {
    name: "山岸 正和",
    course: [
      {
        title: "確率",
        course_numbers: ["5602"],
      },
    ],
  },
  {
    name: "松井 俊浩",
    course: [
      {
        title: "プログラミングⅡ",
        course_numbers: ["1611"],
      },
    ],
  },
  {
    name: "犬塚 信博",
    course: [
      {
        title: "情報工学概論",
        course_numbers: ["0601"],
      },
      {
        title: "情報数学Ⅰ",
        course_numbers: ["5611"],
      },
    ],
  },
  {
    name: "武藤 敦子",
    course: [
      {
        title: "コンピュータ入門",
        course_numbers: ["5606", "5613"],
      },
      {
        title: "プログラミング I",
        course_numbers: ["5609", "5614"],
      },
    ],
  },
  {
    name: "森山 甲一",
    course: [
      {
        title: "コンピュータ入門",
        course_numbers: ["5613"],
      },
      {
        title: "プログラミング I",
        course_numbers: ["5614"],
      },
    ],
  },
  {
    name: "大塚 孝信",
    course: [
      {
        title: "インターンシップ I",
        course_numbers: ["3601"],
      },
      {
        title: "コンピュータ入門",
        course_numbers: ["5604"],
      },
      {
        title: "プログラミング I",
        course_numbers: ["5607"],
      },
      {
        title: "インターンシップ II",
        course_numbers: ["8601"],
      },
    ],
  },
  //ネットワーク
  {
    name: "伊藤 嘉浩",
    course: [
      {
        title: "情報ネットワーク",
        course_numbers: ["2602"],
      },
      {
        title: "情報通信政策",
        course_numbers: ["2621"],
      },
      {
        title: "コンピュータ入門",
        course_numbers: ["5604"],
      },
      {
        title: "システムプログラム",
        course_numbers: ["6606"],
      },
      {
        title: "形式言語とオートマトン",
        course_numbers: ["6627"],
      },
    ],
  },
  {
    name: "片山 喜章",
    course: [
      {
        title: "情報工学概論",
        course_numbers: ["0601"],
      },
      {
        title: "データ構造とアルゴリズム",
        course_numbers: ["1604"],
      },
      {
        title: "情報数学 I",
        course_numbers: ["5610"],
      },
      {
        title: "形式言語とオートマトン",
        course_numbers: ["6629"],
      },
    ],
  },
  {
    name: "金 鈴煥",
    course: [
      {
        title: "情報数学 II",
        course_numbers: ["1612"],
      },
    ],
  },
  {
    name: "齋藤 彰一",
    course: [
      {
        title: "情報セキュリティ",
        course_numbers: ["7619", "7621"],
      },
    ],
  },
  {
    name: "掛井 将平",
    course: [
      {
        title: "ネットワーク系演習Ⅰ",
        course_numbers: ["2616"],
      },
    ],
  },
  {
    name: "津邑 公暁",
    course: [
      {
        title: "デジタル回路",
        course_numbers: ["0606"],
      },
      {
        title: "コンピューターアーキテクチャⅠ",
        course_numbers: ["1607", "1609"],
      },
      {
        title: "コンピューターアーキテクチャⅡ",
        course_numbers: ["6633"],
      },
    ],
  },
  {
    name: "松尾 啓志",
    course: [
      {
        title: "ソフトウェア工学セミナーⅠ",
        course_numbers: ["2609"],
      },
      {
        title: "プログラミングⅠ",
        course_numbers: ["5608"],
      },
      {
        title: "OS",
        course_numbers: ["6601", "6602", "6603"],
      },
    ],
  },
  {
    name: "和田山 正",
    course: [
      {
        title: "情報理論",
        course_numbers: ["1601", "1602"],
      },
      {
        title: "情報数学Ⅱ",
        course_numbers: ["1614"],
      },
    ],
  },
  {
    name: "中井 彩乃",
    course: [
      {
        title: "ネットワーク系演習Ⅱ",
        course_numbers: ["7623"],
      },
    ],
  },
  {
    name: "川島 龍太",
    course: [
      {
        title: "データ構造とアルゴリズム",
        course_numbers: ["1606"],
      },
      {
        title: "コンパイラ",
        course_numbers: ["6604"],
      },
    ],
  },
  {
    name: "千頭 昇",
    course: [
      {
        title: "フーリエ解析",
        course_numbers: ["1615"],
      },
      {
        title: "数理科学",
        course_numbers: ["3602"],
      },
    ],
  },
  {
    name: "布目 敏郎",
    course: [
      {
        title: "情報ネットワーク",
        course_numbers: ["2601"],
      },
      {
        title: "分散システム論",
        course_numbers: ["7605"],
      },
    ],
  },
  {
    name: "福嶋 慶繁",
    course: [
      {
        title: "プログラミング言語論",
        course_numbers: ["2604"],
      },
      {
        title: "プログラミング応用",
        course_numbers: ["2615"],
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
      firebaseUid: "dummy-firebase-uid",
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
