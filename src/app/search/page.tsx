"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { SearchResults } from "../../components/Search/SearchResults";
import { ClassSummary } from "../../types/course";

export default function WebSocketPage() {
  const [courseNumber, setCourseNumber] = useState("");
  const [classList, setClassList] = useState<ClassSummary[]>([]);
  const [searchResults, setSearchResults] = useState<ClassSummary[]>([]);

  // 初期表示時に授業一覧を取得（バックエンドAPIを通してデータを取得する）
  useEffect(() => {
    fetch("/api/class-list")
      .then((res) => res.json())
      .then((data) => {
        setClassList(data);
      });
  }, []);

  const handleInputChange = (e) => setCourseNumber(e.target.value);

  // 検索ボタン押下時の処理
  const handleSearch = () => {
    const results = funcSearch(courseNumber);
    setSearchResults(results);
  };

  // 検索処理
  const funcSearch = (courseNumber) => {
    return classList.filter((classSummary) =>
      classSummary.classNumber.includes(courseNumber)
    );
  };

  return (
    <>
      <div className={styles.search_page}>
        <label>
          <p>授業番号：</p>
          <p>
            <input
              type="text"
              name="search"
              value={courseNumber}
              onChange={handleInputChange}
            ></input>
          </p>
        </label>
        <p>
          <button type="submit" onClick={handleSearch}>
            検索
          </button>
        </p>
      </div>
      <div style={{ padding: "10px" }}>
        <SearchResults results={searchResults} />
      </div>
    </>
  );
}
