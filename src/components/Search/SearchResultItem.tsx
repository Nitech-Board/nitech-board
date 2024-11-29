import { CourseSummary } from "../../types/course";

export const SearchResultItem = ({ result }: { result: CourseSummary }) => {
  const { classNumber, name } = result;

  return (
    <li>
      <a href={`/class-detail/${classNumber}`}>{`${classNumber}：${name}`}</a>
    </li>
  );
};
