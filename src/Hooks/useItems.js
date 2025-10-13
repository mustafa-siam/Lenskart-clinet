import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxiossecure from './useAxiossecure';

const useItems = () => {
    const axiospublic=useAxiossecure();
    const {data:items=[],refetch}=useQuery({
        queryKey:["items"],
        queryFn:async()=>{
            const res=await axiospublic.get('allitems')
            return res.data;
        }
    })
    return [items,refetch]
};

export default useItems;