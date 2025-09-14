import React, { useState } from 'react';
import useItems from '../../Hooks/useitems';
import { FaFilter } from "react-icons/fa6";
import Itemcard from '../Itemcard/Itemcard';
const Shop = () => {
  const [items]=useItems()
  return (
    <div className='max-w-7xl mx-auto'>
      <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content space-y-12">
    <div className='flex justify-between'>
      <div><label htmlFor="my-drawer" className="btn btn-primary drawer-button">Filter <FaFilter /></label></div>
      <div>
        <input type="text" placeholder="What Are U Looking For?" className="input input-md w-80" />
      </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {
        items.map(item=><Itemcard key={item._id} item={item}></Itemcard>)
      }
    </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
    </div>
  );
};

export default Shop;