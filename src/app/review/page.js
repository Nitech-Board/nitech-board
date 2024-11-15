"use client";

import { useState } from 'react';

export default function ReviewPage() {
  const [year, setYear] = useState('2024');
  const [difficulty, setDifficulty] = useState('すごく大変');
  const [isSubmitted, setIsSubmitted] = useState(false); // 送信完了を管理する状態

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  // 送信ボタンが押されたときの処理
  const handleSubmit = () => {
    // 本来はここで送信処理を行う（API呼び出しなど）
    setIsSubmitted(true); // 送信完了を表す状態をtrueにする
  };

  // 送信後の画面を表示する処理
  if (isSubmitted) {
    return <div>回答ありがとうございます</div>;
  }

  return (
    <div>
      <h1>レビュー投稿ページ</h1>

      <h2>授業を受けた年度</h2>
      <p>
        <select name="授業を受けた年度" value={year} onChange={handleYearChange}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="それより前or不明">それより前or不明</option>
        </select>
      </p>

      <h3>課題の大変さ</h3>
      <p>
        <select name="課題の大変さ" value={difficulty} onChange={handleDifficultyChange}>
          <option value="すごく大変">すごく大変</option>
          <option value="余裕">余裕</option>
        </select>
      </p>

      <button onClick={handleSubmit}>レビューを送信</button>
    </div>
  );
}
