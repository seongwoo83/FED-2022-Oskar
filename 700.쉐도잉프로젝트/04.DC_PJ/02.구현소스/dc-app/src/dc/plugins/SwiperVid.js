// Import Swiper React components
import  {React, useRef, useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipervid.css";
import swipervid_data from "../data/swipervid";
import $ from 'jquery';

export default function SwiperVId() {

    let sdt = swipervid_data;


    // 하나당 슬라이드 수  : Hook변수
    // const [변수, set변수] = useState(초기값)
    const [perSld, setPerSld] = useState(4)
    // 값의 사용은 Hook 변수를 쓰고
    // 값의 변경은 set변수(값) 형식으로 사용함

    // 이벤트 함수
    const evtFn = ()=>{
        $(()=>{

            // 화면크기별 슬라이드 수 변경함수
            const chgSwp = ()=>{
                // 윈도우 너비 체크
                let nowW = $(window).width();
                // 화면 사이즈별 슬라이드 수 변경하기
                if(nowW <= 1000 && nowW > 700) setPerSld(3);
                else if(nowW <= 700) setPerSld(2);
                else setPerSld(4);
            };


            $(window).on("resize", chgSwp);
            chgSwp();
        })
    }

    return (
        <>
            <Swiper
                // slidesPerView={4}
                spaceBetween={10}
                navigation
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    700:{slidesPerView:2},
                    1000:{slidesPerView:3},
                    1300:{slidesPerView:4}
                }}
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
            {/* {evtFn()} */}
        </>
    );
} 