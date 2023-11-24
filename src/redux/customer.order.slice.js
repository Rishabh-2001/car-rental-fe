import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../axiosConfig";


const initialState = {
  isLoading: false,
  orders: [],
};

export const addOrder = createAsyncThunk(
  "customer/order",
  async (postData, thunkAPI) => {
    // const userDetails = useUserDetails();
    try {
      const data= await axiosInstance.post(`/customer/addOrder`, postData);
       console.log("RERER", data);
      return { data };
    } catch (err) {
      console.log("ERR:", err);
      return thunkAPI.rejectWithValue(err?.response?.data?.error);
      
    }
  }
);

export const getOrderItems = createAsyncThunk(
  "customer/getOrders",
  async (_, thunkAPI) => {
    try {
        const data= await axiosInstance.get(`/customer/getOrders`,);
         console.log("RERER", data);
        return { data };
      } catch (err) {
        console.log("ERR:", err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error);
        
      }
    } 
);


const customerOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addOrder.rejected]: (state) => {
      state.isLoading = false;
    },

    [getOrderItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action?.payload;
      // return action?.payload;
    },
    [getOrderItems.rejected]: (state, action) => {
      state.isLoading = false;
      // console.log("Failed act", action);
    },
  },
});

export const {} = customerOrderSlice.actions;
export default customerOrderSlice.reducer;
