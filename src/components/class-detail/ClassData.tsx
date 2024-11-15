import React from "react";

interface ClassDataProps {
  details: {
    num: string;
    name: string;
    teacher: string;
    location: string;
  };
}

const ClassData: React.FC<ClassDataProps> = ({ details }) => {
  return (
    <div className="class-details">
      <h2>{details.name}</h2>
      <p>
        <strong>授業名:</strong> {details.name}
      </p>
      <p>
        <strong>教員:</strong> {details.teacher}
      </p>
      <p>
        <strong>時間割番号:</strong> {details.num}
      </p>
      <p>
        <strong>講義室:</strong> {details.location}
      </p>
      <p>
        <strong>シラバス：</strong>リンクを付ける？？
      </p>
    </div>
  );
};

export default ClassData;
