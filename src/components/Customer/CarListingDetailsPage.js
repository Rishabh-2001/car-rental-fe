import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button, Descriptions, Input, Form, message, Modal, Spin } from "antd";
import { Typography } from "antd";
import Star from "./Start";
import { useParams } from "react-router-dom";
import { InputNumber, DatePicker } from "antd";
import moment from "moment";
import axiosInstance from "../../axiosConfig";
import { registerUser, setUser } from "../../redux/auth.slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addOrder } from "../../redux/customer.order.slice";
const { Title, Text } = Typography;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CarListingDetailsPage = () => {
  const { id } = useParams();
  // console.log("IDDD:::", id);
  const [carData, setCarData] = useState();
  const [confirmModal, setConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);

  const [form] = Form.useForm();
  const [numberOfDays, setNumberOfDays] = useState(0);
  const farePerDay = parseFloat(carData?.price.replace(/[^0-9.]/g, ""));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalPayload, setModalPayload] = useState();
  const [RegisterFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnf_password: "",
    userType: "CUSTOMER",
  });

  const handleChangeRegister = (e) => {
    // e.preventDefault()
    setRegisterFormData({
      ...RegisterFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log("Form data:", RegisterFormData);
    const payload = {
      firstName: RegisterFormData?.firstName,
      lastName: RegisterFormData?.lastName,
      email: RegisterFormData?.email,
      password: RegisterFormData?.password,
      cnf_password: RegisterFormData?.cnf_password,
      userType: RegisterFormData?.userType || "CUSTOMER",
    };
    if (RegisterFormData.password !== RegisterFormData.cnf_password) {
      message.error("Passwords doesn't match !");
    } else {
      setIsLoading(true);
      const res = await dispatch(registerUser(payload));
      console.log("RES:", res);
      if (res.error) {
        message.error(res.payload);
        setIsLoading(false);
      } else {
        message.success("User added sucessfuly");
        setIsLoading(false);
        setRegisterFormData("");
        setShowRegister(false);
      }
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleConfirmCancel = () => {
    setConfirmModal(false);
  };
  const handleConfirmOk = async () => {
    try {
      await dispatch(addOrder(modalPayload));
      form.resetFields();
      message.success("Order Booked");
      setConfirmModal(false);
    } catch (error) {
      console.log("ERR:", error);
      message.error(error);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "CUSTOMER",
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // updateNumberOfDays(date, endDate);
  };

  const calculateTotalPrice = () => {
    if (numberOfDays > 0) {
      return numberOfDays * farePerDay;
    }
    return 0;
  };

  async function getCar() {
    try {
      const { data } = await axiosInstance.get(`/customer/getCar?id=${id}`);
      console.log("IDD123", data);
      setCarData(data[0]);
    } catch (error) {
      message.error(error?.response?.data?.error);
    }
  }

  const localStorageVal = localStorage.getItem("currentUser");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    getCar();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("FFF");
    // console.log("...", formData  );

    await axios
      .post(`${BASE_URL}/auth/login`, formData)
      .then((resp) => {
        // console.log("12", );
        // console.log("RES", resp?.data);
        message.success("Successfuly, logged in...");

        dispatch(setUser(resp?.data));
        // console.log(">>>>>", resp?.data);
        localStorage.setItem("currentUser", JSON.stringify(resp?.data));
        setFormData("");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("..0", err?.response?.data?.error);
        message.error(
          err?.response?.data?.error?.error || err?.response?.data?.error
        );
      });
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };
  async function handleBook() {
    // console.log("Booking ");
    const formValues = form.getFieldsValue();
    // console.log("Form Values:", formValues?.startDate);
    const expDate = new Date(
      formValues?.startDate
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d+Z$/, "")
    );
    const threeDaysLater = new Date(expDate);
    threeDaysLater.setDate(expDate.getDate() + formValues?.numberOfDays);

    const payload = {
      startDate: formValues?.startDate
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d+Z$/, ""),
      expectedEndDate: threeDaysLater.toISOString(),
      numberOfDaysBooked: formValues.numberOfDays,
      totalFare: numberOfDays * farePerDay,
      lateChargePerDay: carData?.lateChargePerDay,
      vendorId: carData?.vendorId,
      carId: carData?.id,
      carModel: carData?.carModel,
      car: carData?.car,
    };
    console.log("PO", payload);
    if (JSON.parse(localStorageVal)?.userType === "CUSTOMER") {
      setModalPayload(payload);
      setConfirmModal(true);
    } else {
      setIsModalOpen(true);
    }
  }

  function handleRegisterLink() {
    setShowRegister(true);
  }

  return (
    <div>
      <Title level={3}>
        {carData?.car}-{carData?.carModel}
      </Title>
      <div>
        <img
          src={carData?.images?.url}
          alt="img"
          className="w-[90%] mx-auto object-contain h-[250px]"
        />
        {/* CAR & BOOKING DETAILS  */}
        <div>
          <div className="flex justify-between mt-4">
            <Title level={4}>
              {" "}
              {carData?.carModel}, a {carData?.carModelYear} Model
            </Title>
            <Star count={carData?.ratings} />
          </div>
          <Title level={3}>
            {" "}
            {carData?.price}
            <span className="text-sm text-gray-500"> Per Day</span>
          </Title>
          {carData?.features && carData?.features?.length > 0 ? (
            <div className="my-2 flex flex-wrap items-center">
              <span className="font-medium">Features: </span>
              {carData?.features?.map((f, i) => (
                <span
                  className="px-2 py-1 bg-green-200 rounded mx-1 text-xs my-1"
                  key={i}
                >
                  {f}
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}

          <div className="flex justify-between bg-white px-8 py-4 rounded">
            <div className="flex flex-col gap-2">
              <div>
                <span>Mileage: </span>
                <span className="text-md font-medium ">{carData?.mileage}</span>
              </div>
              <div>
                <span>Seating Capacity: </span>
                <span className="text-md font-medium ">
                  {carData?.seatingCapacity}
                </span>
              </div>
              <div>
                <span>GPS Enabled: </span>
                <span className="text-md font-medium ">
                  {carData?.gpsEnabled}
                </span>
              </div>
              <div>
                <span>Agency ID: </span>
                <span className="text-md font-medium ">
                  {carData?.vendorId}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <span>Late Charge: </span>
                <span className="text-md font-medium ">
                  {carData?.lateChargePerDay}
                </span>
              </div>
              <div>
                <span>Security Deposit: </span>
                <span className="text-md font-medium ">
                  {carData?.SecurityDep}
                </span>
              </div>
              <div>
                <span>Total Trips Made: </span>
                <span className="text-md font-medium ">
                  {carData?.rentalHistory || 0}
                </span>
              </div>
            </div>
          </div>
          <Title level={5} className="mt-6">
            {" Booking Details "}
          </Title>
          {/* BOOKING DETAILS  */}
          <div
            style={{
              textAlign: "center",
              marginTop: "12px",
              backgroundColor: "white",
              padding: "1em 2em",
              marginBottom: "1em",
            }}
          >
            <Form form={form}>
              <Form.Item label="Select Start Date" name="startDate">
                <DatePicker
                  style={{ margin: "0 10px" }}
                  onChange={handleStartDateChange}
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item label="Number of Days" name="numberOfDays">
                <InputNumber
                  style={{ margin: "0 10px" }}
                  value={numberOfDays}
                  onChange={(value) => setNumberOfDays(value)}
                />
              </Form.Item>
              <Button
                className="bg-blue-600 text-white my-2"
                onClick={() => calculateTotalPrice()}
              >
                Calculate Total Price
              </Button>
              {numberOfDays > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <Text>Total Price for {numberOfDays} days:</Text>
                  <br />
                  <Text strong>${calculateTotalPrice()}</Text>
                </div>
              )}
              <Text className="my-2 text-red-500 text-sm">
                Late Charges Per Day:{" "}
                <span className="text-lg text-black">
                  {" "}
                  $ {carData?.lateChargePerDay}{" "}
                </span>
              </Text>
              <Form.Item>
                <div className="flex justify-center">
                  <Button
                    className="bg-blue-600 text-white "
                    onClick={handleBook}
                    disabled={
                      numberOfDays > 0 && form.getFieldsValue()?.startDate
                        ? false
                        : true
                    }
                  >
                    Book Now
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
          {/* LOGIN / REGISTER MODAL  */}
          <Modal
            title="Login First"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <div className="flex-col rounded border-2 border-[#673AB7]  text-center py-4">
              {showRegister ? (
                <div className="flex-col   text-center py-4">
                  <h2 className=" md:text-2xl text-xl font-bold mx-auto text-[#673AB7]">
                    Create Your Customer Account
                  </h2>

                  <Spin spinning={isLoading}>
                    <form onSubmit={handleSubmitRegister}>
                      <div className="flex-col  text-left mt-8">
                        <div className="px-8 mb-6">
                          <label htmlFor="firstName" className=" labels mb-2">
                            Enter First Name
                          </label>
                          <br></br>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            required
                            value={RegisterFormData.firstName}
                            onChange={handleChangeRegister}
                            className="border w-full py-2 outline-none  p-2"
                          />
                        </div>
                        <div className="px-8 mb-6">
                          <label htmlFor="lastName" className=" labels mb-2">
                            Enter Last Name
                          </label>
                          <br></br>
                          <input
                            type="text"
                            id="lastName"
                            onChange={handleChangeRegister}
                            name="lastName"
                            value={RegisterFormData.lastName}
                            className="border w-full py-2 outline-none  p-2"
                          />
                        </div>
                        <div className="px-8 mb-6">
                          <label htmlFor="email" className=" labels mb-2">
                            Enter Email
                          </label>
                          <br></br>
                          <input
                            type="email"
                            name="email"
                            value={RegisterFormData.email}
                            id="email"
                            onChange={handleChangeRegister}
                            className="border w-full py-2 outline-none  p-2"
                          />
                        </div>
                        <div className="px-8 mb-6">
                          <label htmlFor="password" className="labels mb-2">
                            Enter Password
                          </label>
                          <br></br>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={RegisterFormData.password}
                            onChange={handleChangeRegister}
                            className="border w-full py-2 outline-none p-2"
                          />
                        </div>
                        <div className="px-8 mb-6">
                          <label htmlFor="cnf_password" className="labelsmb-2">
                            Enter Confirm Password
                          </label>
                          <br></br>
                          <input
                            type="password"
                            name="cnf_password"
                            value={RegisterFormData.cnf_password}
                            id="cnf_password"
                            onChange={handleChangeRegister}
                            className="border w-full py-2 outline-none p-2"
                          />
                        </div>

                        <div className="px-8 mb-6">
                          <button className="text-white bg-[#673AB7] w-full py-2 mt-4  rounded-xl">
                            Sign Up
                          </button>
                        </div>
                        <span
                          className="text-blue-600 font-medium float-right cursor-pointer mr-8"
                          onClick={() => setShowRegister(false)}
                        >
                          Login here{" "}
                        </span>
                      </div>
                    </form>
                  </Spin>
                </div>
              ) : (
                <div>
                  <h2 className="md:text-2xl text-xl font-bold my-4 mx-auto text-[#673AB7]">
                    Login As Customer
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex-col mt-14 text-left">
                      <div className="px-8 mb-6">
                        <label
                          htmlFor="email"
                          className=" labels mb-2 capitalize"
                        >
                          Enter Email
                        </label>
                        <br></br>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border w-full py-2 outline-none  p-2"
                        />
                      </div>
                      <div className="px-8 mb-6">
                        <label htmlFor="password" className="labelsmb-2">
                          Enter Password
                        </label>
                        <br></br>
                        <input
                          type="password"
                          name="password"
                          required
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="border w-full py-2 outline-none p-2"
                        />
                      </div>
                      <div className="px-8 mb-6">
                        <input
                          type="checkbox"
                          value=""
                          defaultChecked
                          name="remember"
                        />
                        <label className="ml-4">Remember</label>
                        <span className="float-right font-medium text-[#673AB7]">
                          Forgot Password ?
                        </span>
                        <br></br>
                        <button
                          type="submit"
                          className={`text-white bg-[#673AB7] w-full py-2 mt-16  rounded-xl cursor-pointer `}
                        >
                          Login
                        </button>
                      </div>
                      <div className="text-center">
                        <span>If not registered Yet, </span>
                        <span
                          className="text-blue-600 cursor-pointer "
                          onClick={handleRegisterLink}
                        >
                          Register Here
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Modal>

          {/* CONFIRMATION MODAL  */}
          <Modal
            title="Sure to Book"
            open={confirmModal}
            onOk={handleConfirmOk}
            onCancel={handleConfirmCancel}
            footer={[
              <Button key="back" onClick={handleConfirmCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                className="bg-blue-600 text-white"
                onClick={handleConfirmOk}
              >
                Submit
              </Button>,
            ]}
          >
            <p>
              Are You sure to Book Car{" "}
              <span className="text-md font-medium">
                {modalPayload?.car} - {modalPayload?.carModel}
              </span>{" "}
              from{" "}
              <span className="text-md font-medium">
                {modalPayload?.startDate}
              </span>{" "}
              for{" "}
              <span className="text-md font-medium">
                {modalPayload?.numberOfDaysBooked}
              </span>
              days. Your Total Fare is{" "}
              <span className="text-md font-medium">
                {modalPayload?.totalFare}
              </span>{" "}
              and Expected End date is{" "}
              <span className="text-md font-medium">
                {modalPayload?.expectedEndDate}
              </span>{" "}
              . Please Book to confirm else Cancel
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CarListingDetailsPage;
