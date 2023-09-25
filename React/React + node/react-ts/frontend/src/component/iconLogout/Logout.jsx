import "./logout.css";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import {
  removeToken,
  removeRefreshToken,
  removeUrl,
  removeUserID,
} from "../../utills/helpers/localstorage";
import {cleardataApp} from '../../app/todoReducer'
import { useDispatch } from "react-redux";

function IconLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    removeToken();
    removeRefreshToken();
    removeUrl();
    navigate("/login");
    removeUserID();
    dispatch(cleardataApp())
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
