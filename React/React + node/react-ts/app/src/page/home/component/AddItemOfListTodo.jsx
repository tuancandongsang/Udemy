import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchPosts,
  changeToPageDetail,
  cleardataApp,
} from "../../../app/todoReducer.ts";
import { getUserID } from "../../../utills/helpers/localstorage.ts";

function AddItemOfListTodo() {
  const dispatch = useDispatch();

  const [search, setsearch] = useState("");

  const SearchItemList = () => {
    const params = {
      keyword: search.trim(),
      userid: getUserID(),
    };
    dispatch(cleardataApp());
    dispatch(fetchPosts({ params }));
  };

  const addItem = () => {
    dispatch(changeToPageDetail({}));
  };

  return (
    <>
      <div className="marginLeft flex AddItemOfListTodo">
        <input
          type="text"
          className="form-control inputItem"
          placeholder="Search ...."
          value={search}
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => setsearch(e.target.value)}
          onBlur={SearchItemList}
        ></input>
        <button
          type="button"
          className="btn btn-success button button-item "
          onClick={SearchItemList}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-primary button-item"
          onClick={addItem}
        >
          <NavLink to={"/detail"} style={{ color: "#fff" }}>
            Add Item Todo
          </NavLink>
        </button>
      </div>
    </>
  );
}
export default AddItemOfListTodo;
