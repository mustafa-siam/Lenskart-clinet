import axios from 'axios';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import React, { useContext, useEffect } from 'react';
 const axiosinstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});
const useAxiossecure = () => {
   useEffect(()=>{
    const interceptor=axiosinstance.interceptors.response.use(
      (response)=>response,
      async(err)=>{
         if (err.response?.status === 401 || err.response?.status === 403) {
          console.error("Session expired. Please log in again.");
          await signOut(auth);
          document.getElementById("automodal")?.showModal();
      }
      return Promise.reject(err);
    }
    )
     return () => axiosinstance.interceptors.response.eject(interceptor);
   },[])
    return axiosinstance;
};

export default useAxiossecure;