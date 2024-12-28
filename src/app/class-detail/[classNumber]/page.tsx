"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ClassData from "../../../components/class-detail/ClassData";
import Rader from "../../../components/class-detail/Rader";
import ReviewList from "../../../components/class-detail/ReviewList";
import styles from "./page.module.css";
import { Rating } from "@mui/material";
import { CourseDetailWithReviews } from "@/types/course";
import { useAuth } from "@/components/provider/AuthProvider";
import Loading from "@/components/Loading/Loading";

export default function ClassDetailPage() {
  const [courseDataWithReviews, setCourseDataWithReviews] = useState<
    CourseDetailWithReviews | null | undefined
  >(undefined);
  const user = useAuth();
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const router = useRouter();

  // URLパスから授業番号を取得
  const { classNumber } = useParams();

  useEffect(() => {
    if (!user || !classNumber) return;

    const fetchCourseDetail = async () => {
      const token = await user.getIdToken();

      try {
        const res = await fetch(`/api/course-detail/${classNumber}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          setCourseDataWithReviews(data);
        } else {
          throw new Error("授業情報が見つかりません");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetail();
  }, [user, classNumber]);

  // 投稿ボタンが押された時
  const handleAddReview = () => {
    router.push(`/review/${classNumber}`);
  };

  // レーダーチャートで計算した総合評価を受け取る関数
  const handleScoreCalculated = (averageScore: number) => {
    setAverageScore(averageScore);
  };

  if (courseDataWithReviews === undefined) return <Loading />;

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
      <Rader
        reviews={courseDataWithReviews.reviews}
        onScoreCalculated={handleScoreCalculated}
      />
      {courseDataWithReviews.reviews.length > 0 ? (
        <ReviewList reviews={courseDataWithReviews.reviews} />
      ) : (
        <p className={styles.noReviews}>まだレビューがありません。</p>
      )}

      <button onClick={handleAddReview} className={styles.post_button}>
        レビューを投稿
      </button>
    </div>
  );
}
