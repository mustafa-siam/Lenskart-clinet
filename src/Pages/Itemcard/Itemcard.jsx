import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Itemcard = ({item}) => {
    const {name,details,price,images,_id}=item;
    return (
            <div className="card bg-base-100  shadow-sm">
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