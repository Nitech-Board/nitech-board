import React from "react";
import { CourseSummary } from "../../types/course";
import styles from "./SearchResults.module.css";

export const SearchResults = ({ results }: { results: CourseSummary[] }) => {
  return (
    <div className={styles.container}>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className={styles.resultCard}>
            <div className={styles.courseNumber}>
              <strong>時間割番号:</strong> {result.courseNumber}
            </div>
            <div className={styles.courseName}>
              <strong>授業科目名:</strong>{" "}
              <a
                href={`/class-detail/${result.courseNumber}`}
                className={styles.link}
              >
                {result.name}
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noResults}>検索結果なし</p>
      )}
    </div>
  );
};
