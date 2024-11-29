//cuids.jsonからcuidを取得する
import cuids from "./cuids.json";

let index = 0;
export const getCuid = () => {
  const cuid = cuids[index];
  index += 1;
  return cuid;
};
