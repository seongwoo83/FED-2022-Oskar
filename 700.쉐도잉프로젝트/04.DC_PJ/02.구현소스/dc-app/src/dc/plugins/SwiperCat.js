/* eslint-disable */
// Import Swiper React components
import  {React, useRef, useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipervid.css";
// import swipervid_data from "../data/swipervid";
import $ from 'jquery';
import cat_data from '../data/cat';
import { Link } from 'react-router-dom';

export default function SwiperVId() {

    let sdt = cat_data;


    // 하나당 슬라이드 수  : Hook변수
    // const [변수, set변수] = useState(초기값)
    const [perSld, setPerSld] = useState(4)
    // 값의 사용은 Hook 변수를 쓰고
    // 값의 변경은 set변수(값) 형식으로 사용함

    return (
        <>
            <Swiper
                // slidesPerView={4}
                spaceBetween={10}
                navigation
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    700:{slidesPerView:3},
                    1000:{slidesPerView:5},
                    1300:{slidesPerView:7}
                }}
            >
                {
                    sdt.map((x,i)=>{
                        return (
                            <SwiperSlide key={i}>
                                {/* /det 라우터 컴포넌트 페이지 호출시 state속성값으로 객체를 보내어 값을 전달함
                                도착 페이지인 Detail.js 컴포넌트에 페이지 나타내야할데데이터항목을 데이터 속성명과 같은 이름으로 세팅하여 라우터 전달 state객체에 담아서 보낸다
                                cname 캐릭터 이름 전달 속성명 값은 x.name을 보내준다 
                                cdesc 는 캐릭터 설명
                                facts 는 캐릭터 명세를 담아 보내줌*/}
                                <Link to="/det" 
                                state={{
                                    cname:x.cname,
                                    cdesc:x.cdesc,
                                    facts:x.facts
                                    }}>
                                    <section className='swinbx'>
                                        <div className='catimg'>
                                            <img src={x.tmsrc} alt={x.cname} />
                                        </div>
                                        <div className="cattit">
                                            <h3>{x.cname}</h3>
                                        </div>
                                    </section>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
                
            </Swiper>
        </>
    );
} 