import * as React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface RaderProps {
  onScoreCalculated: (averageScore: number) => void;
}

function Rader({ onScoreCalculated }: RaderProps) {
  const data = [
    {
      subject: "授業のわかりやすさ",
      score: 3.75,
      fullMark: 5,
    },
    {
      subject: "テストの簡単さ",
      score: 4.2,
      fullMark: 5,
    },
    {
      subject: "課題の楽さ",
      score: 2.5,
      fullMark: 5,
    },
  ];

  // 平均スコアを計算
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
