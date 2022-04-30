import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userType: null,
  userData: null,
  hotelData: null
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
    updateUserId: (state, action) => {
      state.userId = action.payload.userId;
    },
    clearContext: (state) => {
      state = initialState;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setHotelData: (state, action) => {
      if (state.userType === "hotel") {
        state.hotelData = action.payload;
      }
    }
  }
});

export const { initiateUserState, updateUserType, clearContext, updateUserId, setUserData, setHotelData } =
  contextSlice.actions;

export default contextSlice.reducer;
