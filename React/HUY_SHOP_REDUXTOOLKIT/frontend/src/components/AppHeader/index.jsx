import {
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Affix, Badge, Col, Menu, message, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import StorageKeys from "../../constants/storage-key";
import { logout } from "../../modules/Auth/userSlice";
import { getTotals } from "../../modules/Cart/cartSlice";
import Search from "./components/Search";
import "./styles.scss";

AppHeader.propTypes = {};

function AppHeader(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleClick = async (val) => {
    if (val.key === "logo") {
      history.replace("/home");
    } else if (val.key === "logout") {
      await history.replace(`/${val.key}`);
      await dispatch(logout());
      await history.replace("/");
      return message.success("Đăng xuất thành công!");
    } else {
      history.replace(`/${val.key}`);
    }
  };

  const items = [
    {
      key: "logo",
      icon: <img src={logo} alt="logo" />,
    },
    { key: "home", label: "Trang chủ" },
    { key: "men", label: "Nam" },
    { key: "women", label: "Nữ" },
    { key: "collection", label: "Bộ sưu tập" },
    { key: "sale", label: "Sale" },
  ];

  const itemsLogout = [
    {
      key: "cart",
      icon: (
        <Badge count={cart.cartTotalItem} size="small" overflowCount={10}>
          <ShoppingCartOutlined
            style={{ fontSize: "23px", color: "#1e1e1e" }}
          />
        </Badge>
      ),
    },
    {
      key: "user",
      icon: <UserOutlined style={{ fontSize: "23px", color: "#1e1e1e" }} />,
      children: [
        {
          label: "Thông tin",
          key: "infoUser",
          icon: <UserOutlined style={{ fontSize: "23px", color: "#1e1e1e" }} />,
        },
        {
          label: "Đổi mật khẩu",
          key: "chagePassword",
          icon: (
            <SettingOutlined style={{ fontSize: "23px", color: "#1e1e1e" }} />
          ),
        },
        {
          label: "Đăng xuất",
          key: "logout",
          icon: (
            <LogoutOutlined style={{ fontSize: "23px", color: "#1e1e1e" }} />
          ),
        },
      ],
    },
  ];
  const itemsLogin = [{ key: "login", label: "Đăng nhập", className: "login" }];

  return (
    <Affix>
      <Header>
        <Row>
          <Col span={16}>
            <Menu
              theme="light"
              mode="horizontal"
              className="menu-left"
              style={{
                borderBottom: "none",
                backgroundColor: "#dfdfdf",
                position: "relative",
                display: "flex",
                justifyContent: "right",
                color: "#1e1e1e",
              }}
              defaultSelectedKeys={["home"]}
              items={items}
              onClick={handleClick}
            />
          </Col>
          <Col span={4}>
            <Menu
              className="menu-right"
              theme="light"
              mode="horizontal"
              style={{
                borderBottom: "none",
                backgroundColor: "#dfdfdf",
                position: "relative",
                display: "flex",
                justifyContent: "right",
                color: "#1e1e1e",
              }}
              items={
                localStorage.getItem(StorageKeys.TOKEN) === null
                  ? itemsLogin
                  : itemsLogout
              }
              onClick={handleClick}
            />
          </Col>
          <Col span={4}>
            <Search />
          </Col>
        </Row>
      </Header>
    </Affix>
  );
}

export default AppHeader;
