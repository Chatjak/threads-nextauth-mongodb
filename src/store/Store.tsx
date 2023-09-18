import { post, user } from "@/types/model";
import { atom } from "recoil";

export const posts = atom<any>({
  key: "posts",
  default: {
    user: {
      email: "",
      name: "",
      image: "",
    },
    description: "",
  },
});

export const currentUser = atom({
  key: "user",
  default: null,
});
