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

        // 신상 기능함수 호출
        sinsangFn();
    },
});

Vue.component("foot-comp", {
    template: comData.barea,
});

new Vue({
    el: "#info",
});

function makeSwiper() {
    // Swiper 플러그인 인스턴스 생성
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, //페이지 넘기거나 클릭한 후 활성화 X
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

// 신상품 기능구현 함수
function sinsangFn() {
    /****************************************************
        함수명: moveList
        기능: 신상품 리스트 박스를 연속하여 왼쪽방향으로 흘러가도록 함
     ****************************************************/
    // 대상: .flist
    const flist = $(".flist");
    // 위치값 변수
    let lpos = 0;
    // 재귀호출 상태값 변수 -> 1이면 호출가능 0이면 호출불가
    let call_sts = 1;

    function moveList() {
        // 1. 이동위치값 감소하기
        lpos--;
        // 2. 한계값 초기화하기
        if (lpos < -300) {
            // 위치값 초기화
            lpos = 0;
            // 첫번쨰 li맨뒤로 이동
            flist.append(flist.find("li").first());
        }
        // 3. 이동하기
        flist.css({
            left: lpos + "px",
        });
        //재귀호출하기(비동기함수- setTimeout)
        if(call_sts) setTimeout(moveList, 30);
    }

    // 신상품 이동함수 최초호출
    moveList();

    // 신상품 리스트에 마우스 오버시 멈춤
    // 신싱품 리스트에 마우스 아웃시 이동
    // hover(함수1, 함수2)
    flist.hover(
        function(){ // over
            call_sts = 0; //콜백 중단
        },
        function(){ // out
            call_sts = 1; // 콜백 재개
            moveList(); // 함수재호출
        }
    )
}
