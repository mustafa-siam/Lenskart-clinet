import Itemcard from '../../Pages/Itemcard/Itemcard';
import Usefavcart from '../../Hooks/Usefavcart';
import React from 'react';

const Whislist = () => {
    const [favcarts]=Usefavcart()
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {favcarts.map(item=><Itemcard item={item} key={item._id}></Itemcard>)}
        </div>
    );
};

export default Whislist;