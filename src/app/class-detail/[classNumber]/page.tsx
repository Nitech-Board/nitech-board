"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ClassData from "../../../components/class-detail/ClassData";
import Rader from "../../../components/class-detail/Rader";
import styles from "./page.module.css";
import { Rating } from "@mui/material";
import { CourseDetailWithReviews } from "@/types/course";

export default function ClassDetailPage() {
  const [courseDataWithReviews, setCourseDataWithReviews] = useState<
    CourseDetailWithReviews | undefined
  >();
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const router = useRouter();

  // URLパスから授業番号を取得
  const { classNumber } = useParams();

  useEffect(() => {
    fetch(`/api/course-detail/${classNumber}`)
      .then((res) => {
        if (res.status === 200) return res.json();
        else {
          setCourseDataWithReviews(null);
          throw new Error("授業情報が見つかりません");
        }
      })
      .then((data) => {
        setCourseDataWithReviews(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classNumber]);

  // 投稿ボタンが押された時
  const handleAddReview = () => {
    router.push(`/review/${classNumber}`);
  };

  // レーダーチャートで計算した総合評価を受け取る関数
  const handleScoreCalculated = (averageScore: number) => {
    setAverageScore(averageScore);
  };

  if (courseDataWithReviews === undefined)
    return <div className={styles.container}>Loading...</div>;

  if (courseDataWithReviews === null)
    return <div className={styles.container}>授業情報が見つかりません。</div>;

  return (
    <div className={styles.container}>
      <h1>
        {courseDataWithReviews.course.title}{" "}
        {averageScore !== null && (
          <>
            <span className={styles.total_value}>
              {averageScore.toFixed(2)}
            </span>
            {/* 総合評価を★で表示 */}
            <Rating value={averageScore} precision={0.1} readOnly />
          </>
        )}
      </h1>
      <ClassData details={courseDataWithReviews.course} />
      <Rader onScoreCalculated={handleScoreCalculated} />
      <button onClick={handleAddReview} className={styles.post_button}>
        レビューを投稿
      </button>
    </div>
  );
}
