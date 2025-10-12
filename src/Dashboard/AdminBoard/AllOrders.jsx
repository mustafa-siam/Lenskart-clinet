import React, { useState } from "react";
import useAllOrders from "../../Hooks/useAllOrders";
import { FaChevronDown, FaChevronUp, FaCheckCircle, FaClock } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import useAxiossecure from "../../Hooks/useAxiossecure";
import { toast } from "react-toastify";
const AllOrders = () => {
  const [allOrders, refetch] = useAllOrders();
  const [openOrder, setOpenOrder] = useState(null);
  const axiosSecure=useAxiossecure();
  const handleStatusChange = async (orderId, newStatus) => {
     const res= await axiosSecure.patch(`orderhistory/${orderId}`, { status: newStatus });
       if (res.data.modifiedCount > 0) {
  toast.success("Order status updated");
      refetch();
       }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-fuchsia-100 py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-fuchsia-200">
        <h2 className="text-3xl font-bold text-fuchsia-700 mb-8">All Orders</h2>

        {allOrders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">No orders found.</p>
        ) : (
          allOrders.map((order) => (
            <div key={order._id} className="bg-white mb-6 p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition">
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                onClick={() => setOpenOrder(openOrder === order._id ? null : order._id)}
              >
                <div className="mb-2 sm:mb-0">
                  <p className="text-lg font-semibold text-gray-800">
                    Order Date: <span className="text-fuchsia-700">{order.orderDate}</span>
                  </p>
                  <p className="text-sm text-gray-600">User: {order.userName}</p>
                  <p className="text-sm text-gray-600">Payment: {order.payment}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold flex items-center gap-1 text-fuchsia-700">
                    <TbCurrencyTaka /> {order.total}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status === "Delivered" ? <FaCheckCircle /> : <FaClock />} {order.status}
                  </span>
                  {openOrder === order._id ? <FaChevronUp className="text-fuchsia-600" /> : <FaChevronDown className="text-fuchsia-600" />}
                </div>
              </div>

              {openOrder === order._id && (
                <div className="mt-4 border-t pt-4 overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-3 text-fuchsia-700">Purchased Items</h3>
                  <table className="w-full text-sm border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-fuchsia-100 text-gray-700">
                        <th className="py-2 px-3 text-left">Product</th>
                        <th className="py-2 px-3 text-center">Qty</th>
                        <th className="py-2 px-3 text-center">Price</th>
                        <th className="py-2 px-3 text-center">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orders.map((item, idx) => (
                        <tr key={idx} className="border-b hover:bg-fuchsia-50">
                          <td className="py-2 px-3">{item.name}</td>
                          <td className="py-2 px-3 text-center">{item.orderqty}</td>
                          <td className="py-2 px-3 text-center flex justify-center items-center gap-1">
                            <TbCurrencyTaka /> {item.price}
                          </td>
                          <td className="py-2 px-3 text-center gap-1">
                            {item.price * item.orderqty}tk
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-semibold bg-fuchsia-50">
                        <td className="py-2 px-3 text-left">Total</td>
                        <td></td>
                        <td></td>
                        <td className="py-2 px-3 text-center flex justify-center items-center gap-1">
                          <TbCurrencyTaka /> {order.orders.reduce((sum, item) => sum + item.price * item.orderqty, 0)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* Status Buttons */}
                  <div className="mt-4 flex gap-3">
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => handleStatusChange(order._id, "Delivered")}
                        className="btn bg-green-600 text-white hover:bg-green-700"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {order.status !== "Pending" && (
                      <button
                        onClick={() => handleStatusChange(order._id, "Pending")}
                        className="btn bg-yellow-600 text-white hover:bg-yellow-700"
                      >
                        Mark as Pending
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllOrders;
