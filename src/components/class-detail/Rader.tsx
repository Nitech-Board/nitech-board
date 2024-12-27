import * as React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { ReviewDataWithStudent } from "@/types/course";

interface RaderProps {
  reviews: ReviewDataWithStudent[];
  onScoreCalculated: (averageScore: number) => void;
}

function Rader({ reviews, onScoreCalculated }: RaderProps) {
  // レビューから各項目の平均を計算
  const calculateAverage = (
    key: keyof Pick<
      ReviewDataWithStudent,
      "clearityRating" | "testRating" | "homeworkRating"
    >
  ): number => {
    if (reviews.length === 0) return 0; // レビューがない場合は0を返す

    const total = reviews.reduce((sum, review) => sum + review[key], 0);
    return total / reviews.length;
  };

  // レーダーチャート用データ
  const data = [
    {
      subject: "授業のわかりやすさ",
      score: calculateAverage("clearityRating"),
      fullMark: 5,
    },
    {
      subject: "テストの簡単さ",
      score: calculateAverage("testRating"),
      fullMark: 5,
    },
    {
      subject: "課題の楽さ",
      score: calculateAverage("homeworkRating"),
      fullMark: 5,
    },
  ];

  // 全体の平均スコアを計算
  const averageScore =
    data.reduce((sum, item) => sum + item.score, 0) / data.length;

  // 親コンポーネントに平均スコアを渡す
  React.useEffect(() => {
    onScoreCalculated(averageScore);
  }, [averageScore, onScoreCalculated]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />
        <Radar
          dataKey="score"
          stroke="#606DC2"
          fill="#606DC2"
          fillOpacity={0.2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default Rader;
