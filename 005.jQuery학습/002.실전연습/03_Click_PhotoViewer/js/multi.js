// 무한이동 드래그&클릭형&멀티 배너 JS - multi.js

import MySlider from "./myslider.js";

const slideBx = $(".slider");

slideBx.each((idx, ele)=>{
    MySlider(ele)
})