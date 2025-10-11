import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaShoppingCart, FaUsers, FaRegHeart, FaHistory, FaUserEdit } from "react-icons/fa";
import { GiShoppingBag, GiHamburgerMenu } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";

const Dashboard = () => {
  const isAdmin = true;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Overlay for closing drawer on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static z-50 bg-white shadow-md h-full p-6 space-y-6 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64`}>
        <div className="flex justify-center lg:justify-start items-center mb-6">
          <Link to='/' className="btn btn-ghost text-xl">
            <img src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg" alt="Logo" />
          </Link>
        </div>
        <ul className="space-y-4 font-medium text-gray-700">
          {isAdmin ? (
            <>
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/dashboard/adminHome"><IoMdHome size={20}/> Admin Home</Link></li>
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/dashboard/additem"><GiShoppingBag size={20}/> Add Items</Link></li>
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/dashboard/manageitem"><GiHamburgerMenu size={20}/> Manage Items</Link></li>
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/dashboard/allusers"><FaUsers size={20}/> All Users</Link></li>
            </>
          ) : (
            <>
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"     to="/"><IoMdHome size={20}/> User Home</Link></li>
             
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/dashboard/orderHistory"><FaHistory size={20}/> Order History</Link></li>
              <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/dashboard/userProfile"><FaUserEdit size={20}/> Update Profile</Link></li>
            </>
          )}
          <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"
          to="/orders"><FaShoppingCart size={20}/>My Carts</Link></li>
          <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/shop"><GiShoppingBag size={20}/> Shop</Link></li>
          <li><Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition" to="/whislist"><FaRegHeart size={20}/>My Whislist</Link></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 lg:ml-64 h-screen overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center bg-white shadow-md p-4 justify-between">
          <Link to='/' className="btn btn-ghost text-xl">
            <img src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg" alt="Logo" />
          </Link>
          <button onClick={() => setOpen(true)} className="text-gray-600">
            <GiHamburgerMenu size={24} />
          </button>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
