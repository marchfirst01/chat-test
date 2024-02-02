import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const chatInfoState = atom({
  key: "chatInfoState",
  default: {},
});
