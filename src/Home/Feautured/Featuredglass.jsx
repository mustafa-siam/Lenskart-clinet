import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const Featuredglass = () => {
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
          <SwiperSlide>
            <div className="bg-base-100 shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://static1.lenskart.com/media/desktop/img/Sep21/image179.png"
                  alt="Round"
                  className="rounded-xl"
                />
              </figure>
              <div className="flex justify-center flex-col gap-7 items-center text-center">
                <h2 className="card-title">Round</h2>
                <div className="card-actions">
                  <button className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-base-100 shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"
                  alt="Clubmaster"
                  className="rounded-xl"
                />
              </figure>
              <div className="flex justify-center flex-col gap-7 items-center text-center">
                <h2 className="card-title">Clubmaster</h2>
                <div className="card-actions">
                  <button className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-base-100 shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"
                  alt="Transparent"
                  className="rounded-xl"
                />
              </figure>
              <div className="flex justify-center flex-col gap-7 items-center text-center">
                <h2 className="card-title">Transparent</h2>
                <div className="card-actions">
                  <button className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-base-100 shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg"
                  alt="Air Flex"
                  className="rounded-xl"
                />
              </figure>
              <div className="flex justify-center flex-col gap-7 items-center text-center">
                <h2 className="card-title">Air Flex</h2>
                <div className="card-actions">
                  <button className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-base-100 shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg"
                  alt="Blend Edit"
                  className="rounded-xl"
                />
              </figure>
              <div className="flex justify-center flex-col gap-7 items-center text-center">
                <h2 className="card-title">Blend Edit</h2>
                <div className="card-actions">
                  <button className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-base-100 shadow-md">
              <figure className="px-10 pt-10">
                <img
                  src="https://static1.lenskart.com/media/desktop/img/Sep21/aviator.jpg"
                  alt="Retro Aviator"
                  className="rounded-xl"
                />
              </figure>
              <div className="flex justify-center flex-col gap-7 items-center text-center">
                <h2 className="card-title">Retro Aviator</h2>
                <div className="card-actions">
                  <button className="btn bg-[#56b7c3] text-white text-base px-10 mb-4">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Featuredglass;
