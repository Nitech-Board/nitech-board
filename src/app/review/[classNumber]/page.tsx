"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { RatingInput } from "../../../components/Review/RatingInput";
import { TextInput } from "../../../components/Review/TextInput";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ReviewData } from "@/types/course";

export default function WebSocketPage() {
  const [clearityRating, setClarityRating] = useState<number | null>(null);
  const [testRating, setTestRating] = useState<number | null>(null);
  const [homeworkRating, setHomeworkRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const { classNumber } = useParams();
  const router = useRouter();

  const funcSubmit = () => {
    // 全ての評価が設定されているか確認
    if (
      clearityRating === null ||
      testRating === null ||
      homeworkRating === null
    ) {
      alert("全ての評価項目を入力してください。");
      return;
    }

    const reviewData: ReviewData = {
      clearityRating,
      testRating,
      homeworkRating,
      comment,
    };

    fetch(`/api/review/${classNumber}`, {
      method: "POST",
      body: JSON.stringify({ reviewData }),
    }).then((res) => {
      if (res.status === 404) {
        alert("授業情報が見つかりません");
        return;
      }
      if (res.status !== 200) {
        alert("エラーが発生しました");
        return;
      }
      alert("レビューを投稿しました");
    });

    router.push("/search");
  };

  return (
    <div className={styles.reviewForm}>
      <h1>レビューを投稿</h1>

      <div className={styles.value}>
        <div>授業のわかりやすさ</div>
        <RatingInput
          rating={clearityRating || 0}
          onChange={(value) => setClarityRating(value)}
        />
      </div>

      <div className={styles.value}>
        <div>テストの簡単さ</div>
        <RatingInput
          rating={testRating || 0}
          onChange={(value) => setTestRating(value)}
        />
      </div>

      <div className={styles.value}>
        <div>課題の楽さ</div>
        <RatingInput
          rating={homeworkRating || 0}
          onChange={(value) => setHomeworkRating(value)}
        />
      </div>

      <div className={styles.comment}>
        <TextInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="コメントを入力してください"
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={funcSubmit}
        className={styles.submitButton}
      >
        投稿
      </Button>
    </div>
  );
}
