import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm/index";
import { login } from "./userSlice";

Login.propTypes = {};

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const handleSubmit = async (val) => {
    try {
      const action = login(val);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      message.success("Đăng nhập thành công!");

      return history.replace(state?.from || "/");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleClose = () => {
    history.replace("/");
  };
  return <LoginForm handleSubmit={handleSubmit} handleClose={handleClose} />;
}

export default Login;
