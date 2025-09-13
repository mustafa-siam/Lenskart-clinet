import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
const NavBar = () => {
  const NavLinks=<>
  <li><Link to={'/shop'}>Shop Now</Link></li>
  <li><Link className='text-2xl relative'><FaCartPlus /><div className="badge badge-sm absolute bottom-6 left-6 badge-secondary">+2</div></Link></li>
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
    <a className="btn">Button</a>
  </div>
</div>
    );
};

export default NavBar;