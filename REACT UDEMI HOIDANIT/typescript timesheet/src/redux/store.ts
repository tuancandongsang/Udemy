import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/login/userSlice";

const rootReducer = {
  user: userReducer
};

export default configureStore({
  reducer: rootReducer
});
