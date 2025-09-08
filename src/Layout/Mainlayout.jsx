import React from 'react';
import NavBar from '../Shared components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared components/Footer/Footer';

const Mainlayout = () => {
    return (
        <div className='space-y-12'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;