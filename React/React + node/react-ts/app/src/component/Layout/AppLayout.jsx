import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Logout from "../iconLogout/Logout";

function AppLayout() {
  return (
    <>
      <div className="App home">
        <div className="background"></div>
        <div className="container">
          <Header />
          <Outlet />
          <div className="Logout">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
