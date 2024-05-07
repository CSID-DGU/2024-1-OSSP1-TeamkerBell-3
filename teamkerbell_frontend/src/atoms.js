// atoms.js
import { atom } from "recoil";

export const listState = atom({
  key: "listState",
  default: 0,
  /* categories 배열을 불러올 수 없어 배열 길이 지정*/
});

export const categoryState = atom({
  key: "categoryState",
  default: 0,
});
