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
    let call_sts = 0;

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

    
    /*************************************************
        신상품 리스트 li에 마우스 오버시 정보보이기
        1. 대상: .flist li
        2. 정보구분법: li의 클래스명으로 신상품 정보와 
                            매칭하여 상품정보박스를 동적으로
                            생성하여 애니메이션을 주어 보이게 함
    *************************************************/
    
    flist.find("li")
    .on("mouseenter",function(){ //hover
        // 1. 클래스 정보 알아내기
        let clsnm = $(this).attr("class");
        // 2. 클래스 이름으로 세팅된 신상정보 객체 데이터 가져오기
        let gd_info = sinsang[clsnm];
        console.log(clsnm, gd_info);
        // 3. 상품 정보박스 만들고 보이게 하기
        // 마우스 오버된 li자신 $(this)에 넣어준다
        $(this).append(`<div class="ibox"></div>`);
        // .ibox에 상품정보 넣기
        // ^는 특수문자이므로 정규식에 넣을때 역슬래쉬와 함께 씀
        //  -> \^
        // $(".ibox").html(gd_info.replaceAll("^","<br>")).fadeTo(200,1)
        $(".ibox").html(gd_info.replace(/\^/g,"<br>")).animate({
            top:"110%",
            opacity:1
        }, 300, "easeOutCirc")
    })
    .on("mouseleave",function(){ //out  
        // ibox나갈때 지우기
        $(".ibox").remove();
    })

    /******************************************
        스크롤 위치가 신상품 박스가 보일때만 움직이기
    ******************************************/
    // JS의 getBoundingClientRect()의 값과 같은것은?
    // 적용박스 offset().top위치값 - scroll바 위치값
    let scTop = 0;
    let tgpos = flist.offset().top;
    // 화면 높이값
    let winH = $(window).height();
    // 스크롤 이벤트함수
    $(window).on("scroll",function(){
        // 1. 스크롤 위치값
        scTop = $(this).scrollTop();
        // 2. gBCR값 구하기
        let gBCR = tgpos - scTop;
        console.log('gBCR: ', gBCR);

        // 3. 신상품 리스트 이동/멈춤 분기하기
        // 이동기준 gBCR값이 화면 높이보다 작고 0보다 클때 이동
        if(gBCR < winH && gBCR > 0 && call_sts===0){
            call_sts = 1; // 콜백 재개 (한번만 실행)
            moveList(); // 함수재호출
        }else{ // 그 외의 경우 멈춤
            call_sts = 0; //콜백 중단
        }


    })
}
