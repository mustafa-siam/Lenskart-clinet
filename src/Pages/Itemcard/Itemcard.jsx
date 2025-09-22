import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import useAxiossecure from '../../Hooks/useAxiossecure';
import useItems from '../../Hooks/useItems';

const Itemcard = ({item}) => {
    const {name,details,price,images,_id,favcart}=item;
    const [,refetch]=useItems()
    const [isfav,setisfav]=useState(favcart);
   const axiosSecure=useAxiossecure();
    const handlefav=()=>{
      const newfav=!isfav;
      setisfav(newfav);
      const favcart={
        favcart:newfav,
      }
      axiosSecure.patch(`/allitems/${_id}`,favcart)
      .then(res=>{
        if(res.data.modifiedCount>0){
          refetch()
        }
      })

    }
    return (
            <div className="card bg-base-100  shadow-sm">
              <div onClick={handlefav} className='flex justify-end pr-2 text-gray-500 '>
    <MdFavorite  
    className={`text-4xl cursor-pointer hover:text-red-600 transition-colors ${isfav ? 'text-red-600' : 'text-gray-500'}`}
    />
  </div>
  <figure className="hover-gallery w-full h-48 relative">
   {
    images.slice(0,2).map((img,idx)=>(
        <img 
        key={idx}
        src={img}
        alt="" 
        className="w-full h-full object-cover absolute"
        />
    ))
   }
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{details}</p>
    <p className='text-lg font-bold flex items-center'>{price}<TbCurrencyTaka className='text-2xl'></TbCurrencyTaka></p>
    <div className="card-actions justify-end">
      <Link to={`/detailscard/${_id}`}>
      <button className="btn text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all">More Info</button>
      </Link>
    </div>
  </div>
</div>
    );
};

export default Itemcard;