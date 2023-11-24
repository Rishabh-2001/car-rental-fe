import React, { useEffect, useState } from "react";

import { Col, Divider, Row, Spin } from "antd";
import { Typography } from "antd";
import OrderList from "./OrderList";
import CardDashboard from "../CardDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderItems } from "../../redux/customer.order.slice";
const { Title } = Typography;
const OrderPage = () => {
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector((store) => store?.customerOrder);
  const [showLogin,setShowLogin]=useState(false);

  useEffect(() => {
    const userLocal=localStorage.getItem('currentUser')
    console.log(":::", userLocal);
    if(userLocal)
    {
      if(JSON.parse(userLocal)?.userType==="CUSTOMER")
      {
        console.log(">>", JSON.parse(userLocal)?.userType);
        dispatch(getOrderItems());
      }
      else{
        setShowLogin(true)
      }
    }
    else{
      setShowLogin(true)
    }

  }, []);

  function getCount(key) {
    let cnt = 0;
    console.log(":::", orders);
    for (let i = 0; i < orders?.length; i++) {
      if (orders?.[i]?.ordersData?.status === key) {
        cnt++;
      }
    }
    return cnt;
  }

  return (
    <>
      <Title level={3}>My Orders</Title>
{ showLogin ? <div>Login as Customer to View this page. </div>   :  

<div>


      {!isLoading ? (
        <div className="mt-11 mb-6">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Orders Placed"}
                value={orders?.data?.data?.length || 0}
              />
            </Col>

            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Order Delivered"}
                value={getCount("delivered") || 0}
              />
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Orders Cancelled"}
                value={getCount("cancelled") || 0}
              />
            </Col>

            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                //   icon={availableTruck}
                title={"In-Transit Orders"}
                value={getCount("intransit") || 0}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <>
          {" "}
          <Spin size="large" />
        </>
      )}

      <Title level={4}>Previous Orders</Title>
      <Divider />
      {!isLoading ? (
        <div>
          {orders?.data && orders?.data?.data?.length > 0
            ? orders?.data?.data?.map((order, idx) => (
                <OrderList key={idx} order={order} />
              ))
            : orders?.length <= 0 && <h1> No Orders Placed</h1>}
        </div>
      ) : (
        <>
          {" "}
          <Spin size="large" />
        </>
      )}
      </div>}
    </>
  );
};
export default OrderPage;
