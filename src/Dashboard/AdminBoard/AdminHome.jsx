import React, { useEffect, useState } from "react";
import { FaUsers, FaShoppingBag, FaDollarSign, FaClock, FaCheckCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";
import useAllusers from "../../Hooks/useAllusers"; //
import useAxiossecure from "../../Hooks/useAxiossecure";

const AdminHome = () => {
    const axiosSecure=useAxiossecure();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });
  const [allOrders, setAllOrders] = useState([]);
  const [users] = useAllusers(); 

  useEffect(() => {
    // Fetch dashboard stats
    axiosSecure.get("admin/stats").then(res => setStats(res.data));

    // Fetch all orders
    axiosSecure.get("orderhistory").then(res => setAllOrders(res.data));
  }, []);

  // Prepare chart data
  const ordersPerDay = allOrders.reduce((acc, order) => {
    acc[order.orderDate] = (acc[order.orderDate] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(ordersPerDay).map(date => ({
    day: date,
    orders: ordersPerDay[date],
  }));

  const deliveryData = [
    { name: "Delivered", value: stats.deliveredOrders },
    { name: "Pending", value: stats.pendingOrders },
  ];
  const COLORS = ["#4caf50", "#ff9800"];

  // Recent orders
  const recentOrders = allOrders.slice(0, 5);

  // Top users
  const topUsers = users
    .map(user => {
      const userOrders = allOrders.filter(o => o.email === user.email);
      const totalSpent = userOrders.reduce((acc, o) => acc + o.total, 0);
      return { ...user, totalOrders: userOrders.length, totalSpent };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded shadow flex items-center gap-3">
          <FaShoppingBag size={30} className="text-indigo-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-xl font-bold">{stats.totalOrders}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-3">
          <FaUsers size={30} className="text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-xl font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-3">
          <FaDollarSign size={30} className="text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-xl font-bold">৳{stats.totalRevenue}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-3">
          <FaClock size={30} className="text-orange-500" />
          <div>
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <p className="text-xl font-bold">{stats.pendingOrders}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-3">
          <FaCheckCircle size={30} className="text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Delivered Orders</p>
            <p className="text-xl font-bold">{stats.deliveredOrders}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-3">Orders per Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-3">Delivery Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deliveryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {deliveryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">Recent Orders</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">User</th>
              <th className="border px-2 py-1 text-left">Amount</th>
              <th className="border px-2 py-1 text-left">Status</th>
              <th className="border px-2 py-1 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{order.userName || order.email}</td>
                <td className="border px-2 py-1">৳{order.total}</td>
                <td className="border px-2 py-1 capitalize">{order.status}</td>
                <td className="border px-2 py-1">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/dashboard/allorders" className="inline-block mt-2 text-indigo-600 font-semibold">
          View All Orders
        </Link>
      </div>

      {/* Top Users */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">Top Users</h3>
        <ul>
          {topUsers.map(user => (
            <li key={user._id} className="flex justify-between border-b py-1">
              <span>{user.name}</span>
              <span>{user.totalOrders} orders | ৳{user.totalSpent}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/dashboard/manageitem" className="bg-indigo-500 text-white p-4 rounded shadow text-center hover:bg-indigo-600">
          Manage Products
        </Link>
        <Link to="/dashboard/allorders" className="bg-green-500 text-white p-4 rounded shadow text-center hover:bg-green-600">
          View All Orders
        </Link>
        <Link to="/dashboard/allusers" className="bg-yellow-500 text-white p-4 rounded shadow text-center hover:bg-yellow-600">
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
