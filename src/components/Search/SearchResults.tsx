import React from "react";
import { CourseSummary } from "../../types/course";
import styles from "./SearchResults.module.css";
import { GoComment } from "react-icons/go";

export const SearchResults = ({ results }: { results: CourseSummary[] }) => {
  return (
    <div className={styles.container}>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className={styles.resultCardContainer}>
            <div className={styles.resultCard}>
              <div className={styles.courseNumber}>
                <strong>時間割番号:</strong> {result.courseNumber}
              </div>
              <div className={styles.courseNumber}>
                <strong>担当教員:</strong> {result.teacher}
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
            <div className={styles.reviewCount}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <GoComment size={24} />
                <p>{result.reviewCount}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noResults}>検索結果なし</p>
      )}
    </div>
  );
};
