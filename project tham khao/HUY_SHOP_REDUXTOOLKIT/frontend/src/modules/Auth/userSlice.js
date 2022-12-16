import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../api/AuthService";
import StorageKeys from "../../constants/storage-key";

export const register = createAsyncThunk("user/register", async (payload) => {
  const res = await AuthService.register(payload);
  return res.data.id;
});
export const setPassword = createAsyncThunk(
  "user/password",
  async (payload) => {
    const res = await AuthService.setPassword(payload);
    return res.data.user;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const res = await AuthService.login(username, password);
    localStorage.setItem(StorageKeys.TOKEN, res.data.id);
    const resUser = await AuthService.getUserInfo();
    localStorage.setItem(StorageKeys.USER, JSON.stringify(resUser.data));
    return resUser.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || "",
    settings: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
