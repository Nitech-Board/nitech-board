import { CourseSummary } from "../../types/course";

export const SearchResultItem = ({ result }: { result: CourseSummary }) => {
  const { courseNumber, name } = result;

  return (
    <li>
      <a href={`/class-detail/${courseNumber}`}>{`${courseNumber}：${name}`}</a>
    </li>
  );
};
