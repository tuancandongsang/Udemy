import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import OrderService from "../../api/OrderService";
import StorageKeys from "../../constants/storage-key";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalItem: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].cartQuantity =
          Number(state.cartItems[existingIndex].cartQuantity) +
          Number(action.payload.cartQuantity);
      } else {
        let tempProductItem = {
          ...action.payload,
          cartQuantity: action.payload.cartQuantity,
        };
        state.cartItems.push(tempProductItem);
        message.success("Bạn vừa thêm 1 sản phẩm vào giỏ hàng!");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex].cartQuantity++;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    inputAmountCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex] = {
        ...state.cartItems[itemIndex],
        cartQuantity: action.payload.cartQuantity,
      };
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity--;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    checkOut(state) {
      OrderService.create({
        customer_id: JSON.parse(localStorage.getItem(StorageKeys.USER)).session
          .customer_id,
        itemParams: {
          product_id: state.cartItems[0].id,
          amount: state.cartItems[0].cartQuantity,
        },
      });
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity++;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalItem = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  inputAmountCart,
  getTotals,
  clearCart,
  increaseCart,
  checkOut,
} = cartSlice.actions;

export default cartSlice.reducer;
