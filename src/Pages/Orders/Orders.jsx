import useOrder from '../../Hooks/useOrder';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const Orders = () => {
    const [orders]=useOrder();
    const [localorders,setlocalorders]=useState([])
    useEffect(()=>{
        setlocalorders(orders)
    },[orders])
    const handledelete=(id)=>{
          console.log(id)
    }
    const handlePlaceOrder=()=>{

    }
    const handleqty=(id,type)=>{
         setlocalorders(prev=>prev.map(item=>item._id===id?{...item,orderqty:type==="inc"?Math.min(item.orderqty+1,item.availableqty):Math.max(1,item.orderqty-1)}:item))
    }
    return (
        <div className='w-full flex lg:flex-row flex-col p-2 gap-12 items-center'>
            <table className="table table-zebra overflow-x-auto lg:w-2/3">
    <thead>
      <tr>
        <th></th>
        <th>item img</th>
        <th>Name</th>
        <th>Orderqty</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        localorders.map((order,idx)=><tr key={order._id}>
        <th>{idx+1}</th>
        <td className="avatar">
  <div className="mask mask-squircle w-20">
    <img src={order.image}/>
</div>
        </td>
        <td>{order.name}</td>
        <td>
             <div className="flex items-center gap-3 bg-gray-200 w-fit text-xl font-bold px-3 py-2 rounded-full hover:border-2 border-orange-500">
                    <FaMinus 
                    className="cursor-pointer"
                    onClick={() => handleqty(order._id, "dec")}

                    />
                     <span className="px-2 ">{order.orderqty}</span>
                    <FaPlus 
                    className="cursor-pointer"
                    onClick={()=>handleqty(order._id,"inc")}
                    />
                   </div>
        </td>
        <td>{order.price}</td>
        <td onClick={()=>handledelete(order._id)} className='text-2xl text-red-600 cursor-pointer'><AiFillDelete /></td>
        </tr>)
      }
    </tbody>
  </table>
   <div className='lg:w-1/3 shadow-xl p-4 space-y-4'>
                <h2 className='font-medium'>CART TOTALS</h2>
                <hr />
                <div className="bg-base-100 collapse collapse-arrow border-base-300 border">
                    <input type="checkbox" className="peer" />
                    <div
                        className="collapse-title text-[#54595F]"
                    >
                        Add cuopons
                    </div>
                    <div
                        className="collapse-content"
                    >
                        <div className="join w-full">
                            <input type="text" className="input join-item" placeholder="Enter Code" />
                            <button className="btn join-item text-white bg-[#e9004b]">Apply</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='flex justify-between text-lg'>
                    <p>Free Shipping</p>
                    <p className='font-semibold'>Free</p>
                </div>
                <hr />
                <div className='text-xl font-bold flex justify-between'>
                    <p>Total item price</p>
                    <p>{localorders.reduce((sum,item)=>sum+item.price*item.orderqty,0)}</p>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    disabled={orders.length < 1}
                    className={`btn w-full text-xl my-4 py-6
                        ${orders.length < 1
                            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                            : 'bg-[#e9004b] text-white hover:text-[#e9004b] hover:bg-white hover:border-red-600'}`}
                >
                    Place the Order
                </button>
            </div>
        </div>
    );
};

export default Orders;