import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state, { payload }) => {
      console.log(payload.user); // Highlighted payload.user
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {}; // Highlighted user clearance
    },
  },
});

export const { getUser, logout } = authSlice.actions;
export default authSlice.reducer;


