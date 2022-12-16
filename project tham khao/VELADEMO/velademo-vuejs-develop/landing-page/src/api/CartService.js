import request from "./request";

const API_ENDPOINT = {
  CART_CURRENT: "/api/cart/",
  CART_UPDATE: "/api/cart/add",
};
class CartService {
  constructor() {
    if (CartService._instance) {
      return CartService._instance;
    }
    CartService._instance = this;
  }
  getCartCurrent(userId) {
    return request.get(API_ENDPOINT.CART_CURRENT + `${userId}`);
  }
  postCartUpdate(data) {
    return request.post(API_ENDPOINT.CART_UPDATE, data);
  }
}

const Service = new CartService();

export default Service;
