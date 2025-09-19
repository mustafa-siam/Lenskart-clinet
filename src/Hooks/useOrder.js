import { useQuery } from '@tanstack/react-query';
import { authcontext } from '../Providers/Authprovider';
import React, { useContext } from 'react';
import useAxiossecure from './useAxiossecure';

const useOrder = () => {
    const {user}=useContext(authcontext)
    const axiosSecure=useAxiossecure();
    const {data:orders=[],refetch}=useQuery({
       queryKey:["orders",user?.email],
       queryFn:async()=>{
      const res=await axiosSecure.get(`allorders?email=${user?.email}`)
         return res.data;
       }
    })
    return [orders,refetch]
};

export default useOrder;