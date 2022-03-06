import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userType: "admin"
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    initiateUserState: (state, action) => {
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
    },
    updateUserType: (state, action) => {
      state.userType = action.payload.userType;
    },
    clearContext: (state) => {
      state = initialState;
    }
  }
});

export const { initiateUserState, updateUserType, clearContext } = contextSlice.actions;

export default contextSlice.reducer;
