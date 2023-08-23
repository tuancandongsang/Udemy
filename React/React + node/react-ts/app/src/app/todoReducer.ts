import { Todo } from "../types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listTodosInit } from "./initialSate";
import ListUser from "../api/ListUser";
import { Notification } from "../utills/notication";
import { getUserID } from "../utills/helpers/localstorage";

const initialState = {
  listTodosInit: listTodosInit,
  totalCount: 0,
  statusItem: {},
  paramGet: {
    keyword: "",
    limit: 10,
    pageNumber: 1,
    userid: getUserID(),
  },
  styleCallApi: "get",
};

export const fetchPosts = createAsyncThunk("get/fetchPosts", async (param) => {
  try {
    const response = await ListUser.get(param);
    return response;
  } catch (error) {}
});
export const removeItem = createAsyncThunk(
  "delete/fetchPosts",
  async (payload, thunkAPI) => {
    try {
      const params = { params: { ...payload.paramGet } };
      const response = await ListUser.delete(payload.id);
      await thunkAPI.dispatch(fetchPosts(params));
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
    } catch (error) {}
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
    changeNumberPage: (state, action) => {
      if (!action.payload.pageNumber) {
        state.paramGet.pageNumber = 1;
      } else state.paramGet.pageNumber = action.payload.pageNumber;
    },
    cleardataApp: (state) => {
      state.listTodosInit = [];
    },
    changeUserId: (state, action) => {
      state.paramGet.userid = action.payload;
    },
    setUserInit: (state) => {
      state.paramGet = {
        keyword: "",
        limit: 10,
        pageNumber: 1,
        userid: getUserID(),
      };
    },
    changeStyleCallApi: (state, action) => {
      state.styleCallApi = action.payload.style;
      if (action.payload.style === "delete") {
        const indexToRemove = state.listTodosInit.findIndex(
          (item) => item.id === action.payload.id
        );
        if (indexToRemove !== -1) {
          state.listTodosInit.splice(indexToRemove, 1);
        }
      }
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (
      state: { listTodosInit: Todo; totalCount: any; styleCallApi: string },
      action: { payload: any }
    ) => {
      state.totalCount = action.payload?.totalItems;

      const dataPayload = action.payload?.data;
      const dataCurrent = JSON.parse(JSON.stringify(state.listTodosInit));
      const mergedArray = [...dataCurrent];

      if (dataPayload) {
        dataPayload.forEach(
          (item: { [x: string]: any; id: any; firstName: any }) => {
            const existingIndex = mergedArray.findIndex(
              (elem) => elem.id === item.id
            );
            if (existingIndex !== -1) {
              mergedArray[existingIndex] = {
                ...mergedArray[existingIndex],
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                address: item.address,
              };
            } else {
              mergedArray.push(item);
            }
          }
        );
      }
      state.listTodosInit = mergedArray;
    },
  },
});
export const {
  changeToPageDetail,
  changeNumberPage,
  cleardataApp,
  changeUserId,
  setUserInit,
  changeStyleCallApi,
} = todoSlice.actions;

export default todoSlice.reducer;
