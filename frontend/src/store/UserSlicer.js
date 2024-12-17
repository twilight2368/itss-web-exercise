import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_info: null,
  user_id: localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : "",
  token: localStorage.getItem("jwt") ? localStorage.getItem("jwt") : "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserId: (state, action) => {
      state.user_id = action.payload;
      localStorage.setItem("user_id", action.payload);
    },
    setUserInfo: (state, action) => {
      state.user_info = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("jwt", action.payload); // Persist token to localStorage
    },
    clearToken: (state, action) => {
      state.token = "";
      localStorage.removeItem("jwt");
    },
    clearUserInfo: (state, action) => {
      state.user_info = null;
      state.user_id = "";
      state.token = "";
      localStorage.removeItem("user_id");
      localStorage.removeItem("jwt");
    },
  },
});

export const { setUserInfo, setUserId, setToken, clearUserInfo, clearToken } =
  UserSlice.actions;

export default UserSlice.reducer;
