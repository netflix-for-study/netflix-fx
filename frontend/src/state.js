import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    profilePicture: "",
    username: "",
    _id: "",
  },
});

export const authTokenState = atom({
  key: "authTokenState",
  default: "",
});
