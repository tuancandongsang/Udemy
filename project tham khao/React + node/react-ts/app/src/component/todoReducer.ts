import { Todo } from "../types";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listTodosInit } from "../app/initialSate";

const initialState = {
  listTodosInit: listTodosInit,
  statusItem: {},
};

export const fetchPosts = createAsyncThunk("get/fetchPosts", async (param) => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/users/", param);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});
export const removeItem = createAsyncThunk(
  "delete/fetchPosts",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/delete-user/${id}`);
      thunkAPI.dispatch(fetchPosts());
    } catch (error) {}
  }
);
export const updateItem = createAsyncThunk(
  "update/fetchPosts",
  async (item, thunkAPI) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/update-user/${item.id}`,
        item
      );
      thunkAPI.dispatch(fetchPosts());
    } catch (error) {}
  }
);
export const addItem = createAsyncThunk(
  "create/fetchPosts",
  async (item, thunkAPI) => {
    try {
      await axios.post(
        " http://localhost:8080/api/v1/create-user",
        item
      );
      thunkAPI.dispatch(fetchPosts());
    } catch (error) {}
  }
);

const todoSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    status: (state, action) => {
      if (action.payload.username) state.listTodosInit.unshift(action.payload);
    },
    changeToPageDetail: (state, action) => {
      // console.log('action', action.payload);
      
      if (!action.payload.id) {
        state.statusItem = {};
      } else state.statusItem = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (
      state: { listTodosInit: Todo },
      action: { payload: any }
    ) => {
      state.listTodosInit = action.payload.map((item: Todo) => ({
        ...item,
        done: false,
      }));
    },
  },
});
export const { changeToPageDetail } = todoSlice.actions;

export default todoSlice.reducer;
