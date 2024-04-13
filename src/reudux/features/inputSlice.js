import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  emailAddress: "",
};

export const textFieldsSlice = createSlice({
  name: "textFields",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateEmailAddress: (state, action) => {
      state.emailAddress = action.payload;
    },
    resetFields: (state) => {
      state.address = "";
      state.emailAddress = "";
    },
  },
});

export const { updateAddress, updateEmailAddress, resetFields } =
  textFieldsSlice.actions;

export const selectAddress = (state) => state.textFields.address;
export const selectEmailAddress = (state) => state.textFields.emailAddress;

export default textFieldsSlice.reducer;
