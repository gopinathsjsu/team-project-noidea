import { configureStore } from "@reduxjs/toolkit";
import contextSlice from "./context/contextSlice";
import globalUISlice from "./globalUI/globalUISlice";
import hotelDataSlice from "./hotelData/hotelDataSlice";

export default configureStore(
  {
    reducer: {
      context: contextSlice,
      globalUI: globalUISlice,
      hotelData: hotelDataSlice
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
