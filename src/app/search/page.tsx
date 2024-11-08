"use client"; //chatGPTに聞いた。これがないとなぜかコンパイルエラー。

import styles from "./page.module.css";
import { useState } from "react";
import { SearchResults } from "../../components/Search/SearchResults";

const funcSearch = (courseNumber) => {
  const courses = [
    { num: "7262", name: "パターン認識" },
    { num: "8151", name: "人工知能" },
    { num: "9123", name: "コンピュータビジョン" },
  ]; //course配列にすべてのnumと授業名のデータが欲しい。
  return courses.filter((course) => course.num.includes(courseNumber));
};

export default function WebSocketPage() {
  const [courseNumber, setCourseNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => setCourseNumber(e.target.value);

  const handleSearch = () => {
    const results = funcSearch(courseNumber); //funcSearchは授業番号から授業を返す。backendで作ってもらう。
    setSearchResults(results);
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
