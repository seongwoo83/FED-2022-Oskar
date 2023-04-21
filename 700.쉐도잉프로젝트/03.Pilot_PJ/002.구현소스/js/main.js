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
$(".ham").on("click",function(){
    // 메뉴바 버튼 클래스 변경
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);

    // 햄버거 버튼에 클래스 on 이 있으면 재생/ 없으면 정지
    console.log($(this).is(".on"));
    // 메뉴 배경 동영상 재생
    if(isOn){
        $(".bgm").get(0).play();
    }else{
        $("bgm").get(0,(gses))
    }
})

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
    axis: "x" // x축을 기준으로 움직임
})

// 3. 드래그가 끝난 후 -> dragstop 이벤트 발생 후
// 기준위치 체크후 이동 애니메이션

// 윈도우 크기 리턴함수
const reWin = () => $(window).width();

// 리사이즈 업데이트
$(window).on("resize", function(){
    winW = reWin();
    console.log("winW", winW);
})

// 윈도우 가로크기 - left 기준위치 px변환
let winW = reWin();
console.log("winW * 0.9: ", winW * 0.9);
console.log("winW: ", winW);
console.log("winW * 1.1: ", winW * 1.1);

// 광드래그 방지위해 커버세팅 (show(), hide())
const cover = $(".cover");


// 드래그 끝난 후 이벤트 함수 만들기
slide.on("dragstop",function(){
    // 광드래그 방지 커버 
    cover.show()
    // slide left위치값
    let sleft = $(this).offset().left;
    console.log(sleft);

    // 1. 왼쪽으로 이동 : -110% 미만일때
    if(sleft < -winW*1.1){
        slide.animate({
            left: -winW*2+"px"
        }, 600, "easeOutQuint", ()=>{
            // 이동후 맨앞 li 맨뒤로 이동
            slide.append(slide.find("li").first()).css({left:"-100%"});
            cover.hide();
        })
    }
    // 2. 오른쪽으로 이동 : -90% 초과일때
    else if(sleft > -winW*0.9){
        slide.animate({
            left: "0px"
        }, 600, "easeOutQuint",()=>{
            // 이동후 맨앞 li 맨뒤로 이동
            slide.prepend(slide.find("li").last()).css({left:"-100%"});
            cover.hide();
        })
    }
    // 3. 제자리로 이동 : -110% ~ -90%
    else{
        slide.animate({
            left: -winW+"px"
        }, 600, "easeOutQuint",()=>{
            cover.hide();
        })
    }


});