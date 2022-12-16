import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./app/store";

const Root = (
  <Provider store={store}>
    <SnackbarProvider maxSnack={1} preventDuplicate>
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
