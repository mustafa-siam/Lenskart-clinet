import { Navigate, useLocation } from 'react-router-dom';
import { authcontext } from '../Providers/Authprovider';
import React, { useContext } from 'react';

const PrivateRoute = ({children}) => {
    const {user,loader}=useContext(authcontext)
    const location =useLocation()
    if(loader){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
       return <Navigate state={{from:location.pathname}} to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;