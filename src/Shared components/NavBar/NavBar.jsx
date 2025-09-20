import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import Registration from '../../Account/Registration';
import Login from '../../Account/Login';
import { authcontext } from '../../Providers/Authprovider';
import { toast } from 'react-toastify';
import useOrder from '../../Hooks/useOrder';
const NavBar = () => {
  const [showlogin,setshowlogin]=useState(true)
  const {user,logout}=useContext(authcontext)
  const [orders]=useOrder();
  const handlesignout=()=>{
  logout()
  .then(()=>{
    toast.success("Logout Successfully")
  })
  }
  const NavLinks=<>
  <li><Link to={'/shop'}>Shop Now</Link></li>
  <li><Link to={'/orders'} className='text-2xl relative'><FaCartPlus /><div className="badge badge-sm bg-red-600 absolute bottom-6 left-6 badge-secondary font-extrabold text-sm">{orders.length}</div></Link></li>
  <li><Link>Blog</Link></li>
  </>
    return (
       <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        {NavLinks}
      </ul>
    </div>
    <Link className="btn btn-ghost text-xl"><img src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg" alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {NavLinks}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?(<button className='btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300' onClick={handlesignout}>Sign Out</button>):(<button className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition duration-300" onClick={()=>document.getElementById('automodal').showModal()}>Sign In</button>)
    }
    <dialog id="automodal" className="modal">
  <div className="modal-box bg-base-200 border-base-300 rounded-box border p-4">
    <form method="dialog" onSubmit={()=>setshowlogin(true)}>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">✕</button>
    </form>
    <div className='flex justify-center'>
      {
        showlogin?(
         <Login onswitch={()=>setshowlogin(false)}></Login>
        ):(
          <Registration onswitch={()=>setshowlogin(true)}></Registration>
        )
      }
    </div>
    
  </div>
</dialog>
  </div>
</div>
    );
};

export default NavBar;