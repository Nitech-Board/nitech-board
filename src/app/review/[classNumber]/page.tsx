"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { RatingInput } from "../../../components/Review/RatingInput";
import { TextInput } from "../../../components/Review/TextInput";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ReviewData } from "@/types/course";
import Swal from "sweetalert2";
import { useAuth } from "@/components/provider/AuthProvider";

export default function WebSocketPage() {
  const [clearityRating, setClarityRating] = useState<number | null>(null);
  const [testRating, setTestRating] = useState<number | null>(null);
  const [homeworkRating, setHomeworkRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const { classNumber } = useParams();

  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !router) return;

    const checkProfile = async () => {
      const token = await user.getIdToken();
      // プロフィールが存在するか確認
      const res = await fetch("/api/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) return; // プロフィールが存在する場合
      // その他のエラー
      if (res.status !== 404) {
        Swal.fire({
          title: "エラー" + res.status,
          icon: "error",
          text: res.statusText,
        });
        return;
      }
      // プロフィールが存在しない場合
      Swal.fire({
        title: "プロフィールが存在しません",
        text: "レビューを投稿するにはプロフィールを作成してください",
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        keydownListenerCapture: true,
      }).then(() => {
        router.push("/profile");
      });
    };
    checkProfile();
  }, [user, router]);

  const funcSubmit = async () => {
    // 全ての評価が設定されているか確認
    if (
      clearityRating === null ||
      testRating === null ||
      homeworkRating === null
    ) {
      Swal.fire({
        title: "入力エラー",
        text: "全ての評価項目を入力してください",
        icon: "warning",
      });
      return;
    }

    const reviewData: ReviewData = {
      clearityRating,
      testRating,
      homeworkRating,
      comment,
    };

    const token = await user.getIdToken();

    setIsButtonDisabled(true);
    fetch(`/api/review/${classNumber}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reviewData }),
    }).then((res) => {
      if (res.status !== 200) {
        Swal.fire({
          title: "エラーが発生しました",
          text: "時間割番号が間違っている可能性があります",
          icon: "error",
        });
        setIsButtonDisabled(false);
        return;
      }
      Swal.fire({
        title: "レビューを投稿しました",
        icon: "success",
      }).then(() => {
        router.push(`/class-detail/${classNumber}`);
      });
    });
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
        disabled={isButtonDisabled}
      >
        投稿
      </Button>
    </div>
  );
}
