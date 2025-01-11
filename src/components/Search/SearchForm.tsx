"use client";

import React, { useState } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSearch: (query: {
    courseNumber: string;
    name: string;
    teacher: string;
  }) => void;
  isButtonDisabled: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isButtonDisabled,
}) => {
  const [courseNumber, setCourseNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [teacher, setTeacher] = useState<string>("");

  const handleCourseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseNumber(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch({ courseNumber, name, teacher });
  };

  return (
    <div className={styles.body}>
      <p>時間割番号</p>
      <input
        type="text"
        value={courseNumber}
        onChange={handleCourseNumberChange}
      />
      <p>科目名</p>
      <input type="text" value={name} onChange={handleNameChange} />
      <p>教員名</p>
      <input type="text" value={teacher} onChange={handleTeacherChange} />
      <button
        disabled={isButtonDisabled}
        type="button"
        onClick={handleSearchClick}
      >
        検索
      </button>
    </div>
  );
};
