import axios from 'axios';
import React from 'react';
 const axiosinstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});
const useAxiossecure = () => {
   
    return axiosinstance;
};

export default useAxiossecure;