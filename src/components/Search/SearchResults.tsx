import { CourseSummary } from "../../types/course";
import { SearchResultItem } from "./SearchResultItem";

export const SearchResults = ({ results }: { results: CourseSummary[] }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <p>検索結果</p>
      <ul>
        {results.map((result, index) => (
          <SearchResultItem key={index} result={result} />
        ))}
      </ul>
    </div>
  );
};
