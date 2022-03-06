import { configureStore } from "@reduxjs/toolkit";
import contextSlice from "./context/contextSlice";

export default configureStore(
  {
    reducer: {
      context: contextSlice
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
