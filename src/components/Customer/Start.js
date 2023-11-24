import React from 'react';
import { Rate } from 'antd';
const Star = ({val,count}) =>{
  return (
    <div >
 <Rate allowHalf defaultValue={val} className='text-xs'/>
 <span>({count})</span>
    </div>
  )
}
export default Star;