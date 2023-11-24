// import './App.css';
import HomePage from "./Layout/HomePage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./Layout/GlobalLayout";
import Home from "./components/Home";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

import Reports from "./components/Reports";
import Dashboard from "./components/Dashboard";

import OrderPage from "./components/Customer/OrderPage";

import ProfilePage from "./components/Customer/ProfilePage";

import AdminProtectedRoute from "./route/AdminProtectedRoute";
import Cars from "./components/Cars";
import AddCars from "./components/admin/AddCars";
import CarDetails from "./components/CarDetails";
import CarDetailsPage from "./components/admin/CarDetailsPage";
import CarOrders from "./components/CarOrders";
import BookingPage from "./components/BookingPage";
import CarListingPage from "./components/Customer/CarListingPage";
import CarListingDetailsPage from "./components/Customer/CarListingDetailsPage";


function App() {
  return (
    <div className="App w-[100%] box-content">
      <ToastContainer />
      <Routes>
        <Route element={<GlobalLayout />}>
          {/* BEFORE AUTH LAYOUT  */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* AFTER AUTH LAYOUT  */}
          <Route
            path="admin"
            element={
              <AdminProtectedRoute>
                <HomePage />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route exact path="cars" element={<Cars />} />
            <Route exact path="cars/add" element={<AddCars />} />
            <Route exact path="cars/:id" element={<CarDetails />}>
              <Route exact path="cars" element={<CarDetailsPage />} />
              {/* <Route exact path="products" element={<VendorProduct />} /> */}
              <Route exact path="bookings" element={<CarOrders />} />
            </Route>
            <Route exact path="bookings" element={<BookingPage />} />
            {/* <Route exact path="bookings/:id" element={<AddProducts />} /> */}
            {/* <Route exact path="products/add" element={<AddProducts />} /> */}
            <Route exact path="reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="vendor"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<CarListingPage />} />
            <Route exact path="car/:id" element={<CarListingDetailsPage />} />

            <Route exact path="orders" element={<OrderPage />} />

            <Route exact path="customerProfile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
