import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../api/AuthService";

const initialState = {
  stateLogin: "login",
};

// export const login = createAsyncThunk("post/login", async (param) => {
//   try {
//     const response = await AuthService.login(param);

//     return response;
//   } catch (error) {}
// });

const detailSlice: any = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setStateLogin: (state, action) => {
      state.stateLogin = action.payload;
    },
  },
});
export const { setStateLogin } = detailSlice.actions;

export default detailSlice.reducer;
