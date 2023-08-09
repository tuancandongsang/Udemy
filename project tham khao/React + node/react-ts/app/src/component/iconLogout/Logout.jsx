import "./logout.css";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import {
  removeToken,
  removeRefreshToken,
  removeUrl,
  removeUserID,
} from "../../utills/helpers/localstorage";

function IconLogout() {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    removeRefreshToken();
    removeUrl();
    navigate("/login");
    removeUserID();
  };
  return (
    <>
      <span className="Icon-Logout" onClick={logout}>
        <LogoutOutlined />
      </span>
    </>
  );
}

export default IconLogout;
