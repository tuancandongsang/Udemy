import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, changeToPageDetail, changeNumberPage } from "../../../app/todoReducer.ts";
import { NavLink } from "react-router-dom";
import Popconfirm from "../../../component/popconfirm.jsx";

function ListTodoList() {
  const dispatch = useDispatch();
  const { listTodosInit, totalCount, currentPage, itemsPerPage, statusItem } = useSelector(
    (state) => state.listTodos
  );
  // const { totalCount } = useSelector((state) => state.listTodos);
  console.log("statusItem", statusItem);

  const [alo, setalo] = useState(1);
  // const itemsPerPage = 10;

  const params = {
    page: currentPage,
    limit: itemsPerPage,
  };
  console.log("params", params);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (currentPage * itemsPerPage > totalCount) return;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      // setalo((prevPage) => prevPage + 1);
      dispatch(changeNumberPage({ currentPage: currentPage + 1 }));
    }
  };

  useEffect(() => {
    dispatch(fetchPosts({ params }));
  }, [currentPage]);

  const editItemId = (item) => {
    dispatch(changeToPageDetail(item));
  };

  return (
    <>
      <ul className="list-group list-todo lazyload" onScroll={handleScroll}>
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
