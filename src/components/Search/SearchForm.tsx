"use client";

import React, { useState } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSearch: (query: { courseNumber: string; name: string }) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [courseNumber, setCourseNumber] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleCourseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseNumber(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch({ courseNumber, name });
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
      <button type="button" onClick={handleSearchClick}>
        検索
      </button>
    </div>
  );
};
