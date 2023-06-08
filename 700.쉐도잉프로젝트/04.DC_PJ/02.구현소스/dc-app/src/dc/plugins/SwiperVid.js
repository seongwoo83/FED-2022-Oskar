// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipervid.css";
import swipervid_data from "../data/swipervid";

export default function SwiperVId() {

    let sdt = swipervid_data;
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    sdt.map((x,i)=>{
                        return (
                            <SwiperSlide key={i}>
                                <img src={x.isrc} alt="cardboard" />
                                <p style={{visibility:"hidden", display:"none"}}>{x.vsrc}</p>
                                <h4>{x.cat}</h4>
                                <h2>{x.tit}</h2>
                            </SwiperSlide>
                        )
                    })
                }
                
            </Swiper>
        </>
    );
} 