import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";


const initialState = {
  state: {
    isFetching: false,
  },
  allCars: {
    isLoading: false,
    error: "",
    data: [],
  },
};



export const getAllCars = createAsyncThunk(
  'customer/getAllCars',
  async (_, thunkAPI) => {
    console.log("GEERERERE");
        try {
          const {page,limit}=_; 
          const {data} = await axiosInstance.get(`/customer/allCars?page=${page}&limit=${limit}`);
          
          return { data };
    } catch (error) {
      console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);

const customerCarSlice = createSlice({
  name: "customerCar",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCars.pending]:(state)=>{
      state.allCars.isLoading=true
    },
    [getAllCars.fulfilled]:(state,action)=>{
    
      state.allCars.isLoading=false;
      state.allCars.data=action?.payload?.data;
      // return action?.payload;
    },
    [getAllCars.rejected]:(state,action)=>{
      state.allCars.isLoading=false;
    }
  },
});

export default customerCarSlice.reducer;
