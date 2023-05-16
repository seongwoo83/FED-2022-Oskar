// 카테고리 서브페이지 JS - sub.js

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";
// 서브 데이터 가져오기
import subData from "./tempData/data-sub.js";
/* 신상품 정보 */
import sinsang from "./gdsData/sinsang.js";
// 뷰엑스 스토어 JS 가져오기
// 중요! 반드시 중심 JS 한군데에서 불러와서 사용해야 상태 관리됨
// -> 이 JS파일에 Vue 인스턴스 생성코드가 같이 있어야한다.
import store from "./store.js";

// 스와이퍼 변수
let swiper;

// 바로실행구역
// 사용하는 이유 -> 변수나 명령어를 다른 영역과 구붆여 코딩할 때 사용
// GET방식 데이터를 store에서 초기값으로 세팅하는 것을 인스턴스 생성전에 해야 에러를 막을 수 있다.
(()=>{
    let pm;
    // GET방식으로 넘어온 데이터 처리하여 분류별 서브페이지 구성하기
    // location.href -> 상단 url 읽어오기
    if (location.href.indexOf("?") !== -1) {
        pm = location.href.split("?")[1].split("=")[1];
        // pm에 값이 할당이 되어있다면 undefined가 아니므로 true
        if (pm) {
            store.commit("chgData", decodeURI(pm));
            // decodeURI() -> 변경할 문자열만 있어야 디코딩됨
            // decodeURIComponent() -> url전체에 섞여있어도 모두 디코딩
        } else {
            store.commit("chgData", "남성");
        }
    }
})()
// 파라미터 변수

// ########## 서브영역 메뉴 Vue  템플릿 세팅하기 #######

// 1. 배너파트 컴포넌트
// Vue.component(내가지은요소명,{옵션})
Vue.component("ban-comp", {
    template: subData.banner,
}); /////////////// 서브 영역 Vue component ///////////////

// 2. 컨텐츠1 영역 컴포넌트
// Vue.component(내가지은요소명,{옵션})
Vue.component("cont1-comp", {
    template: subData.cont1,
}); /////////////// 서브 영역 Vue component ///////////////
// 2. 컨텐츠2 영역 컴포넌트
// Vue.component(내가지은요소명,{옵션})
Vue.component("cont2-comp", {
    template: subData.cont2,
}); /////////////// 서브 영역 Vue component ///////////////
// Vue.component(내가지은요소명,{옵션})
Vue.component("cont3-comp", {
    template: subData.cont3,
}); /////////////// 서브 영역 Vue component ///////////////
// Vue.component(내가지은요소명,{옵션})
Vue.component("cont4-comp", {
    template: subData.cont4,
}); /////////////// 서브 영역 Vue component ///////////////
// ########## 서브영역 메뉴 Vue  인스턴스 생성하기 #######

new Vue({
    el: "#cont",
    store, //뷰엑스 스토어 등록 필수!
}); /////////////// 서브 영역 Vue instance ///////////////

// ########## 상단영역 메뉴 Vue  인스턴스 생성하기 #######
// Vue.component(내가지은요소명,{옵션})
Vue.component("top-comp", {
    template: comData.tareaSub,
}); /////////////// 상단 영역 Vue component ///////////////

// ############ 상단영역 뷰 인스턴스 생성하기 #############//
// new Vue({옵션})
new Vue({
    el: "#top",
    store, // 뷰엑스 스토어 등록 필수
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

        // 패럴렉스 적용함수 호출
        setParallax(".c2", 0.4);

        // 스크롤리빌 플러그인 함수 호출
        $.fn.scrollReveal();

        // 메뉴 클릭시 전체메뉴창 닫기
        $(".mlist a").on("click", function (e) {
            e.preventDefault();
            // 1. 전체 메뉴창 닫기
            $(".ham").trigger("click");
            // 2. 부드러운 스크롤 위치값 업데이트
            sc_pos = 0;
            $("html,body").animate({
                scrollTop:  "0"
            },1)
            //  $(선택요소).trigger(이벤트명)
            //  -> 선택요소의 이벤트 강제실행시킴
            //  참고) JS 클릭이벤트 강제실행
            //  document.querySelector(선택요소).click();

            // 3. swiper 첫번재 슬라이드로 이동
            swiper.slideTo(0);
            // 4. 등장액션 스크롤 리빌 다시 호출
            $.fn.scrollReveal();

            // 5. url 강제 변경하기-> 변경이유: SPA변경시 전달변수 내용 일치
            // 새로고침시 현재 변경 로딩 되어야함
            history.pushState(null,null,"sub.html?cat=" + store.state.name);
            /***************************************************** 
            [ history.pushState() 메서드 ]

            1. 브라우저 세션 기록 스택항목 추가메서드
            2. 비동기식으로 작동함(주소이동없이 주소만 업데이트됨!)
            3. 전달값 :
                history.pushState(상태,사용안됨,URL)

                (1) 상태 : 새로운 페이지 이동시 popstate가 됨
                (2) 사용안됨 : 전부터 사용되던 전달값.지금사용안됨
                    보통 (1),(2)는 null로 셋팅함
                (3) URL : 이 주소는 현재 페이지가 포함된
                    주소 카테고리(폴더)를 기준으로 작성됨

            4. 사용기본폼 : 
                history.pushState(null,null,"my.html?hi=bye") 
            *****************************************************/


        });

        // gnb메뉴 클릭시 해당위치로 스크롤 이동 애니메이션
        // 각 .gnb a에는 href="#c1"으로  id속성이 적혀있음
        // a요소의 id명으로 기본위치이동은 되지만 스크롤 애니메이션은 안됨
        // 이것을 jquery로 만듦
        $(".gnb a").on("click", function (e) {
            e.preventDefault();

            // 클릭된 a요소의 href값 읽어오기
            let aid = $(this).attr("href");

            // id요소박스 위치값 구하기
            let newpos = $(aid).offset().top;
            // console.log('newpos: ', newpos);

            // 이동하기
            $("html, body").animate(
                {
                    scrollTop: newpos + "px",
                },
                600,
                "easeOutQuint"
            );

            // 부드러운 스크롤 변수에 현재위치값 업데이트
            sc_pos = newpos;
        });

        // 로고  클릭시 첫페이지 이동
        $("#logo").on("click", function () {
            location.href = "./index.html";
        });
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
    swiper = new Swiper(".mySwiper", {
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
    // 스크롤시 상태값변수(1-호출가능/0-호출불가)
    let sc_sts = 0;
    // 재귀호출 타임아웃용변수
    let callT;

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
        // 타임아웃비우기
        clearTimeout(callT);

        // 재귀호출하기(비동기호출-setTimeout)
        // 조건: call_sts 상태값이 1일때만 호출함!
        if (call_sts) callT = setTimeout(moveList, 40);
    }

    // 신상품 이동함수 최초호출
    moveList();

    // 신상품 리스트에 마우스 오버시 멈춤
    // 신싱품 리스트에 마우스 아웃시 이동
    // hover(함수1, 함수2)
    flist.hover(
        function () {
            // over
            call_sts = 0; //콜백 중단
        },
        function () {
            // out
            call_sts = 1; // 콜백 재개
            moveList(); // 함수재호출
        }
    );

    /*************************************************
        신상품 리스트 li에 마우스 오버시 정보보이기
        1. 대상: .flist li
        2. 정보구분법: li의 클래스명으로 신상품 정보와 
                            매칭하여 상품정보박스를 동적으로
                            생성하여 애니메이션을 주어 보이게 함
    *************************************************/

    flist
        .find("li")
        .on("mouseenter", function () {
            //hover
            // 1. 클래스 정보 알아내기
            let clsnm = $(this).attr("class");
            // 중간 객체속성명 상위부모박스 #c1의 data-cat속성값 읽어오기
            let catnm = $(this).parents("#c1").attr("data-cat");
            // 2. 클래스 이름으로 세팅된 신상정보 객체 데이터 가져오기
            let gd_info = sinsang[catnm][clsnm];
            console.log(clsnm, catnm, gd_info);
            // 3. 상품 정보박스 만들고 보이게 하기
            // 마우스 오버된 li자신 $(this)에 넣어준다
            $(this).append(`<div class="ibox"></div>`);
            // .ibox에 상품정보 넣기
            // ^는 특수문자이므로 정규식에 넣을때 역슬래쉬와 함께 씀
            //  -> \^
            // $(".ibox").html(gd_info.replaceAll("^","<br>")).fadeTo(200,1)
            $(".ibox").html(gd_info.replace(/\^/g, "<br>")).animate(
                {
                    top: "110%",
                    opacity: 1,
                },
                300,
                "easeOutCirc"
            );
        })
        .on("mouseleave", function () {
            //out
            // ibox나갈때 지우기
            $(".ibox").remove();
        });

    /******************************************
        스크롤 위치가 신상품 박스가 보일때만 움직이기
    ******************************************/
    // JS의 getBoundingClientRect()의 값과 같은것은?
    // 적용박스 offset().top위치값 - scroll바 위치값
    let scTop = 0;
    let tgpos = flist.offset().top;
    // 화면 높이값
    let winH = $(window).height();
    // console.log('winH: ', winH);
    // 스크롤 이벤트함수
    $(window).on("scroll", function () {
        // 1. 스크롤 위치값
        scTop = $(this).scrollTop();
        // 2. gBCR값 구하기
        let gBCR = tgpos - scTop;
        // console.log('gBCR: ', gBCR);

        // 3. 신상품 리스트 이동/멈춤 분기하기
        // 이동기준 gBCR값이 화면 높이보다 작고 0보다 클때 이동
        if (gBCR < winH && gBCR > -300 && sc_sts === 0) {
            sc_sts = 1;
            call_sts = 1; // 콜백 재개 (한번만 실행)
            moveList(); // 함수재호출
        } else if ((gBCR > winH || gBCR < -300) && sc_sts === 1) {
            sc_sts = 0;
            // 기타 경우 멈춤(조건: 윈도우 높이보다 크거나 0보다 작고 call_sts가 1일때)
            call_sts = 0; //콜백 중단
        }

        ////////////////////////////
        // 서브 배너 스와이퍼 API를 //
        // 이용한 작동멈춤셋팅하기! //
        ////////////////////////////
        // 기준: 화면높이값 보다
        //      스크롤위치가 크면 멈춤
        // 스와이퍼API : swiper.autoplay.stop()
        //      스크롤위치가 작으면 자동넘김
        // 스와이퍼API : swiper.autoplay.start()
        if (scTop > winH) {
            swiper.autoplay.stop();
        } /////////// if ////////
        else {
            swiper.autoplay.start();
        } //////// else ///////////
    });
}

function setParallax(ele, speed) {
    // 대상: .c2
    $(ele).parallax("100%", speed);
    // parallax(배경위치,속도)
} ///////////// setParallax 함수 ///////////
