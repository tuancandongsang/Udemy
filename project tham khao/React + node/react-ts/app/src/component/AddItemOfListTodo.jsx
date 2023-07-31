import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPosts, changeToPageDetail } from "./todoReducer.ts";

function AddItemOfListTodo() {
  const dispatch = useDispatch();

  const [search, setsearch] = useState("");

  const SearchItemList = () => {
    const params = {
      keyword: search.trim(),
    };
      dispatch(fetchPosts({params}));
  };

  const addItem = () => {
    dispatch(changeToPageDetail({}));
  };

  return (
    <>
      <div className="marginLeft flex">
        <input
          type="text"
          className="form-control inputItem"
          placeholder="Search ...."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          aria-label="Username"
          aria-describedby="basic-addon1"
        ></input>
        <button
          type="button"
          className="btn btn-success button button-item "
          onClick={SearchItemList}
        >
          Search
        </button>
        <button type="button" className="btn btn-primary button-item" onClick={addItem}>
          <NavLink to={"/detail"} style={{ color: "#fff" }}>
            Add Item Todo
          </NavLink>
        </button>
      </div>
    </>
  );
}
export default AddItemOfListTodo;
