import { NavLink, useNavigate } from "react-router-dom";
import "./FormStyle.css";
import { useState } from "react";
import { updateItem, addItem } from "../../../../app/todoReducer.ts";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const { statusItem } = useSelector((state) => state.listTodos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [infor, setinfor] = useState({
    firstName: statusItem.firstName,
    email: statusItem.email,
    address: statusItem.address,
    id: statusItem.id,
    lastName: statusItem.lastName,
  });
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setinfor({
      ...infor,
      [name]: value,
    });
  };

  const editItemDetail = () => {
    if (
      !infor.address ||
      !infor.firstName ||
      !infor.email ||
      !infor.lastName
    ) return ;
    if (!infor?.id) {
      setinfor({ ...infor, id: Math.floor(Math.random() * 10000) });
      dispatch(addItem(infor));
      navigate("/");
    } else {
      dispatch(updateItem(infor));
      navigate("/");
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input
            onInput={(e) => onChangeForm(e)}
            name="firstName"
            defaultValue={statusItem.firstName}
            type="text"
            className="form-control "
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Email</label>
          <input
            onChange={(e) => onChangeForm(e)}
            name="email"
            defaultValue={statusItem.email}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Address</label>
          <input
            onChange={(e) => onChangeForm(e)}
            name="address"
            defaultValue={statusItem.address}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">LastName</label>
          <input
            onChange={(e) => onChangeForm(e)}
            name="lastName"
            defaultValue={statusItem.lastName}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
      </div>
      <div className="confirm">
        <button
          type="button"
          className="btn btn-primary"
          onClick={editItemDetail}
        >
          {/* <NavLink to={"/"} style={{ color: "#fff" }}> */}
          {statusItem.id && <span>Edit</span>}
          {!statusItem.id && <span>Add</span>}
          {/* </NavLink> */}
        </button>
        <button type="button" className="btn btn-warning">
          <NavLink to={"/"} style={{ color: "black" }}>
            Canel
          </NavLink>
        </button>
      </div>
    </>
  );
}
export default Form;
