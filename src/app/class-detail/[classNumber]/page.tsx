"use client";

import { useState, useEffect } from "react";
import ClassData from "../../../components/class-detail/ClassData";
import { useParams, useRouter } from "next/navigation";

interface ClassData {
  num: string;
  name: string;
  teacher: string;
  location: string;
}

export default function ClassDetailPage() {
  const [classData, setClassData] = useState<ClassData | undefined>();
  const router = useRouter();

  // URLパスから授業番号を抽出
  const { classNumber } = useParams();

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

    console.log(classNumber);

    const courseDetail = courses.find((course) => course.num === classNumber);
    setClassData(courseDetail);
  }, [classNumber]);

  // 投稿ボタンが押された時に呼ばれる関数
  const handleAddReview = () => {
    router.push(`/review/${classNumber}`);
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
