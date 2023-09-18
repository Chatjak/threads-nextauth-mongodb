import { atom } from "recoil";

export const posts = atom({
  key: "posts",
  default: "test from recoil",
});

export const currentUser = atom({
  key: "user",
  default: null,
});
