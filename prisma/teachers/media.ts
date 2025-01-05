import { Teacher } from "../seed";

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

export default teachers;
