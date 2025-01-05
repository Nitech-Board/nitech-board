import { Teacher } from "../seed";

const teachers: Teacher[] = [
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
];

export default teachers;
