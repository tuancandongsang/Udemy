import { Todo } from "../types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listTodosInit } from "./initialSate";
import ListUser from "../api/ListUser";
import { Notification } from "../utills/notication";

const initialState = {
  listTodosInit: listTodosInit,
  statusItem: {},
};

export const fetchPosts = createAsyncThunk("get/fetchPosts", async (param) => {
  try {
    const response = await ListUser.get(param);
    return response.data;
  } catch (error) {}
});
export const removeItem = createAsyncThunk(
  "delete/fetchPosts",
  async (id, thunkAPI) => {
    try {
      const response = await ListUser.delete(id);
      thunkAPI.dispatch(fetchPosts());
      Notification("success", "Delete!", response.message);
    } catch (error) {}
  }
);
export const updateItem = createAsyncThunk(
  "update/fetchPosts",
  async (item) => {
    try {
      const response = await ListUser.update(item);
      Notification("success", " Edit!", response.message);
    } catch (error) {
      console.log('update', error);
    }
  }
);
export const addItem = createAsyncThunk("create/fetchPosts", async (item) => {
  try {
    const response = await ListUser.create(item);
    Notification("success", "Creat", response.message);
  } catch (error) {}
});

const todoSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    changeToPageDetail: (state, action) => {
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
      state.listTodosInit = action?.payload?.map((item: Todo) => ({
        ...item,
        done: false,
      }));
    },
  },
});
export const { changeToPageDetail } = todoSlice.actions;

export default todoSlice.reducer;
