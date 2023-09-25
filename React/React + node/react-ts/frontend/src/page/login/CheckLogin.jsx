import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utills/helpers/localstorage";
import { Notification } from "../../utills/notication.ts";

const CheckLogin = () => {
  const token = getToken();
  if (!token) {
    Notification("warning", "Bạn chưa đăng nhập", "Vui lòng đăng nhập");
  }
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default CheckLogin;
