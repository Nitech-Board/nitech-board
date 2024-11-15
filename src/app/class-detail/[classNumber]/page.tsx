"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ClassData from "../../../components/class-detail/ClassData";

interface ClassData {
  num: string;
  name: string;
  teacher: string;
  location: string;
}

export default function ClassDetailPage() {
  const pathname = usePathname();
  const [classData, setClassData] = useState<ClassData | undefined>();

  // URLパスから授業番号を抽出
  const courseNumber = pathname.split("/").pop();

  useEffect(() => {
    const courses = [
      {
        num: "7262",
        name: "パターン認識",
        teacher: "本谷 秀堅",
        location: "教室A",
      },
      {
        num: "8151",
        name: "人工知能",
        teacher: "山田 太郎",
        location: "教室B",
      },
      {
        num: "9123",
        name: "コンピュータビジョン",
        teacher: "鈴木 一郎",
        location: "教室C",
      },
    ];

    const courseDetail = courses.find((course) => course.num === courseNumber);
    setClassData(courseDetail);
  }, [courseNumber]);
  // 投稿ボタンが押された時に呼ばれる関数
  const handleAddReview = () => {
    window.location.href = "../review"; // 遷移先のURL
  };

  if (!classData) return <p>授業情報が見つかりません。</p>;

  return (
    <div>
      <ClassData details={classData} />
      <button onClick={handleAddReview} className="button-link">
        レビューを投稿
      </button>
    </div>
  );
}
