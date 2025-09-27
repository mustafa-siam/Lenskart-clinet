import React from 'react';
import Itemcard from '../../Pages/Itemcard/Itemcard';
import Usefavcart from '../../Hooks/Usefavcart';
import useItems from '../../Hooks/useItems';

const Whislist = () => {
  const [favcarts] = Usefavcart();
  const [items] = useItems();     
  const wishlistItems = items.filter(item =>
    favcarts.some(fav => fav.itemId === item._id)
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {wishlistItems.length > 0 ? (
        wishlistItems.map(item => <Itemcard item={item} key={item._id} />)
      ) : (
        <p className="text-center col-span-full text-xl font-semibold">
          Your wishlist is empty 😟
        </p>
      )}
    </div>
  );
};

export default Whislist;
