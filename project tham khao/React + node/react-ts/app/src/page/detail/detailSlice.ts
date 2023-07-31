import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusItem: {},
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    changeToPageDetail: (state, action) => {
        state.statusItem = action.payload
    },
  },
  
});
export const { changeToPageDetail } = detailSlice.actions;

export default detailSlice.reducer;
