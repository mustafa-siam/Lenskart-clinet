import axios from 'axios';
import React from 'react';
const axiosinstance=axios.create({
 baseURL: "http://localhost:5000/",
})
const usePubliceAxios = () => {
    return axiosinstance
};

export default usePubliceAxios;