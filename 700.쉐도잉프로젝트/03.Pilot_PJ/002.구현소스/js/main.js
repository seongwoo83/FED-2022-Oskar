// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

/****************************************
    - 메인페이지 주요기능

    1. 자동 스크롤 기능 구현
    + 페이지 도착후 등장액션 구현

    2. 햄버거 버튼 전체메뉴 보이기/숨기기
    + 전체메뉴 배경 동영상 보일 때만 재생 
    
    3. 배너 터치기능 넘기기(제이쿼리 UI이용)
        - 배너별 타이틀 등장하기
        - 양쪽 이동버튼 플러그인 적용하기


****************************************/

// 메인페이지
// 메뉴바 버튼 클릭시 전체메뉴 보이기
$(".ham").on("click", function () {
    // 메뉴바 버튼 클래스 변경
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);

    // 햄버거 버튼에 클래스 on 이 있으면 재생/ 없으면 정지
    console.log($(this).is(".on"));
    // 메뉴 배경 동영상 재생
    if (isOn) {
        $(".bgm").get(0).play();
    } else {
        $("bgm").get(0, gses);
    }
});

/*********************************
    드래그 기능 구현
    1. 원리 : 제이쿼리 UI 를 이용하여 x축으로만 드래그가 되도록 설정후
    위치값을 체크하여 드래그가 끝난 시점에 자동위치이동 애니메이션 처리해준다

    2. 대상: .slide

    3. 기준
        -1) 왼쪽방향이동 : 기준값 (- 100%) 보다 -10% 작은경우 (-110%)
        -2) 오른쪽방향이동 : 기준갑(-100%)보다 10% 큰경우 (-90%)
        -3) 제자리이동: 양쪽 기준값 사이일 때 (-110%~90%)

    4. 구현시 주의사항
        -> %단위는 모두 px단위로 변환하여 구현한다
        -> 배너 크기가 윈도우 가로크기와 같다

*********************************/

//  1.대상 선정
const slide = $(".slide");

// 2. 드래그 설정
slide.draggable({
    axis: "x", // x축을 기준으로 움직임
});

// 3. 드래그가 끝난 후 -> dragstop 이벤트 발생 후
// 기준위치 체크후 이동 애니메이션

// 윈도우 크기 리턴함수
const reWin = () => $(window).width();

// 리사이즈 업데이트
$(window).on("resize", function () {
    winW = reWin();
    // console.log("winW", winW);
});

// 윈도우 가로크기 - left 기준위치 px변환
let winW = reWin();
// console.log("winW * 0.9: ", winW * 0.9);
// console.log("winW: ", winW);
// console.log("winW * 1.1: ", winW * 1.1);

// 광드래그 방지위해 커버세팅 (show(), hide())
const cover = $(".cover");

// ⁡⁢⁣⁣드래그 끝난 후 이벤트 함수 만들기⁡
slide.on("dragstop", function () {
    // 광드래그 방지 커버
    cover.show();
    // slide left위치값
    let sleft = $(this).offset().left;
    // console.log(sleft);

    // 1. 왼쪽으로 이동 : -110% 미만일때
    if (sleft < -winW * 1.1) {
        // 배너이동함수 호출
        goSlide(0);
    }
    // 2. 오른쪽으로 이동 : -90% 초과일때
    else if (sleft > -winW * 0.9) {
        // 배너이동함수 호출
        goSlide(1);
    }
    // 3. 제자리로 이동 : -110% ~ -90%
    else {
        slide.animate(
            {
                left: -winW + "px",
            },
            600,
            "easeOutQuint",
            () => {
                cover.hide();
            }
        );
    }
});

/***************************************
    함수명: goSlide
    기능: 왼쪽 오른쪽 배너 이동하기
    구분: 0은 왼쪽, 1은 오른쪽 (dir parameter)
***************************************/
function goSlide(dir){
    console.log("방향", dir);
    // 분기하기
    if(dir){// 오른쪽 이동
        slide.animate(
            {
                left: "0px",
            },
            600,
            "easeOutQuint",
            () => {
                // 이동후 맨앞 li 맨뒤로 이동
                slide.prepend(slide.find("li").last()).css({ left: "-100%" });
                cover.hide();

                // 배너 타이틀 함수
                showTit();
            }
        );
        // 불릿 변경함수 호출
        addOn(0);
        // 왼쪽에서 오른쪽 이동이므로 0번째 슬라이드
    }else{// 왼쪽 이동
        slide.animate(
            {
                left: -winW * 2 + "px",
            },
            600,
            "easeOutQuint",
            () => {
                // 이동후 맨앞 li 맨뒤로 이동
                slide.append(slide.find("li").first()).css({ left: "-100%" });
                cover.hide();

                // 배너 타이틀 함수
                showTit();
            }
        );
        // 불릿 변경함수 호출
        addOn(2);
        // 오른쪽에서 왼쪽으로 이동이므로 2번째 슬라이드
    }
    
}

/*****************************************
    [ 터치 배너 이동시 불릿 변경하기 ]
    - 방법: 잘라서 이동되는 li에 고유한 순번을 
        사용자 정의 속성으로 처음에 부여하고, 슬라이드
        이동하면 속성값을 읽어서 불릿 순번에 반영함
*****************************************/
// 사용자 정의 속성으로 순번 부여대상: .slide li
// 제이쿼리 : for문 순회 메서드 each(순번, 요소)
// 배너  li
const blist = slide.find("li");
// 배너 갯수
const bcnt = blist.length;

blist.each((idx, ele) => {
    // 처음것을 마지막 순번으로 넣기
    if (idx === 0) {
        $(ele).attr("data-seq", bcnt - 1);
    } else {
        $(ele).attr("data-seq", idx - 1);
    }
});

// 불릿 on넣기 함수
// 1. 왼쪽에서 오른쪽으로 슬라이드
//  - 0번째 슬라이드의 data-seq값
// 2. 오른쪽에서 왼쪽으로 슬라이드
//  - 2번째 슬라이드의 data-seq값
// 위의 선택값으로 불릿의 li 순번에 on클래스 부여하고 나머지 불릿은 on클래스 제거

// 대상 선정 : .bindic li
const bindic = $(".bindic li");
function addOn(seq) {
    //seq - 읽을 슬라이드 순번
    // 방향 -> 파라미터 seq 값으로 판단
    // 0은 왼쪽에서 오른쪽
    // 2는 오른쪽에서 왼쪽

    // 1. 해당 슬라이드 data-seq 값 읽기
    let dseq = slide.find("li").eq(seq).attr("data-seq");
    // console.log(dseq);
    // 2. 해당 슬라이드와 동일한 순번불릿에 on클래스 넣고 다른 형제 불릿에 on클래스 제거
    bindic.eq(dseq).addClass("on").siblings().removeClass("on");
}
///////////////////////////////////////
////// 각 배너 등장 타이틀 셋팅 /////
///////////////////////////////////////
let bantxt = {
    ban1: "Men's Season<br>Collection",
    ban2: "2023 Special<br>Collection",
    ban3: "GongYoo<br>Collection",
    ban4: "T-Shirt<br>Collection",
    ban5: "Shoes<br>Collection",
    ban6: "Wind Jacket<br>Collection",
}; ///////////// bantxt객체 //////////////

/********************************
    함수명: showTit
    기능: 각 배너 타이틀 보이기
    호출: 배너 이동 후 콜백함수에서 호출함
********************************/
function showTit() {
    // 요구사항: 배너 이동 후 호출하여 해당 배너의 순번에 맞는 타이틀 동적으로 생성하여 애니메이션

    // 1. 항상 도착 후엔 두 번째 슬라이드가 주인공
    // 슬라이드 순번은 1번임
    // 슬라이드 클래스명 읽어오기(타이틀이 클래스명과 연관됨)
    let mainban = slide.find("li").eq(1);
    let clsnm = mainban.attr("class");

    // 2. 호출확인
    let bantit = bantxt[clsnm];
    // console.log("배너 타이틀", clsnm, bantit);

    // 모든 추가 타이틀 지우기
    $(".btit").remove();

    // 타이틀 left위치 변수 처리
    // ban2, ban3만 오른쪽 위치
    let lval = "20%";
    if (clsnm === "ban2" || clsnm === "ban3") lval = "60%";

    // 3. 타이틀 넣을 요소를 배너에 추가
    mainban
        .append(`<h2 class="btit"></h2>`)
        .find(".btit")
        .html(bantit)
        .css({
            position: "absolute",
            top: "33%",
            left: lval,
            transform: "translateX(-50%, -50%)",
            font: "bold 4.5vmax Verdana",
            color: "#fff",
            textShadow: "1px 1px 4px #777",
            whiteSpace: "nowrap",
            opacity: "0", //처음에 투명
        })
        .animate(
            {
                top: "50%",
                opacity: "1",
            },
            1000,
            "easeInOutQuart"
        );
}
// showTit()
setTimeout(showTit, 1000);

// 타임아웃 변수
let banAgain;

// 자동 넘김 지우기 함수
const clearAuto = () => {
    clearInterval(banAuto);
    clearInterval(banAgain);
    banAgain = setTimeout(banAutoSlide, 5000);
};

// 배너 이동시 자동넘김 지우기 세팅
slide.on("drag dragstart dragstop", clearAuto);

// 자동넘김 인터벌 세팅하기
let banAuto;

const banAutoSlide = () => {
    banAuto = setInterval(() => {
        goSlide(0);
    }, 3000);
};

// bindic.on("click",function(){
//     let bidx = $(this).index();
//     $(this).addClass("on").siblings().removeClass("on");
//     console.log(bidx);
//     slide.animate({
//         left: bidx*-100+"%"
//     })
// })

// 자동넘김 최초호출
banAutoSlide();

// 마우스 팔로워 플러그인 적용하기
// 움직일 대상: .btna
// 설정범위는 움직일 대상이 포함된 부모요소

$(".btna").mousefollower();
// 주의사항!
// mousefollower() 메서드를 적용하는 것은
// 마우스 따라다닐 범위 요소를 선택하는 것이다!
// 그 안에 .badge 라는 것이 실제로 따라다닌다!
// 클래스명 badge를 이 플러그인의 설정에 따라
// 반드시 사용해야 한다!
$(".btna").hover(
    function () {
        // over

        // 흰원 나타나기
        $(".inside", this).css({
            transform: "scale(1)",
        }); //// css ////////////

        // 글자 나타나기
        $(".btntit", this).css({
            transform: "translate(-50%, -50%) scale(1)",
        });
    },
    function () {
        // out

        // 흰원 사라지기
        $(".inside", this).css({
            transform: "scale(0)",
        }); //// css ////////////

        // 글자 사라지기
        $(".btntit", this).css({
            transform: "translate(-50%, -50%) scale(0)",
        });
    }
); ///// hover ///////////

/**********************
    배너이동 버튼 클릭시 배너 이동하기
**********************/
// 대상: .btntit
$(".btntit").on("click",function(){
    // 자동 넘김 지우기 함수 호출
    clearAuto();

    let isB = $(this).parent().is(".ar1");
    
})

