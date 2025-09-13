import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
// import required modules
import { EffectCreative, Pagination  } from 'swiper/modules';

const Review = () => {
  return (
    <div className='p-3'>
      <div className='text-center space-y-4'>
        <h1 className='text-[#05264e] md:text-4xl text-3xl font-bold'>Clients About Us</h1>
        <p className='md:text-xl text-base text-gray-600'>
          We are dedicated to serving our clients with quality, trust, and care, ensuring every experience <br /> is smooth, satisfying, and worth remembering.
        </p>
      </div>

      <div className='relative max-w-4xl mx-auto overflow-hidden'>
        <Swiper
          grabCursor={true}
          pagination={{
  clickable: true,
}}
          loop={true}
          spaceBetween={30}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500], // push previous slide far away
            },
            next: {
              translate: ['120%', 0, -500], // push next slide far away
            },
          }}
          modules={[EffectCreative, Pagination ]}
          className="mySwiper3 flex justify-center items-center shadow-2xl text-lg my-12"
        >
          <SwiperSlide>
            <div className='shadow-xl py-12 hover:border-b-4 hover:border-red-500 rounded-2xl '>
              <p className='py-6 md:px-14 text-center'>
                “Absolutely delicious! Every bite was bursting with flavor, and the freshness of the ingredients really stood out. It is rare to find food that tastes this good and arrives so quickly. I’ll definitely be ordering again soon and recommending it to friends!”
              </p>
              <div className='flex justify-center items-center gap-6'>
                <div className="avatar">
                  <div className="mask mask-squircle w-20">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_66B76gd3pb8kXKdB3nCSvCgwfl_2ssQ7w&s" alt="client" />
                  </div>
                </div>
                <div>
                  <h1 className='text-lg font-bold'>Mr Mustafa</h1>
                  <p className='text-base text-[#848484]'>CEO, PSDBOSS</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='shadow-xl py-12 hover:border-b-4 hover:border-red-500 rounded-2xl'>
              <p className='py-6 md:px-14 text-center'>
                “The food was not only tasty but beautifully presented. Each dish felt like a restaurant-quality experience brought right to my home. You can tell a lot of care and passion went into the preparation, and that makes all the difference.”
              </p>
              <div className='flex justify-center items-center gap-6'>
                <div className="avatar">
                  <div className="mask mask-squircle w-20">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4fB6GS1xh8utM5Lz7_zQiEIBMyrAgCrYd9Q&s" alt="client" />
                  </div>
                </div>
                <div>
                  <h1 className='text-lg font-bold'>Mr Kamal</h1>
                  <p className='text-base text-[#848484]'>Government Job</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='shadow-xl py-12 hover:border-b-4 hover:border-red-500 rounded-2xl'>
              <p className='py-6 md:px-14 text-center'>
                “From the first bite to the last, everything was perfect. The portion sizes were generous, the flavors were rich and satisfying, and the delivery was on time. This is exactly the kind of quality and service that keeps me coming back.”
              </p>
              <div className='flex justify-center items-center gap-6'>
                <div className="avatar">
                  <div className="mask mask-squircle w-20">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQh3YOIlleORkuDExHTEhMtIGOoiISBIo-XQ&s" alt="client" />
                  </div>
                </div>
                <div>
                  <h1 className='text-lg font-bold'>Mr siam</h1>
                  <p className='text-base text-[#848484]'>CEO, PSDBOSS</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
