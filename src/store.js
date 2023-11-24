import { configureStore } from "@reduxjs/toolkit";

import userReducer from './redux/auth.slice'

import adminProductSlice from "./redux/admin.product.slice";

import customerCarSlice from "./redux/customer.car.slice";
import customerOrderSlice from "./redux/customer.order.slice";
import adminOrderSlice from "./redux/admin.order.slice";
import adminCarsSlice from "./redux/admin.cars.slice";


export default configureStore({
    reducer:{
        user:userReducer,
        adminCar: adminCarsSlice,
        adminProduct: adminProductSlice,
        customerCar: customerCarSlice,
        customerOrder: customerOrderSlice,
        adminOrder: adminOrderSlice,
        


    }
})

