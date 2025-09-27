import { useQuery } from '@tanstack/react-query';
import useAxiossecure from './useAxiossecure';
import { useContext } from 'react';
import { authcontext } from '../Providers/Authprovider';
const Usefavcart = () => {
  const axiosSecure = useAxiossecure();
const { user } = useContext(authcontext);
  const { data: favcarts = [], refetch } = useQuery({
    queryKey: ['favcarts', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    }
  });

  return [favcarts, refetch];
};

export default Usefavcart;
