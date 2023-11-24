import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Select, Button } from "antd";
import { Spin, Typography } from "antd";
import { Avatar, Card,  } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import useUserDetails from "../../customHook/useUserDetails";
import { getAllCars } from "../../redux/customer.car.slice";
const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;
const CarListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const [carsData, setCarsData] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useUserDetails();

  useEffect(() => {
    dispatch(getAllCars({ page, limit }));
  }, [page, limit]);

  const { error, isLoading, data } = useSelector(
    (store) => store?.customerCar?.allCars
  );
  if (error) {
    toast.error(error);
  }
  // console.log(">>>", carsData);


  useEffect(() => {
    setCarsData(data);
  }, [data]);

  useEffect(() => {
    // filterDataCategory(selectedCategory);
  }, [selectedCategory]);
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  function handleNext() {
    setPage((prev) => prev + 1);
  }
  function handlePrev() {
    setPage((prev) => prev - 1);
  }


  const FuelTypeFilter = ({ onChange }) => (
    <Select
      placeholder="Select Fuel Type"
      style={{ width: 150 }}
      onChange={onChange}
    >
      <Option value="petrol">Petrol</Option>
      <Option value="diesel">Diesel</Option>
      <Option value="gas">Gas</Option>
      <Option value="cng">CNG</Option>
      <Option value="electricHybrid">Electric Hybrid</Option>
    </Select>
  );

  // Number of Passengers Filter
  const NumberOfPassengersFilter = ({ onChange }) => (
    <Select
      placeholder="Select Number of Passengers"
      style={{ width: 150 }}
      onChange={onChange}
    >
      <Option value="2">Up to 2</Option>
      <Option value="4">Up to 4</Option>
      <Option value="6">Up to 6</Option>
      <Option value="8">Up to 8</Option>
      <Option value="10">Up to 10</Option>
    </Select>
  );

  // Ratings Filter
  const RatingsFilter = ({ onChange }) => (
    <Select
      placeholder="Select Ratings"
      style={{ width: 150 }}
      onChange={onChange}
    >
      <Option value="1">1 Star</Option>
      <Option value="2">2 Stars</Option>
      <Option value="3">3 Stars</Option>
      <Option value="4">4 Stars</Option>
      <Option value="5">5 Stars</Option>
    </Select>
  );

  // Number of Trips Completed Filter
  const TripsCompletedFilter = ({ onChange }) => (
    <Select
      placeholder="Select Number of Trips Completed"
      style={{ width: 150 }}
      onChange={onChange}
    >
      <Option value="10">Up to 10</Option>
      <Option value="50">Up to 50</Option>
      <Option value="100">Up to 100</Option>
      <Option value="500">Up to 500</Option>
      <Option value="1000">Up to 1000</Option>
    </Select>
  );

  // Your existing category buttons
  const CategoryButtons = ({ selectedCategory, handleCategoryClick }) => (
    <div className="flex gap-2">{/* Your category buttons here */}</div>
  );

  const handleFuelTypeChange = (value) => {
    // Handle the change of fuel type filter
    console.log("Selected Fuel Type:", value);
  };

  const handlePassengersChange = (value) => {
    // Handle the change of number of passengers filter
    console.log("Selected Number of Passengers:", value);
  };

  const handleRatingsChange = (value) => {
    // Handle the change of ratings filter
    console.log("Selected Ratings:", value);
  };

  const handleTripsCompletedChange = (value) => {
    // Handle the change of trips completed filter
    console.log("Selected Trips Completed:", value);
  };

  return (
    <div className="">
      <Title level={3}>All Products</Title>
      <Title level={5}>Explore Categories</Title>
      <div>
        <FuelTypeFilter onChange={handleFuelTypeChange} />
        <NumberOfPassengersFilter onChange={handlePassengersChange} />
        <RatingsFilter onChange={handleRatingsChange} />
        <TripsCompletedFilter onChange={handleTripsCompletedChange} />
        <CategoryButtons />
      </div>

      <Spin spinning={isLoading}>
        <div className="flex gap-2 my-2 flex-wrap justify-between ">
          {carsData && carsData?.data?.cars?.length > 0 ? (
            <>
              {" "}
              {carsData &&
                carsData?.data?.cars?.map((product, idx) => (
                  <div className="py-2 " key={idx}>
                    <ProductCard product={product} userId={userId} />
                  </div>
                ))}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-between gap-2 my-4">
                <Card
                  style={{
                    width: 280,
                    height: 480,
                    marginTop: 16,
                  }}
                  loading={loading}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
                <Card
                  style={{
                    width: 280,
                    height: 480,
                    marginTop: 16,
                  }}
                  loading={loading}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
                <Card
                  style={{
                    width: 280,
                    height: 480,
                    marginTop: 16,
                  }}
                  loading={loading}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
              </div>

              <Spin />
            </div>
          )}
        </div>
      </Spin>

      <div className="my-4 flex gap-4 justify-end">
        {page >= 2 ? <Button onClick={handlePrev}>Previous</Button> : <></>}
        {page <= carsData?.data?.totalPages ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CarListingPage;
