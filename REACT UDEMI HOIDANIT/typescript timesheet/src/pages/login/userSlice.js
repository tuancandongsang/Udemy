import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../apis/UserApi";
import { setToken, getToken, removeToken } from "../../utils/helpers/localstorage";
import { Notification } from "../../utils/notication";

// eslint-disable-next-line require-await
export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await loginUser(data);
  if (res.data.assetToken === null) {
    Notification("error", "login", res.data.error);
  } else {
    Notification("success", "login", "Login success");
    setToken(res.data.assetToken);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: getToken() || "",
    settings: {}
  },
  reducers: {
    logout(state) {
      Notification("warning", "Logout", "Logout success");
      setTimeout(() => removeToken(), 1000);
      state.current = {};
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    }
  }
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
