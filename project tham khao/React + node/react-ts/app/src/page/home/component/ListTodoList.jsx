import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  changeToPageDetail,
  changeNumberPage,
} from "../../../app/todoReducer.ts";
import { NavLink } from "react-router-dom";
import Popconfirm from "../../../component/popconfirm.jsx";

function ListTodoList() {
  const dispatch = useDispatch();
  const { listTodosInit, totalCount, paramGet } = useSelector(
    (state) => state.listTodos
  );

  const params = {
    pageNumber: paramGet.pageNumber,
    limit: paramGet.limit,
    userid: paramGet.userid,
    keyword: paramGet.keyword,
  };
  // console.log('params', params);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (params.pageNumber * params.limit > totalCount) return;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      dispatch(changeNumberPage({ pageNumber: paramGet.pageNumber + 1 }));
    }
  };

  useEffect(() => {
    dispatch(fetchPosts({ params }));
  }, [paramGet.pageNumber]);

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
              <Popconfirm
                id={item.id}
                firstName={item.firstName}
                userid={params.userid}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListTodoList;
