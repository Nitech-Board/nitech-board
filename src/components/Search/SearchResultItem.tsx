export const SearchResultItem = ({ result }) => {
  const { num, name } = result;

  return (
    <li>
      <a href={`/class-detail/${num}`}>{`${num}：${name}`}</a>*/
      <p>{`${num}：${name}`}</p>
    </li>
  );
};
