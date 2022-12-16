import { Button, Form, Input, Space } from "antd";
import PropTypes from "prop-types";
import "./styles.scss";
import logo from "../../../assets/logo.png";
import slider1 from "../../../assets/img/slider/slider1.jpeg";

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

function LoginForm({ handleSubmit, handleClose }) {
  const [form] = Form.useForm();
  const handleSubmitForm = (val) => {
    handleSubmit(val);
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={slider1}
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 text-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Form
                        onFinish={handleSubmitForm}
                        form={form}
                        autoComplete="on"
                      >
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img
                            src={logo}
                            width="100%"
                            height="100%"
                            alt="logo"
                          />
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Đăng nhập vào tài khoản của bạn
                        </h5>

                        <Form.Item
                          label="Tài khoản"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Mật khẩu"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item className="pt-1 mb-4">
                          <Space>
                            <Button htmlType="button" onClick={handleClose}>
                              Huỷ
                            </Button>

                            <Button type="primary" htmlType="submit">
                              Đăng nhập
                            </Button>
                          </Space>
                        </Form.Item>

                        <a
                          className="small text-muted"
                          href="http://localhost:3000"
                        >
                          Quên mật khẩu?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Chưa có tài khoản?{" "}
                          <a
                            href="http://localhost:3000"
                            style={{ color: "#393f81" }}
                          >
                            Đăng kí
                          </a>
                        </p>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
