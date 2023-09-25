import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./header.css"
function Header() {
  return (
    <>
      <div id="header">
        <h1>Vite + React + TS</h1>
        <div className="box-logo">
          <a href="#">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="#">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
    </>
  );
}
export default Header;
