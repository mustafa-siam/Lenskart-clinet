import React, { useState, useEffect, useContext } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { authcontext } from '../../Providers/Authprovider';
import useAxiossecure from '../../Hooks/useAxiossecure';
import Usefavcart from '../../Hooks/Usefavcart';

const Itemcard = ({ item }) => {
  const { name, details, price, images, _id } = item;
  const { user } = useContext(authcontext);
  const axiosSecure = useAxiossecure();
  const [, refetch]=Usefavcart()
  const [isfav, setIsfav] = useState(false);
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/wishlist?email=${user.email}`)
        .then(res => {
          const found = res.data.find(w => w.itemId === _id);
          setIsfav(!!found);
        });
    }
  }, [user, _id, axiosSecure]);

 const handlefav = () => {
  if (isfav) {
    axiosSecure.delete(`/wishlist/${_id}?email=${user.email}`)
      .then(() => {
        setIsfav(false);
        refetch(); 
      });
  } else {
    axiosSecure.post('/wishlist', { email: user.email, itemId: _id })
      .then(() => {
        setIsfav(true);
        refetch(); 
      });
  }
};

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className='flex justify-end pr-2'>
        <MdFavorite
          onClick={handlefav}
          className={`text-4xl cursor-pointer transition-colors ${isfav ? 'text-red-600' : 'text-gray-500'}`}
        />
      </div>

      <figure className="hover-gallery w-full h-48 relative">
        {(images || []).slice(0, 2).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className="w-full h-full object-cover absolute"
          />
        ))}
      </figure>

      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{details}</p>
        <p className='text-lg font-bold flex items-center'>
          {price}<TbCurrencyTaka className='text-2xl' />
        </p>
        <div className="card-actions justify-end">
          <Link to={`/detailscard/${_id}`}>
            <button className="btn text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all">
              More Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Itemcard;
