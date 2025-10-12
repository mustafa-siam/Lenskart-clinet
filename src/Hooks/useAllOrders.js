import useAxiosSecure from './useAxiossecure';
import { useQuery } from '@tanstack/react-query';
const useAllOrders = () => {
   const axiosSecure=useAxiosSecure();
    const {data:allOrders=[],refetch}=useQuery({
        queryKey:["orderHistory"],
        queryFn:async()=>{
            const res=await axiosSecure.get(`orderhistory`)
            return res.data;
        }
    })
    return [allOrders,refetch]
};

export default useAllOrders;