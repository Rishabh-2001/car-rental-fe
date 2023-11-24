import { Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CardDashboard from "./CardDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../redux/admin.cars.slice";
import { toast } from "react-toastify";
const { Title } = Typography;

const Cars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [action, setAction] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("");

  const { data, error, isLoading } = useSelector(
    (store) => store?.adminCar?.carsData
  );
  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    dispatch(getCars({ pageNo, limit }));
  }, [pageNo, limit]);

  const onClick = (key, truckID, recordkey, rstatus) => {
    if (key === "1") {
      // setTID(truckID);
      // setTvalue(recordkey);
      // setModalDelete(true);
    }
    if (key === "2") {
      // setTID(truckID);
      // setTvalue(recordkey);
      // setTuckStatus(rstatus);
      // setModalDeactivate(true);
    }
  };

  const items = (vendor) => [
    {
      key: "1",
      label: "Delete Car",
    },
    {
      key: "2",
      label: vendor === "ACTIVE" ? "Inactive Car" : "Active Car",
    },
  ];

  const columns = [
    {
      title: "Car ID",
      dataIndex: "carID",
      key: "carID",
      width: 160,
      fixed: "left",
      render: (text, record) => (
        <Link className="text-blue-600" to={`${record?.carID}`}>
          {text}
        </Link>
      ),
    },

    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
      width: 160,
    },
    {
      title: "Car Fuel Type",
      dataIndex: "fuelType",
      key: "fuelType",
      width: 160,
    },
    {
      title: "Model Year",
      dataIndex: "modelYear",
      key: "modelYear",
      width: 160,
    },
    {
      title: "Insurance Exp",
      dataIndex: "expInsurance",
      key: "expInsurance",
      width: 160,
    },
    {
      title: "Registration",
      dataIndex: "reg",
      key: "reg",
      width: 160,
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 160,
      render: (text, record) => (
        <Badge status={text === "ACTIVE" ? "success" : "error"} text={text} />
      ),
    },
    {
      title: "Joined On",
      dataIndex: "joinedOn",
      key: "joinedOn",
      width: 200,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 200,
    },
    {
      title: "Total Trips",
      dataIndex: "totalTrips",
      key: "totalTrips",
      width: 160,
    },
    {
      title: "Mileage",
      dataIndex: "mileage",
      key: "mileage",
      width: 160,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 160,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      width: 160,
    },
    {
      title: "Rent/Day",
      dataIndex: "rent",
      key: "rent",
      width: 160,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 90,
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: items(record.status),

              onClick: ({ key }) =>
                onClick(key, record.vendorID, record.key, record.status),
            }}
          >
            <EllipsisOutlined rotate={90} />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const locale = {
    emptyText: isLoading ? (
      <Spin tip="Loading" size="large" />
    ) : (
      <Empty
        className="flex flex-col items-center justify-center p-10"
        // image={EmptyImage}
        imageStyle={{ height: 250 }}
        description={
          <div className="flex w-80 flex-col gap-4">
            <Typography.Text className="text-lg text-black">
              No Car Yet. Click to Add Car.
            </Typography.Text>
            <Button
              size="large"
              type="primary"
              className="bg-blue-600 text-white"
              onClick={() => navigate("add")}
            >
              + Add Car{" "}
            </Button>
          </div>
        }
      />
    ),
  };
  console.log("DFDFD", data?.data?.data);

  const mapdata = isLoading
    ? []
    : data?.data?.data &&
      data?.data?.data?.cars?.map((d, idx) => ({
        key: idx,
        carID: d?.id || idx,
        carName: `${d?.car}-${d?.carModel}` || "",
        country: d?.country || "India",
        joinedOn: d?.createdAt,
        status: d?.status || "ACTIVE",
        reg: d?.registration || 0,
        expInsurance: d?.soldProducts || 0,
        modelYear: d?.carModelYear || 0,
        fuelType: d?.fuelType,
        revenue: d?.revenue || 0,
        rating: d?.rating || 5,
        mileage: d?.mileage,
        totalTrips: d?.rentalHistory || 0,
        rent: d?.price,
      }));

  return (
    <div>
      <Title level={3}>Cars</Title>
      {/* CARDS  */}
      <div className="flex flex-col ">
        <Button
          type="primary"
          size="large"
          className="ml-auto -mt-10 flex justify-end bg-blue-600 text-white"
          onClick={() => navigate("add")}
        >
          + Add Car
        </Button>
        <div className="mt-11 mb-6">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"All Cars"}
                value={data?.data?.data?.totalItems}
              />
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Available Cars"}
                value={data?.data?.data?.totalItems}
              />
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Booked Cars"}
                value={data?.data?.data?.booked || 0}
              />
            </Col>
          </Row>
        </div>
        <div className=" bg-white py-4 px-4">
          <div className="flex flex-col justify-between gap-2 pb-6 md:flex-row">
            <div className="flex flex-col gap-2">
              <Typography.Text>Search:</Typography.Text>
              <Input.Search
                className="md:w-[440px]"
                placeholder="Search Cars"
                //    onChange={(e) => setSearchKey(e.target.value)}
                allowClear
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Typography.Text>Car Status:</Typography.Text>
              <Select
                defaultValue="All"
                onChange={(value) => setAction(value)}
                options={[
                  { value: "", label: "All" },
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" },
                ]}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Typography.Text>Car OwnerShip:</Typography.Text>
              <Select
                defaultValue="All"
                onChange={(value) => setType(value)}
                options={[
                  { value: "", label: "All" },
                  { value: "PERMANENT", label: "Permanent" },
                  { value: "TEMPORARY", label: "Temporary" },
                ]}
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={mapdata}
            locale={locale}
            scroll={{ x: 1000 }}
            pagination={{
              pageSize: limit,
              total: data?.data?.data?.totalItems,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
              onChange: (page, newPageSize) => {
                setPageNo(page);
                setLimit(newPageSize);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cars;
