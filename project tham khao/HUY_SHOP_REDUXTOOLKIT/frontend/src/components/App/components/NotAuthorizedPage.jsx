import { Button, Result } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";

const NotAuthorizedPage = () => (
  <Result
    status="403"
    title="403"
    subTitle="Vui lòng đăng nhập!"
    extra={
      <Button
        type="primary"
        onClick={() => {
          <Redirect to="/home" />;
        }}
      >
        Trang chủ
      </Button>
    }
  />
);

export default NotAuthorizedPage;
