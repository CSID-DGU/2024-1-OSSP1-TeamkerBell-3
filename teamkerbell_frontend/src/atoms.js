// atoms.js
import { atom } from "recoil";

export const switchedState = atom({
  key: "switchedState",
  default: Array(7).fill(false),
  /* categories 배열을 불러올 수 없어 배열 길이 지정*/
});

export const categoryState = atom({
  key: "categoryState",
  default: 0,
});
