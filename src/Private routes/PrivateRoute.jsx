import React, { useContext, useEffect } from 'react';
import { authcontext } from '../Providers/Authprovider';

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(authcontext);

  useEffect(() => {
    if (!user && !loader) {
      document.getElementById('automodal')?.showModal();
    }
  }, [user, loader]);

  if (loader) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    return null; // Wait until user logs in
  }

  return children;
};

export default PrivateRoute;
