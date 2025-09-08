import React from 'react';
import Banner from '../Home/Banner/Banner';
import Featuredglass from '../Home/Feautured/Featuredglass';
import Premium from '../Home/premiumsec/Premium';
import Categories from '../Home/categories/Categories';
import Brands from '../Home/Brands/Brands';
import Eyeglasses from '../Home/Eyeglasses/Eyeglasses';

const Home = () => {
    return (
        <div className='space-y-12'>
            <Banner></Banner>
            <Featuredglass></Featuredglass>
            <Premium></Premium>
            <Categories></Categories>
            <Brands></Brands>
            <Eyeglasses></Eyeglasses>
        </div>
    );
};

export default Home;