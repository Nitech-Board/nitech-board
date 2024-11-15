export const SearchResultItem = ({ result }) => {
  const { num, name } = result;

  return (
    <li>
      {/* <a href={ここに飛ぶページへのパス}>{`${num}：${name}`}</a>*/}
      <p>{`${num}：${name}`}</p>
    </li>
  );
};
