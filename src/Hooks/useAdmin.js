import { authcontext } from '../Providers/Authprovider';
import React, { useContext } from 'react';
import useAxiossecure from './useAxiossecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user}=useContext(authcontext)
    const axiosSecure=useAxiossecure()
    const {data:role}=useQuery({
        queryKey:["isAdmin"],
        queryFn:async()=>{
            const res=await axiosSecure.get(`users/admin/${user?.email}`);
            return res.data.role;
        }
    })
   const isAdmin=role === "admin"
    return [isAdmin]
};

export default useAdmin;