"use client";

import { useState } from "react";
import { SearchResults } from "../../components/Search/SearchResults";

const funcSearch = (courseNumber) => {
  const courses = [
    { num: "7262", name: "パターン認識" },
    { num: "8151", name: "人工知能" },
    { num: "9123", name: "コンピュータビジョン" },
  ];
  return courses.filter((course) => course.num.includes(courseNumber));
};

export default function SearchPage() {
  const [courseNumber, setCourseNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => setCourseNumber(e.target.value);

  const handleSearch = () => {
    const results = funcSearch(courseNumber);
    setSearchResults(results);
  };

  return (
    <>
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "5px", textAlign: "center" }}>
        <label>
          <p>授業番号：</p>
          <input
            type="text"
            name="search"
            value={courseNumber}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSearch}>検索</button>
      </div>
      <SearchResults results={searchResults} />
    </>
  );
}
