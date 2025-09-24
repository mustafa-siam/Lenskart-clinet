import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const Categoryslider = ({ heading, data }) => {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 40 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, partialVisibilityGutter: 30 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1, partialVisibilityGutter: 30 },
    };
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-400">
                <p className="font-bold text-lg">{heading}</p>
                <Link to={`/shop?category=${heading.toLowerCase()}`} className="text-[#329c92] font-medium cursor-pointer">
                    View Range
                </Link>
            </div>

            <Carousel
                responsive={responsive}
                arrows
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                draggable
                swipeable
                slidesToSlide={1}
            >
                {data.map((img, index) => (
                    <div key={index} className="p-2">
                        <img
                            src={img}
                            alt={`${heading} ${index}`}
                            className="rounded-lg w-full object-cover"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Categoryslider;