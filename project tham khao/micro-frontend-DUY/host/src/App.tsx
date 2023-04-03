import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
const NetflixService = lazy(() => import("./web-components/netflix-service"));
const BankService = lazy(() => import("./web-components/bank-service"));

function App() {
  return (
    <>
      <div className="host">
        <div className="host-service">
          <BankService />{" "}
        </div>
        <div className="host-service">
          <NetflixService />
        </div>
      </div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<BankService />}></Route>
          <Route path="/film" element={<NetflixService />}></Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
