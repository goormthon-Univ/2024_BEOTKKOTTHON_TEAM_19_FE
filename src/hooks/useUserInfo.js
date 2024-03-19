import { create } from "zustand";

const defaultState = { accessToken: "", nickname: "" };

const useUserInfo = create((set) => ({
  userInfo: defaultState,
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  },
}));

export default useUserInfo;
