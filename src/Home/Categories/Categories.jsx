import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <div className='max-w-6xl mx-auto space-y-12'>
            <div>
<h1 className='text-4xl text-center font-bold'>FIND THE PERFECT FIT</h1>
            </div>
<div className='flex items-center gap-6 '>
            <div>
                <div className='pb-4'>
                    <Link to={`/shop?category=eyeglasses`}>
                    <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/eye-square10.jpg" alt="" />
                    </Link>
                    
                </div>
                <div>
                     <Link to={`/shop?category=powerglass`}>
                      <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/power-sun-square.jpg" alt="" />
                     </Link>
                   
                </div>
            </div>
            <div>
                <div className='pb-4'>
                    <Link to={`/shop?category=sunglasses`}>
                     <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg" alt="" />
                    </Link>
                   
                </div>
                <div>
                    <Link to={`/shop?category=kidsglass`}>
                     <img src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner03_TileDesktop.jpg" alt="" />
                    </Link>                  
                </div>
            </div>
        </div>
        </div>       
    );
};

export default Categories;