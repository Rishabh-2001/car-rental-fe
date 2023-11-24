import React, { useMemo } from "react";
import { Button, Form, Input, Select, Space, Upload, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { toast } from "react-toastify";
import { addCar } from "../../redux/admin.product.slice";

const { Option } = Select;

const AddCars = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle form submission
    console.log("Form values:", values);
    values = {
      ...values,
      images: {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Fiat_tipo_f.jpg/400px-Fiat_tipo_f.jpg",
      },
    };
    try {
      dispatch(addCar(values));
      form.resetFields();
    } catch (error) {
      toast.error(error);
    }
    message.success("Car details submitted successfully!");
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <Title level={3}> Add Cars</Title>
      <Form
        form={form}
        name="car_form"
        onFinish={onFinish}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item
          name="car"
          label="Car"
          rules={[
            {
              required: true,
              message: "Please enter the car name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="car_model"
          label="Car Model"
          rules={[
            {
              required: true,
              message: "Please enter the car model!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="car_color"
          label="Car Color"
          rules={[
            {
              required: true,
              message: "Please enter the car color!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="car_model_year"
          label="Car Model Year"
          rules={[
            {
              required: true,
              message: "Please enter the car model year!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="car_vin"
          label="Car VIN"
          rules={[
            {
              required: true,
              message: "Please enter the car VIN!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please enter the price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="availability"
          label="Availability"
          rules={[
            {
              required: true,
              message: "Please select the availability!",
            },
          ]}
        >
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please enter the car type!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="FuelType"
          label="Fuel Type"
          rules={[
            {
              required: true,
              message: "Please select the fuel type!",
            },
          ]}
        >
          <Select placeholder="Select Fuel Type">
            <Option value="Diesel">Diesel</Option>
            <Option value="Petrol">Petrol</Option>
            <Option value="CNG">CNG</Option>
            <Option value="Electric">Electric</Option>
            <Option value="Hybrid">Hybrid</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="SeatingCapacity"
          label="Seating Capacity"
          rules={[
            {
              required: true,
              message: "Please enter the seating capacity!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="NumberOfPassengers"
          label="Number of Passengers"
          rules={[
            {
              required: true,
              message: "Please enter the number of passengers!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="Mileage" label="Mileage" extra="Enter mileage in kmpl">
          <Input addonAfter="kmpl" />
        </Form.Item>

        <Form.Item name="registration" label="Registration">
          <Input />
        </Form.Item>

        <Form.Item
          name="gpsEnabled"
          label="GPS Enabled"
          rules={[
            {
              required: true,
              message: "Please select whether GPS is enabled!",
            },
          ]}
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Insurance"
          label="Insurance"
          rules={[
            {
              required: true,
              message: "Please select whether insurance is enabled!",
            },
          ]}
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        <Form.Item name="InsuranceExp" label="Insurance Expiry">
          <DatePicker disabled />
        </Form.Item>

        <Form.Item name="Location" label="Location">
          <Input />
        </Form.Item>

        <Form.Item name="features" label="Features">
          <Select mode="multiple" placeholder="Select Features">
            <Option value="AC">AC</Option>
            <Option value="Radio">Radio</Option>
            <Option value="TV">TV</Option>
            <Option value="Roof">Roof</Option>
            <Option value="Heater">Heater</Option>
            <Option value="GPS">GPS</Option>
          </Select>
        </Form.Item>

        <Form.Item name="rentalHistory" label="Rental History">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="images" label="Images">
          <Upload
            name="images"
            action="/upload.do"
            listType="picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            disabled
          >
            <Button disabled icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="isAvailable"
          label="Is Available"
          rules={[
            {
              required: true,
              message: "Please select whether the car is available!",
            },
          ]}
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        <Form.Item name="nextAvaiableDate" disabled label="Next Available Date">
          <DatePicker disabled />
        </Form.Item>

        <Form.Item name="ratings" label="Ratings">
          <Input />
        </Form.Item>

        <Form.Item name="SecurityDep" label="Security Deposit">
          <Input />
        </Form.Item>

        <Form.Item name="PerDayCharge" label="Per Day Charge">
          <Input />
        </Form.Item>

        <Form.Item name="lateChargePerDay" label="Late Charge Per Day">
          <Input />
        </Form.Item>

        <Form.Item name="discount" label="Discount">
          <Input />
        </Form.Item>

        {/* Add other form items for car object properties here based on your requirements */}

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCars;
