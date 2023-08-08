import { Todo } from "../types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listTodosInit } from "./initialSate";
import ListUser from "../api/ListUser";
import { Notification } from "../utills/notication";

const initialState = {
  listTodosInit: listTodosInit,
  totalCount: 0,
  statusItem: {},
  currentPage: 1,
  itemsPerPage: 10,
};

export const fetchPosts = createAsyncThunk("get/fetchPosts", async (param) => {
  try {
    const response = await ListUser.get(param);
    return response;
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
  async (item, thunkAPI) => {
    try {
      const response = await ListUser.update(item);
      Notification("success", " Edit!", response.message);
      // thunkAPI.dispatch(fetchPosts());
    } catch (error) {
      console.log("update", error);
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
    changeNumberPage:(state, action) => {
      // console.log('action.payload', action.payload);
      
      if (!action.payload.currentPage) {
        state.currentPage = 1;
      } else state.currentPage = action.payload.currentPage;
    }
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (
      state: { listTodosInit: Todo; totalCount: any , currentPage: number},
      action: { payload: any }
    ) => {
      const data = action.payload;
      // console.log("action.payload", action.payload.data);
      // if(state.currentPage !=)

      state.listTodosInit.push(...data.data);
      state.totalCount = data.totalItems;
    },
  },
});
export const { changeToPageDetail, changeNumberPage } = todoSlice.actions;

export default todoSlice.reducer;
