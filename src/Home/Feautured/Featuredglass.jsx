// Featuredglass.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Featuredglass = () => {
    const shapes = [
        { name: 'Round', src: 'https://static1.lenskart.com/media/desktop/img/Sep21/image179.png' },
        { name: 'Rectangle', src: 'https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg' },
        { name: 'Square', src: 'https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg' },
        { name: 'Cat-Eye', src: 'https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg' },
        { name: 'Geometric', src: 'https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg' },
        { name: 'Retro Aviator', src: 'https://static1.lenskart.com/media/desktop/img/Sep21/aviator.jpg' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold">WEAR THE TREND</h1>
                <p className="text-base pt-2">Our hottest collections</p>
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper !pb-10"
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        464: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {shapes.map((shape) => (
                        <SwiperSlide key={shape.name}>
                            <div className="bg-base-100 shadow-md">
                                <figure className="px-10 pt-10">
                                    <img src={shape.src} alt={shape.name} className="rounded-xl" />
                                </figure>
                                <div className="flex justify-center flex-col gap-7 items-center text-center">
                                    <h2 className="card-title">{shape.name}</h2>
                                    <div className="card-actions">
                            
                                          <Link to={`/shop?shape=${shape.name}`}  className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">Explore</Link>
                                            
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Featuredglass;