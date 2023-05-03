// 카테고리 서브페이지 JS - sub.js

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";
/* 신상품 정보 */
import sinsang from "./gdsData/sinsang.js";

// ########## 상단영역 메뉴 Vue  템플릿 세팅하기 #######

// Vue.component(내가지은요소명,{옵션})
Vue.component("top-comp", {
    template: comData.tareaSub,
}); /////////////// 상단 영역 Vue component ///////////////

// ############ 상단영역 뷰 인스턴스 생성하기 #############//
// new Vue({옵션})
new Vue({
    el: "#top",
    data: {}, //_______________________
    // created 실행구역 : DOM연결전
    created: function () {
        // DOM연결 전 데이터 가공 작업
        console.log("created구역");
    }, //______________________________
    // mounted 실행구역: DOM연결 후
    mounted: function () {
        //제이쿼리 코드 함수 호출!
        console.log("mounted구역");
        // 메뉴함수 호출
        menuFn();

        // 스와이퍼 생성함수 호출
        makeSwiper();

        // 부드러운 스크롤
        startSS();
    },
});

Vue.component("foot-comp",{
    template:comData.barea
})

new Vue({
    el:"#info"
})

function makeSwiper(){
    // Swiper 플러그인 인스턴스 생성
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,  //페이지 넘기거나 클릭한 후 활성화 X
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true, //불릿 클릭이동 여부
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}


/******************************

******************************/