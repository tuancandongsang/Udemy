import CartService from "@/api/CartService";
import { arraymove } from "@/components/comon/common";
import {getUserIdCart } from '@/utils/helpers'

const cart = {
  state: {
    visibleCart: false,
    cart: [],
    cartNotLogin:[],
  },
  mutations: {
    UPDATE_CART_NOTLOGIN(state, data){
      state.cartNotLogin = data
    },
    UPDATE_CART_CURRENT(state, data) {
      state.cart = data
    },
    ISVISIBLE_CART(state) {
      state.visibleCart = true;
    },
    CLOSE_CART(state) {
      state.visibleCart = false;
    },
    ADD_PRODUCT_ONE(state, data) {
      const index = state.cart.findIndex((item) => item.id === data.id);
      if (index === -1) {
        state.cart.unshift(data);
      } else {
        state.cart[index].quantity = state.cart[index].quantity + 1;
        if (state.cart.length > 1) {
          arraymove(state.cart, index, 0);
        }
      }
    },
    LOGOUT_CART(state){
      state.cart=[]
    },
    ADD_PRODUCT_DETAIL(state, payload) {
      const index = state.cart.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        state.cart.unshift(payload.data);
      } else {
        state.cart[index].quantity =
          state.cart[index].quantity + payload.data.quantity;
        if (state.cart.length > 1) {
          arraymove(state.cart, index, 0);
        }
      }
    },
    DELETE_ITEM_CART(state, id) {
      const index = state.cart.findIndex((item) => item.id === id);
      state.cart.splice(index, 1);
    },
  },
  actions: {
    async updateCartCurrent(context) {
      const userId = getUserIdCart()
      try {
        if(userId){
          const data = await CartService.getCartCurrent(userId);
          context.commit("UPDATE_CART_CURRENT", data);
        }
      } catch (error) {
        console.log("chua co du lieu trong gio hang");
      }
    },
    async updateCart(_, data) {
      const userId = getUserIdCart()
      try {
        const dataUdpateCart = data?.map((item) => ({
          id: item.id,
          count: item?.quantity,
        }));
        const dataSubmit = {
          userid: userId,
          productRequestList: dataUdpateCart,
        };
        await CartService.postCartUpdate( dataSubmit);
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {},
};

export default cart;
