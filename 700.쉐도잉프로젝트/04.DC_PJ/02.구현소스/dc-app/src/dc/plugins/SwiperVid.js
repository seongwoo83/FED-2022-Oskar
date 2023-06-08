import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./swipervid.css";

// import required modules

export default function SwiperVId(props) {

    const data = [];


    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation
                loop={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>Slide 1</SwiperSlide>
            </Swiper>
        </>
    );
} 