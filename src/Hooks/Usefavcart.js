import React from 'react';
import useItems from './useItems';

const Usefavcart = () => {
    const [items]=useItems();
    const favcarts=items.filter(item=>item.favcart===true)
    return [favcarts]
};

export default Usefavcart;