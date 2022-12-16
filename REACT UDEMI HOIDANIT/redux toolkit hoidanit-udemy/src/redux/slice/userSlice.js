import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
export  const fetchAlllUser = createAsyncThunk(
  'users/fetchAlllUser',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
  }
)

const initialState = {
    listuser :[],
    isloading: false,
    iserror:false
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAlllUser.pending, (state, action) => {
      state.isloading = true
      state.iserror = false
    })
    .addCase(fetchAlllUser.fulfilled, (state, action) => {
      state.listuser = action.payload
      state.isloading = false
      state.iserror = false
    })
    .addCase(fetchAlllUser.rejected, (state, action) => {
        state.isloading = false
        state.iserror = true
    })
  },
})

export default userSlice.reducer