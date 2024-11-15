"use client"; //chatGPTに聞いた。これがないとなぜかコンパイルエラー。

import { useState } from "react";
import { RatingInput } from "../../components/Review/RatingInput";
import { TextInput } from "../../components/Review/TextInput";
import { useRouter } from "next/navigation";

export default function WebSocketPage() {
  const [clarityRating, setClarityRating] = useState(0);
  const [testRating, setTestRating] = useState(0);
  const [assignmentRating, setAssignmentRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter(); //GPTに聞いた。ページ遷移に使用する変数。

  const handleClarityChange = (rating) => setClarityRating(rating);

  const handleTestChange = (rating) => setTestRating(rating);

  const handleAssignmentChange = (rating) => setAssignmentRating(rating);

  const handleCommentChange = (e) => setComment(e.target.value);

  const funcSubmit = () => {
    //alertと検索画面に飛ぶ
    alert("送信しました");
    router.push("/search"); //urlは変わるけど自分で更新ボタンを押さないとページが変わらない
    //この中でStateの値をバックエンドに渡すように書けばいいのかな？APIリスエストとかいうやつ？
  };

  return (
    <div className="reviewForm">
      <h2>レビューを投稿</h2>
      <h3>分かりやすさ：</h3>
      <div>
        分かりやすい
        <RatingInput rating={clarityRating} onChange={handleClarityChange} />
        分かりにくい
      </div>
      <h3>テスト：</h3>
      <div>
        簡単
        <RatingInput rating={testRating} onChange={handleTestChange} />
        難しい
      </div>
      <h3>課題：</h3>
      <div>
        楽
        <RatingInput
          rating={assignmentRating}
          onChange={handleAssignmentChange}
        />
        大変
      </div>
      <div>
        <TextInput value={comment} onChange={handleCommentChange} />
      </div>
      <button type="submit" onClick={funcSubmit}>
        送信
      </button>
    </div>
  );
}

//書いてもらったレビューはStateにあるけどそれをどうやって詳細ページに表示するか。
