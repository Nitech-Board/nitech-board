export const RatingInput = (props) => {
  const { rating, onChange } = props;

  return (
    <div>
      {/* <label>評価：{rating}</label> */}
      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
