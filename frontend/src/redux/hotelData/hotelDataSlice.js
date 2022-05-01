import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  branches: [],
  amenities: []
};

export const hotelDataSlice = createSlice({
  name: "globalUI",
  initialState,
  reducers: {
    updateRoom: (state, action) => {
      state.rooms = action.payload;
    },
    updateBranches: (state, action) => {
      state.branches = action.payload;
    },
    updateAmenities: (state, action) => {
      state.amenities = action.payload;
    }
  }
});

export const { updateRoom, updateBranches, updateAmenities } = hotelDataSlice.actions;

export default hotelDataSlice.reducer;
