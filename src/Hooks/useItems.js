import React from 'react';
import usePubliceAxios from './usePubliceAxios';
import { useQuery } from '@tanstack/react-query';

const useItems = () => {
    const axiospublic=usePubliceAxios();
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