import { Badge, Button } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import React, { useState } from 'react'
import { MinusOutlined, PlusOutlined,ShoppingCartOutlined, QuestionOutlined } from '@ant-design/icons';
import { addProductToCart, getCartItems, removeProductToCart } from '../../redux/cart.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useUserDetails from '../../customHook/useUserDetails';

const CartCard = ({cart}) => {
    const [count,setCount]=useState(1);
    const dispatch=useDispatch();
    const {userId}=useUserDetails();
    console.log("CART", cart);

    async function handleRemoveCard() {
        try {
           await dispatch(removeProductToCart({productId:cart?.data?.productId}))
           toast.success("Removed from Cart")
           dispatch(getCartItems(userId));
        } catch (error) {
           toast.error("Error occured:",error)
        }
     };
   
   
    
   
     async function handleCart() {
   
       const payload={
           productId: cart?.data?.productId,
           vendorId: cart?.data?.vendorId,
           quantity: count, 
       }
       
       try {
          await dispatch(addProductToCart(payload))
          toast.success("Item Added to Cart")
          dispatch(getCartItems(userId))
          setCount(1);
       } catch (error) {
            toast.error(error)
       }
   
   
   
     }  

    const increase = async () => {
        setCount(count + 1);
        try {
             handleCart();
        } catch (error) {
            toast.error(error)
        }

      };
      const decline = () => {
        if(count===0)
        {
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

      function calculateAmount()
      {
        return count*cart?.productData?.productPrice;
      }
      
  return (
    <div>
        <div className='flex justify-between'>
            <div className='flex'>
                <img src={cart?.productData?.image} className='block object-cover max-h-[100px] max-w-[100px] p-2 mr-2' />
                <div>
                    <p className='font-medium text-xl '>Revero Alchemist </p>
                    <span className='text-[#333]'>Lorem ipsum dolor sit amet consectetur.</span>
                </div>
             </div>

<div className='flex items-center gap-4'>
<div>
                <ButtonGroup className='flex gap-4 my-4'>
                    <Button onClick={decline} icon={<MinusOutlined />} size='small' />
                    <Badge count={count} className='text-xs'>
                        <ShoppingCartOutlined className='text-xl' />
                    </Badge>
                    <Button onClick={increase} icon={<PlusOutlined />} size='small' />
                </ButtonGroup>
                <Button type='secondary' className='bg-red-500 text-white' onClick={handleRemoveCard}>Remove From Cart</Button>
             </div>

             <div>
                <span className='font-medium text-base'>$ </span>
                <span className='font-medium text-base'>{cart?.productData?.productPrice} * {count}=</span>
                <span className='font-medium text-base'> $ {calculateAmount()}</span>
             </div>
</div>
            



        </div> 


    </div>
  )
}

export default CartCard