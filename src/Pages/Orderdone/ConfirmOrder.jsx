import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiossecure from '../../Hooks/useAxiossecure';
import { FaShippingFast, FaAddressCard, FaCheckCircle } from 'react-icons/fa';
const ConfirmOrder = () => {
  const { orderid } = useParams();
  const axiosSecure = useAxiossecure();

  const { data: order = {} } = useQuery({
    queryKey: ['order', orderid],
    queryFn: async () => {
      const res = await axiosSecure.get(`orderhistory/${orderid}`);
      return res.data;
    },
  });

  const totalPrice = order.orders?.reduce(
    (sum, item) => sum + item.price * item.orderqty,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-600 flex items-center gap-2">
        <FaCheckCircle /> Thank you. Your order has been received.
      </h1>
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <p><span className="font-semibold">Order number:</span> {order._id}</p>
            <p><span className="font-semibold">Order Date:</span> {order.orderDate}</p>
          </div>
          <div>
            <p><span className="font-semibold">Total:</span> ${totalPrice}</p>
            <p><span className="font-semibold">Payment method:</span> {order.payment === "cod" ? "Cash on delivery" : "Online Payment"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Details</h2>
        <table className="table table-zebra w-full text-sm mb-4">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.orders?.map((item) => (
              <tr key={item._id}>
                <td>{item.name} × {item.orderqty}</td>
                <td className="text-right">${item.price * item.orderqty}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td>Subtotal</td>
              <td className="text-right">${totalPrice}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="text-right">Free shipping</td>
            </tr>
            <tr className="font-bold text-lg">
              <td>Total</td>
              <td className="text-right">${totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="font-semibold mb-2 text-lg flex items-center gap-2">
            <FaAddressCard /> Billing Address
          </h3>
          <p>{order.street}, {order.house}</p>
          <p>{order.city}, {order.district}</p>
          <p>Phone: {order.phone}</p>
          <p>Email: {order.email}</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="font-semibold mb-2 text-lg flex items-center gap-2">
            <FaShippingFast /> Shipping Address
          </h3>
          <p>{order.street}, {order.house}</p>
          <p>{order.city}, {order.district}</p>
          <p>Phone: {order.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
