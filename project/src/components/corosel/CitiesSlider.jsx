import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const images = ["/image_1.jpg", "/image_2.jpg", "https://s1.1zoom.me/b5456/364/Fast_food_French_fries_Beer_Hamburger_Highball_524931_1920x1080.jpg", "/image_4.jpg", "/image_5.jpg", "/image_6.jpg", "/image_7.jpg", "/image_8.jpg"];
const CitiesSlider = ({ updateQuote }) => {
  return (
    <div className="slider-container">
      <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={10} slidesPerView={1} navigation  pagination={{ clickable: true }} autoplay={{ delay: 3000, disableOnInteraction: false }} loop={true} onSlideChange={updateQuote}>
        {images.map((img, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default CitiesSlider;
