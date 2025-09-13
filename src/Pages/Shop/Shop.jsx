import React, { useState } from 'react';
import useAxiossecure from '../../Hooks/useaxiossecure';

const Shop = () => {
  const axiosinstance=useAxiossecure()
  const [carts,setcarts]=useState([])
  axiosinstance.get('allcarts')
  .then(res=>setcarts(res.data))
  return (
    <div>
      <h1>{carts.length}</h1>
    </div>
  );
};

export default Shop;