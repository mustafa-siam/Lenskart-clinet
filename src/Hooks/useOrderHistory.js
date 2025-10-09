import React, { useContext } from 'react';
import useAxiosSecure from './useAxiossecure';
import { authcontext } from '../Providers/Authprovider';
import { useQuery } from '@tanstack/react-query';

const useOrderHistory = () => {
    const axiosSecure=useAxiosSecure();
    const {user}=useContext(authcontext)
    const {data:orderHistory=[],refetch}=useQuery({
        queryKey:["orderHistory",user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/orderhistory?email=${user?.email}`)
            return res.data;
        }
    })
    return [orderHistory,refetch]
};

export default useOrderHistory;