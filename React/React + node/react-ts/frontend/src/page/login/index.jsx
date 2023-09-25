import "./login.css";
import { Notification } from "../../utills/notication.ts";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Switch, Form, Input } from "antd";
import {
  setToken,
  setRefreshToken,
  setUserID,
} from "../../utills/helpers/localstorage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStateLogin } from "../../app/loginSlice";
import {changeUserId, setUserInit} from "../../app/todoReducer.ts"

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stateLogin } = useSelector((state) => state.loginSlice);

  const onFinish = async (values) => {
    if (stateLogin === "login") {
      try {
        const response = await axios.post(
          " http://localhost:8080/api/v1/login",
          values
        );
        const { message, refreshToken, token, id } = response.data;
        if (message || refreshToken || token || id) {
          setUserID(id);
          setToken(token);
          setRefreshToken(refreshToken);
          setTimeout(() => navigate("/"), 1000);
          dispatch(changeUserId(id));
          dispatch(setUserInit())
          Notification("success", message, "Love you 3000....");
        }
      } catch (error) {
        Notification(
          "warning",
          error.response.data.message,
          "Love you 3000...."
        );
      }
    }
    if (stateLogin === "register") {
      try {
        const response = await axios.post(
          " http://localhost:8080/api/v1/register",
          values
        );
        if (response.status === 200) {
          Notification("success", response.data.message, "Love you 3000....");
          dispatch(setStateLogin("login"));
        }
      } catch (error) {}
    }
  };

  const onFinishFailed = (errorInfo) => {
    Notification("warning", "Login", "Kiểm tra lại dữ liệu đăng nhập");
  };

  return (
    <>
      <div id="login">
        <div className="login-container">
          <div className="login-background-img"></div>
          <div className="background-color"></div>
          <div className="login-main">
            <div className="form">
              {stateLogin === "login" && (
                <div className="login-title">Sign In</div>
              )}
              {stateLogin === "register" && (
                <div className="login-title">Sign Up</div>
              )}

              <div className="login-description">
                Enter your email and password to sign in
              </div>
              <div className="login-form">
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 18 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>

                  {stateLogin === "register" && (
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  )}

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <div className="login-switch">
                    <Form.Item
                      label="Save Password"
                      valuePropName="savePassword"
                    >
                      <Switch />
                    </Form.Item>
                  </div>

                  <div className="login-submit">
                    <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                      <Button type="primary" htmlType="submit">
                        SIGN IN
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                {stateLogin === "login" && (
                  <button
                    onClick={() => dispatch(setStateLogin("register"))}
                    className="button-item"
                  >
                    Sign Up
                  </button>
                )}
                {stateLogin === "register" && (
                  <button
                    onClick={() => dispatch(setStateLogin("login"))}
                    className="button-item"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
            <div className="login-img-left"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
