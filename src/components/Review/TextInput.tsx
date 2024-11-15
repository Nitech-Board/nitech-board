export const TextInput = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="レビュー内容を入力してください"
    />
  );
};
