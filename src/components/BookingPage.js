import { Typography } from "antd";
import React, { useEffect } from "react";
import { Col, Row } from "antd";

import CardDashboard from "./CardDashboard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllOrders } from "../redux/admin.order.slice";
import OrderList from "./Customer/OrderList";
const { Title } = Typography;

const BookingPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSelector(
    (store) => store?.adminOrder?.orderData
  );
  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      <Title level={3}>Bookings</Title>
      {/* CARDS  */}
      <div className="flex flex-col ">
        <div className="mt-11 mb-6">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Total Number of Bookings"}
                value={data?.data?.length}
              />
            </Col>

            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Current Trips"}
                value={data?.data?.length}
              />
            </Col>
          </Row>
        </div>
        {data?.data && data?.data?.length > 0
          ? data?.data?.map((order, idx) => (
              <OrderList key={idx} order={order} />
            ))
          : data?.data?.length <= 0 && <h1> No Orders Placed</h1>}
      </div>
    </div>
  );
};

export default BookingPage;
