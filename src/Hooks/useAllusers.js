import React from 'react';
import useAxiossecure from './useAxiossecure';
import { useQuery } from '@tanstack/react-query';

const useAllusers = () => {
    const axiosSecure=useAxiossecure();
    const {data:users=[],refetch}=useQuery({
        queryKey:["users"],
        queryFn:async()=>{
            const res=await axiosSecure.get('users')
            return res.data;
        }
    })
    return [users,refetch]
}
export default useAllusers;