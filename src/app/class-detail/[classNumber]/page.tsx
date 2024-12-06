"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ClassData from "../../../components/class-detail/ClassData";
import Rader from "../../../components/class-detail/Rader";
import styles from "./page.module.css";
import { Rating } from "@mui/material";

interface ClassData {
  num: string;
  name: string;
  teacher: string;
  location: string;
}

export default function ClassDetailPage() {
  const [classData, setClassData] = useState<ClassData | undefined>();
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const router = useRouter();

  // URLパスから授業番号を取得
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

    const courseDetail = courses.find((course) => course.num === classNumber);
    setClassData(courseDetail);
  }, [classNumber]);

  // 投稿ボタンが押された時
  const handleAddReview = () => {
    router.push(`/review/${classNumber}`);
  };

  // レーダーチャートで計算した総合評価を受け取る関数
  const handleScoreCalculated = (averageScore: number) => {
    setAverageScore(averageScore);
  };

  if (!classData)
    return <div className={styles.container}>授業情報が見つかりません。</div>;

  return (
    <div className={styles.container}>
      <h1>
        {classData.name}{" "}
        {averageScore !== null && (
          <>
            <span className={styles.totalvalue}>{averageScore.toFixed(2)}</span>
            {/* 総合評価を★で表示 */}
            <Rating value={averageScore} precision={0.1} readOnly />
          </>
        )}
      </h1>
      <ClassData details={classData} />
      <Rader onScoreCalculated={handleScoreCalculated} />
      <button onClick={handleAddReview} className={styles.postButton}>
        レビューを投稿
      </button>
    </div>
  );
}
