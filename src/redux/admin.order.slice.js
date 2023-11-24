import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../axiosConfig";



const initialState={
    state: {
        isFetching: false,
    },
    orderData:{
      isLoading:false,
      error: "",
      data:{}
    }
}






export const getAllOrders = createAsyncThunk(
  'admin/getAllOrders',
  async (_, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get(`/admin/getOrders`);
        console.log("DATAAA:", data);
        return { data };
  } catch (error) {
    console.log("SE", error);
    return thunkAPI.rejectWithValue(error?.response?.data?.error);
  }

  }
);




const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState,
    reducers: {
   

    },
    extraReducers:{

      [getAllOrders.pending]:(state)=>{
        state.orderData.isLoading=true
      },
      [getAllOrders.fulfilled]:(state,action)=>{
     
        state.orderData.isLoading=false;
        state.orderData.data=action?.payload;
        // return action?.payload;
      },
      [getAllOrders.rejected]:(state,action)=>{
        state.orderData.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default adminOrderSlice.reducer;
  