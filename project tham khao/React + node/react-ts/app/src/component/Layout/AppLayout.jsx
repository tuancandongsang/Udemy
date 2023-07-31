import "./App.css";
// import Header from "./component/Header";
import {AllPages} from "./routes/index"
import { useRoutes } from "react-router-dom";

function AppLayout() {
  const allPages = useRoutes(AllPages());
// console.log('AllPages', allPages);

  return (
    <div className="App">
      {/* <Header /> */}
      <Outlet />
    </div>
  );
}

export default AppLayout;
