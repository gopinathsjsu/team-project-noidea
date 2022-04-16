import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: {}
};

export const globalUISlice = createSlice({
  name: "globalUI",
  initialState,
  reducers: {
    triggerMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = undefined;
    },
    setGlobalLoad: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { triggerMessage, clearMessage, setGlobalLoad } = globalUISlice.actions;

export default globalUISlice.reducer;
