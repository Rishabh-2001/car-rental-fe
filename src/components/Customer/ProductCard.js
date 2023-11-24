import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Card, Space } from "antd";
import { Typography } from "antd";
import Star from "./Start";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined
} from "@ant-design/icons";
import gas from '../../assets/gasoline-pump.png'
import gps from '../../assets/location.png'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUserDetails from "../../customHook/useUserDetails";
const { Meta } = Card;


const { Title, Text } = Typography;

const truncateDescription = (description, maxWords) => {
  const words = description.split(" ");
  if (words.length <= maxWords) {
    return description;
  }
  const truncatedDescription = words.slice(0, maxWords).join(" ");
  return `${truncatedDescription} ...`;
};

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  // const { id, product } = product;
  const cartproduct = useSelector((store) => store?.customerCard?.cart);
 const navigate=useNavigate();
  // useEffect(() => {
  //   const matchArr = cartproduct.filter((cart) => cart?.product?.productId === id);
  //   // console.log("MR:", matchArr);
  //   if (matchArr?.length > 0) {
  //     setAddedToCart(true);
  //   } else {
  //     setAddedToCart(false);
  //   }
  // }, [cartproduct]);

  async function handleRemoveCard() {
    // try {
    //   await dispatch(removeProductToCart({ productId: id }));
    //   toast.success("Removed from Cart");
    //   dispatch(getCartItems(userId));
    // } catch (error) {
    //   toast.error("Error occured:", error);
    // }
  }

   function handleCart() {
    console.log("SFSDF");
      navigate(`car/${product.id}`)
  }
    // console.log(">>>S", product);

  // const truncatedDescription = truncateDescription(
  //   product?.productDescription,
  //   15
  // );

  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    if (count === 0) {
      return 0;
    }
    let newCount = count - 1;
    if (newCount <= 0) {
      newCount = 0;
      handleRemoveCard();

      //   setToCart(false);
    }
    setCount(newCount);
  };

  return (
    <Card
      hoverable
      style={{
        width: 400,
        height: 520,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      cover={
        <img
          alt="example"
          src={product?.images?.url}
          className="object-contain block max-w-[390px] max-h-[250px] min-w-[390px] min-h-[250px]  "
        />
      }
    >
    
      <Link to={`car/${product?.id}`}>
        <Meta
          title={`${product.car}-${product?.carModel}`}
          description={<div className="flex justify-between">
            <div>
                <UserOutlined />
                <span className="ml-1">{product?.seatingCapacity}</span>
            </div>
            <div className="flex">
                <img src={gas} alt="gas" width={15} height={8} />
                <span className="ml-1">{product?.fuelType}</span>
            </div>
            <div className="flex">
                <img src={gps} alt="gas" width={15} height={8} />
                <span className="ml-1">{product?.gpsEnabled}</span>
            </div>
          </div>}
        />
     </Link>
  
      <div className="pt-4 flex justify-between items-center">
        <Title level={5}><span className="text-sm font-base text-gray-500">Rent/Day:</span> {product?.price}</Title>
        <span>{product?.rentalHistory || 0} Trips</span>
      </div>
      <div className="py-2 flex justify-between items-center" >
        <span className="font-medium"><span className="text-sm font-base text-gray-500">Mileage:</span> {product?.mileage}</span>
        <Star val={product?.rating?.rate} count={product?.ratings} />
      </div>
      {!addedToCart && (
       <Button
       className="w-full bg-blue-500 text-white hover:bg-blue-400"
       onClick={handleCart}
     >
       Book Now
     </Button>
      )}
      {addedToCart && (
        <div>
          <Space size="large">
            <div>
              <Button
                type="secondary"
                className="bg-red-500 text-white"
                onClick={handleRemoveCard}
              >
                Remove From Cart
              </Button>
            </div>
          </Space>
        </div>
      )}
     {product?.features && product?.features?.length>0? <div className="my-2 flex flex-wrap items-center">
     <span className="font-medium">Features:  </span> 
     { product?.features?.map((f,i)=>(
           <span className="px-2 py-1 bg-green-200 rounded mx-1 text-xs my-1" key={i}>{f}</span>
      ))}
      </div>: <></>}
    </Card>
  );
};

export default ProductCard;
