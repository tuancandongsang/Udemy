import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/helpers/localstorage";
import { Notification } from "../../utils/notication";

const CheckLogin = () => {
  const token = getToken();
  if (!token) {
    Notification("warning", "Bạn chưa đăng nhập", "Vui lòng đăng nhập");
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default CheckLogin;
