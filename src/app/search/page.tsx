"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { SearchResults } from "../../components/Search/SearchResults";
import { CourseSummary } from "../../types/course";
import { SearchForm } from "../../components/Search/SearchForm";
import { useAuth } from "@/components/provider/AuthProvider";

export default function WebSocketPage() {
  const [courseList, setCourseList] = useState<CourseSummary[] | undefined>(
    undefined
  );
  const [searchResults, setSearchResults] = useState<CourseSummary[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const user = useAuth();

  // 初期表示時に授業一覧を取得
  useEffect(() => {
    if (!user) return;
    const fetchCourseList = async () => {
      const token = await user.getIdToken();
      fetch("/api/course-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCourseList(data);
        });
    };

    fetchCourseList();
  }, [user]);

  // 子コンポーネントから受け取った検索条件を処理
  const handleSearch = (query: {
    courseNumber: string;
    name: string;
    teacher: string;
  }) => {
    if (!courseList) return;
    const results = funcSearch(query);
    setSearchResults(results);
    setHasSearched(true);
  };

  const funcSearch = (query: {
    courseNumber: string;
    name: string;
    teacher: string;
  }) => {
    return courseList.filter((courseSummary) => {
      const courseNumberMatches = courseSummary.courseNumber.startsWith(
        query.courseNumber
      ); // 時間割番号の前方一致

      const nameMatches = courseSummary.name.includes(query.name); // 科目名の部分一致

      const teacherMatches = courseSummary.teacher.includes(query.teacher); // 教員名の部分一致

      return courseNumberMatches && nameMatches && teacherMatches;
    });
  };

  return (
    <div className={styles.body}>
      <h1>コースを検索</h1>
      <SearchForm isButtonDisabled={!courseList} onSearch={handleSearch} />
      {hasSearched && <SearchResults results={searchResults} />}
    </div>
  );
}
