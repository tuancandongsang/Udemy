import "./Detail.css";
import Header from "../../component/header/Header";
import Form from "../../component/form/FormUser";
import { useSelector } from "react-redux";

function Detail() {
  const { statusItem } = useSelector((state) => state.listTodos);
  return (
    <div className="detail">
      <div className="background"></div>
      <div className="container">
        <Header />
        <h1> Detail Love You 3000.... </h1>
        <Form />
      </div>
    </div>
  );
}

export default Detail;
