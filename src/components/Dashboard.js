import React, { useEffect, useState } from 'react'
import { Radio, Tabs } from 'antd';
import CardDashboard from './CardDashboard'
import { useDispatch, useSelector } from 'react-redux'
import useSelection from 'antd/es/table/hooks/useSelection';
// import { getVendersList } from '../redux/admin.cars.slice';
import { getAllProduct } from '../redux/admin.product.slice';
import { getAllOrders } from '../redux/admin.order.slice';

const Dashboard = () => {
  const dispatch=useDispatch();
  const [size, setSize] = useState('large');
  const onChange = (e) => {
    setSize(e.target.value);
  };

  // const {isLoading,error, data}=useSelector(store=> (store?.adminProduct?.productsData))
  // const vendorData=useSelector(st=> (st?.adminVendor?.vendorsList))
  // const orderData=useSelector(st=> (st?.adminOrder?.orderData))

  // console.log(">>>??", data);

  useEffect(()=>{
    // dispatch(getVendersList());
    // dispatch(getAllProduct({pageNo:1, limit: 100}))
    // // dispatch(get)  ALL ORDERS
    // dispatch(getAllOrders())
 

  }, [])

  const tabsArr=[
    {
       id:1,
       title:<span>"Past Trips" </span>,
       children: <div>Past</div>
    },
    {
      id:2,
      title:"Current Trips",
      children: <div>Current</div>
    },
    {
      id:3,
      title:"Upcoming Trips",
      children: <div>Upcoming</div>
    }
  ]
  return (
    <div>
    <div className='flex justify-between items-center gap-6'>
      <CardDashboard value={4} title={"All Cars"}   />
      <CardDashboard value={4} title={"Running Trips"}  />
      <CardDashboard value={5} title={"Completed Trips"}  />
    
    </div>
    <Tabs
        defaultActiveKey="1"
        className='bg-white'
        type="card"
        size={size}
        items={tabsArr.map((_, i) => {
          const id = String(i + 1);
          return {
            label: _?.title,
            key: _.id,
            children: _.children,
          };
        })}
      />
    </div>
  )
}

export default Dashboard