import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, changeToPageDetail } from "../../../app/todoReducer.ts";
import { NavLink } from "react-router-dom";
import Popconfirm from "../../../component/popconfirm.jsx";

function ListTodoList() {
  const dispatch = useDispatch();
  const { listTodosInit } = useSelector((state) => state.listTodos);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const editItemId = (item) => {
    dispatch(changeToPageDetail(item));
  };

  return (
    <>
      <ul className="list-group list-todo">
        {listTodosInit?.map((item) => (
          <li className="list-group-item textLeft flex list-todo" key={item.id}>
            <span className="block">{item.firstName}</span>
            <div>
              <button
                className="btn btn-primary button-item"
                onClick={() => editItemId(item)}
              >
                <NavLink style={{ color: "#fff" }} to={"/detail"}>
                  Edit
                </NavLink>
              </button>
              <Popconfirm id={item.id} firstName={item.firstName} />

            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListTodoList;
