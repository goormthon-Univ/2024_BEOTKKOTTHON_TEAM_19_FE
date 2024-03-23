import { create } from "zustand";

const defaultState = {
  accessToken: "",
  id: null,
  username: "",
  nickname: "",
  feedback: false,
  treeId: null,
};

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
