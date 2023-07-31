import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../component/todoReducer";
import detailSlice from "../page/detail/detailSlice"

const rootReducer = {
  listTodos: todoReducer,
  detailSlice : detailSlice,
};
export const store = configureStore({
  reducer: rootReducer,
});

// export default store;
