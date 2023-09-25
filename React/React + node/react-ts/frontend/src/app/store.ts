import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";
import loginSlice from "./loginSlice"

const rootReducer = {
  listTodos: todoReducer,
  loginSlice : loginSlice,
};
export const store = configureStore({
  reducer: rootReducer,
});

// export default store;
