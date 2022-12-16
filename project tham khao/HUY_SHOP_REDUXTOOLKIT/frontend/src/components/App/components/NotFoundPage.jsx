import { Button, Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const NotAuthorizedPage = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang web không tồn tại!"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.replace("/home");
          }}
        >
          Trang chủ
        </Button>
      }
    />
  );
};

export default NotAuthorizedPage;
