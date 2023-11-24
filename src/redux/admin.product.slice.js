import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosConfig";


const BASE_URL=process.env.REACT_APP_BASE_URL;
const userData=localStorage.getItem('currentUser');
let userId=''
let userType=''
if(userData){
   userId=JSON.parse(userData)?.userId;
   userType=JSON.parse(userData)?.userType
}

const initialState={
    state: {
        isFetching: false,
    },
    carsData:{
      isLoading:false,
      error: "",
      data:[]
    }
}





export const addCar=createAsyncThunk('admin/car', async (postData,thunkAPI)=>{
  console.log("HRERERERE");
  // const userDetails = useUserDetails();
    try{
      //  const {data}=await axios.post(`${BASE_URL}/admin/addProduct`, postData,{
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'ngrok-skip-browser-warning': 'true',
      //          'userType': userType,
      //          'adminToken': userId,
      //       }
      //  })
      //  return {data};
      console.log("HRERERE");
      const data= await axiosInstance.post(`/admin/addCar`, postData);
       console.log("RERER", data);
      return { data };
    }
    catch(err){
        console.log("ERR:",err);
        return thunkAPI.rejectWithValue(err?.response?.data?.error)
    }
})
export const getAllProduct = createAsyncThunk(
  'admin/getAllProduct',
  async (_, thunkAPI) => {
    try {
      const {pageNo,limit,searchKey,type,action}=_;
      let url=`${BASE_URL}/admin/allProduct?page=${pageNo}&limit=${limit}`;
      if(searchKey)
      {
        url+=`&search=${searchKey}`
      }
      if(type)
      {
        url+=`&type=${type}`
      }
      if(action)
      {
        url+=`&action=${action}`
      }

      const response = await axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'userType': userType,
            'adminToken': userId,
          }
    } );
      console.log("RESP>>", response);
      return response?.data;
    } catch (error) {
      console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);
export const getAllCars = createAsyncThunk(
  'admin/getAllCars',
  async (_, thunkAPI) => {
        try {
          const {data} = await axiosInstance.get(`/customer/allCars`);
          console.log("DATAAA:", data);
          return { data };
    } catch (error) {
      console.log("SE", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.error);
    }
  }
);




const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {
   

    },
    extraReducers:{
      [addCar.pending]:(state)=>{
        state.isLoading=true
      },
      [addCar.fulfilled]:(state,action)=>{
     
        state.isLoading=false;
        state.isRegistered=true;
        // return action?.payload;
      },
      [addCar.rejected]:(state)=>{
        state.isLoading=false;
      }, 

      [getAllCars.pending]:(state)=>{
        state.productsData.isLoading=true
      },
      [getAllCars.fulfilled]:(state,action)=>{
      
        state.productsData.isLoading=false;
        state.productsData.data=action?.payload?.data;
        // return action?.payload;
      },
      [getAllCars.rejected]:(state,action)=>{
        state.productsData.isLoading=false;
        console.log("Failed act", action);
      }
    }

  });

  

  export default adminProductSlice.reducer;
  