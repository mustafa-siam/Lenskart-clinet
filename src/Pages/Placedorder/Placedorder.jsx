import { authcontext } from '../../Providers/Authprovider';
import useOrder from '../../Hooks/useOrder';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAxiossecure from '../../Hooks/useAxiossecure';
import { toast } from 'react-toastify';
import moment from 'moment';

const Placedorder = () => {
  const [orders] = useOrder();
  const {user}=useContext(authcontext)
  const navigate=useNavigate();
  const axiosSecure=useAxiossecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form submit handler
  const onSubmit = (data) => {
     const saveorder = {
      userName:user?.displayName,
    ...data,
    orders,
    total: orders.reduce((sum, item) => sum + item.price * item.orderqty, 0),
    user: user?.email,
    orderDate:moment().format("DD-MM-YYYY"),
    status: "Pending",
  };
    if(data.payment==="cod"){
     axiosSecure.post('/orderhistory',saveorder)
     .then(res=>{
      if(res.data.insertedId){
          toast.success("Your order has been received.")
          const orderid=res.data.insertedId;
          setTimeout(() => {
        navigate(`/orderconfirm/${orderid}`)
       }, 2000);
      }
     })  
    }
    else{
     navigate('/payment',{state:{data}})
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 border-b pb-2">
          Delivery Information
        </h1>
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">District</label>
            <input
              type="text"
              {...register("district", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter district"
            />
            {errors.district && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="label font-medium">City</label>
            <input
              type="text"
              {...register("city", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter city"
            />
            {errors.city && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="label font-medium">Street Address</label>
            <input
              type="text"
              {...register("street", { required: true })}
              className="input input-bordered w-full"
              placeholder="Street address"
            />
            {errors.street && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="label font-medium">House Number</label>
            <input
              type="text"
              {...register("house", { required: true })}
              className="input input-bordered w-full"
              placeholder="House name & number"
            />
            {errors.house && <span className="text-red-600 text-sm">This field is required</span>}
          </div>
<div>
  <label className="label font-medium">Email</label>
  <input
    type="email"
    defaultValue={user?.email || ""}
    {...register("email", { 
      required: "Email is required", 
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email"
      }
    })}
    className="input input-bordered w-full"
    placeholder="example@email.com"
  />
  {errors.email && (
    <span className="text-red-600 text-sm">{errors.email.message}</span>
  )}
</div>

<div>
  <label className="label font-medium">Phone</label>
  <input
    type="tel"
    {...register("phone", { 
      required: "Phone number is required", 
      pattern: {
        value: /^01[3-9]\d{8}$/,
        message: "Enter a valid Bangladeshi phone number"
      }
    })}
    className="input input-bordered w-full"
    placeholder="01XXXXXXXXX"
  />
  {errors.phone && (
    <span className="text-red-600 text-sm">{errors.phone.message}</span>
  )}
</div>
          <input
  type="date"
  {...register("deliveryDate", {
    required: "Delivery date is required",
  })}
  className="input input-bordered w-full"
  min={new Date().toISOString().split("T")[0]}
/>
{errors.deliveryDate && (
  <span className="text-red-600 text-sm">{errors.deliveryDate.message}</span>
)}

          <div>
            <label className="label font-medium">Delivery Time</label>
            <input
              type="time"
              {...register("deliveryTime", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.deliveryTime && <span className="text-red-600 text-sm">This field is required</span>}
          </div>
        </fieldset>
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Select Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="cod" {...register("payment", { required: true })} className="radio radio-primary"/>
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="online" {...register("payment", { required: true })} className="radio radio-primary"/>
              <span>Online Payment</span>
            </label>
          </div>
          {errors.payment && <span className="text-red-600 text-sm">Please select a payment method</span>}
        </div>
      </div>
      <div className="lg:w-1/3 flex flex-col space-y-12">
        <div className='bg-white rounded-2xl shadow-md p-6'>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.name} × {order.orderqty}</td>
                  <td className="text-right">{order.price * order.orderqty}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold">
                <td>Total</td>
                <td className="text-right">
                  {orders.reduce((sum, item) => sum + item.price * item.orderqty, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Billing Details + Place Order */}
        <div className='bg-white rounded-2xl shadow-md p-6 space-y-3'>
          <h2 className='font-medium'>Billing Details</h2>
          <hr />
          <div className="bg-base-100 collapse collapse-arrow border-base-300 border">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-[#54595F]">Add coupons</div>
            <div className="collapse-content">
              <div className="join w-full">
                <input type="text" className="input join-item" placeholder="Enter Code" />
                <button type="button" className="btn join-item text-white bg-[#e9004b]">Apply</button>
              </div>
            </div>
          </div>
          <hr />
          <div className='flex justify-between text-base'>
            <p className='font-semibold'>Free Shipping</p>
            <p className='font-semibold'>Free</p>
          </div>
          <hr />
          <div className='text-xl font-bold flex justify-between'>
            <p>Total item price</p>
            <p>{orders.reduce((sum,item)=>sum+item.price*item.orderqty,0)}</p>
          </div>
          <button
           type="submit" 
           disabled={orders.length < 1}
           className={`w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all duration-300
         ${orders.length < 1 ? 'bg-gray-300 cursor-not-allowed' 
         : 'cursor-pointer bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:to-fuchsia-500 shadow-lg hover:shadow-xl'
    }`}>
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placedorder;
