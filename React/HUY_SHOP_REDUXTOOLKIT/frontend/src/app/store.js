import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../modules/Auth/userSlice";
import cartReducer from "../modules/Cart/cartSlice";

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
