import React from "react";
import "./login.css";
import { Button, Switch, Form, Input } from "antd";
import { login } from "./userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../utils/notication";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      Notification("error", "Login", error.message);
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
              <div className="login-title">Sign In</div>
              <div className="login-description">Enter your email and password to sign in</div>
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
                  <Form.Item label="Username" name="userName" rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input placeholder="Name" />
                  </Form.Item>

                  <Form.Item label="Password" name="passWord" rules={[{ required: true, message: "Please input your password!" }]}>
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <div className="login-switch">
                    <Form.Item label="Save Password" valuePropName="savePassword">
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
              </div>
            </div>
            <div className="login-img-left"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
