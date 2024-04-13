import { configureStore } from "@reduxjs/toolkit";
import textFieldsReducer from "../reudux/features/inputSlice";

export const store = configureStore({
  reducer: {
    textFields: textFieldsReducer,
  },
});
