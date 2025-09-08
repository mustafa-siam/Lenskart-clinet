import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    const images=[
        "https://static1.lenskart.com/media/desktop/img/Lenskart/Tilak-Verma/Home/Desktop-Banner.png",
        "https://static5.lenskart.com/media/uploads/NEW_AT_LK-Shapes-jj-in-14july.png",
        "https://static5.lenskart.com/media/uploads/NEW_AT_LK-Shapes-27772-desktop-banner.png",
        "https://static5.lenskart.com/media/uploads/NEW_AT_LK-Shapes_27032025rat.png",
        "https://static5.lenskart.com/media/uploads/NEW_AT_LK-Shapes_04062025_rat.png",
        "https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-breaktheframe.png"
    ]
    return (
       <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper !pb-10"
      >
        {
            images.map((img,idx)=><SwiperSlide key={idx}>
                <img src={img} alt="" />
            </SwiperSlide>)
        }
      </Swiper>
    </>
    );
};

export default Banner;