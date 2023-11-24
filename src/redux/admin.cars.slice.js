import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";




const initialState={
    state: {
        isFetching: false,
    },
    carsData:{
      isLoading:false,
      error: "",
      data:{}
    },

}





export const getCars = createAsyncThunk(
  'admin/getCars',
  async (_, thunkAPI) => {
    try {
      const {pageNo,limit}=_;

      const {data} = await axiosInstance.get(`/admin/getCars?page=${pageNo}&limit=${limit}`);
      return { data };
      // if(searchKey)
      // {
      //   url+=`&search=${searchKey}`
      // }
      // if(type)
      // {
      //   url+=`&type=${type}`
      // }
      // if(action)
      // {
      //   url+=`&action=${action}`
      // }
    } catch (error) {
      console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);



const adminCarSlice = createSlice({
    name: "adminCar",
    initialState,
    reducers: {
   

    },
    extraReducers:{

      [getCars.pending]:(state)=>{
        state.carsData.isLoading=true
      },
      [getCars.fulfilled]:(state,action)=>{
     
        state.carsData.isLoading=false;
        state.carsData.data=action?.payload;
        // return action?.payload;
      },
      [getCars.rejected]:(state,action)=>{
        state.carsData.isLoading=false;
        console.log("Failed act", action);
      },
     
    }

  });

  

  export default adminCarSlice.reducer;
  