// 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js
// 로딩구역 없이 함수로 구현함
/*****************************************
    [ 생성자함수로 묶어서 export해준다 ]
    < 생성자함수로 변경할 때 체크할 점>

    1. 일반함수(function)는 할당형 함수로 변경
    -> 함수명은 this키워드로 등록
    예) function my(){} 
        -> this.my = () => {} 로 변경

    2. 변수는 외부에 공개할 것만 this 키워드로 등록함
    -> 일반적으로 let, const를 모두 변경할 필요는 없고 
    내가 인스턴스 생성시 접근해야할 변수만 this로 등록함 
    
    3. 할당형 변수는 호출 호이스팅이 불가하므로 상단에서 바로
    함수를 호출하거나 이벤트 등록한 경우 이를 생성자함수 하단으로
    이동시킴
    
*****************************************/
function AutoScroll() {
    /*****************************************
    대상 변수 할당하기
*****************************************/
    // 전체 페이지 번호
    let pno = 0;
    // 페이지 요소
    const pg = $(".page");
    // 전체 페이지 개수
    const pgcnt = $(".page").length;
    // console.log('pgcnt: ', pgcnt);
    // 광실행 금지 변수
    let prot : any = [];
    //  gnb메뉴 li
    const gnb = $(".gnb li");
    // indic메뉴 li
    const indic = $(".indic li");
    // 각 페이지별 등장요소
    const minfo = $(".minfo");
    /*****************************************
    이벤트 등록하기
*****************************************/
    // 윈도우 휠 이벤트 발생시
    $(window).on("wheel", wheelFn);
    // gnb메뉴 클릭시: 대상 - .gnb a
    $(".gnb a").on("click", chgMenu);
    // 인디케이터 클릭시: 대상 - .gnb a
    $(".indic a").on("click", chgMenu);
    // 새로고침시 스크롤 위치 캐싱 변경하기
    $("html, body").animate({ scrollTop: "0px" });
    /*****************************************
    함수명: wheelFn
    기능: 마우스 휠 이벤트 발생시 호출됨
    -> 한페이지씩 자동 스크롤 기능
*****************************************/
    function wheelFn() {
        // 광휠 금지
        if (prot[0]) return;
        chkCrazy(0);
        console.log("휠 이벤트");
        // 1. 휠 방향 알아내기
        //@ts-expect-error
        let delta = event === null || event === void 0 ? void 0 : event.wheelDelta;
        if (delta < 0) {
            pno++;
            if (pno === pgcnt) pno = pgcnt - 1;
        } else {
            pno--;
            if (pno === -1) pno = 0;
        }
        console.log(pno);
        // 3. 스크롤 이동하기
        // 대상:  html, body -> 두 개를 모두 잡아야 공통적으로 적용됨
        movePg();
    }
    /*******************************************
    함수명: chgMenu
    기능: 메뉴 클릭시 메뉴 변경과 페이지 이동
*******************************************/
    function chgMenu(this: any, e) {
        e.preventDefault();
        //  0. 광클금지
        if (prot[1]) return;
        chkCrazy(1);
        // 1. 클릭된 a 요소의 부모 li 순번을 구함  === pno
        let idx = $(this).parent().index();
        // 2. 전역 페이지 번호에 순번 업데이트
        pno = idx;
        // 3. 페이지 이동, 메뉴에 클래스 "on" 넣기
        movePg();
    }
    /*******************************************
    함수명: chkCrazy
    기능: 광적동작 체크하여 제어리턴
*******************************************/
    function chkCrazy(seq) {
        prot[seq] = 1;
        setTimeout(() => {
            prot[seq] = 0;
        }, 800);
    }
    /*******************************************
    함수명: movePg
    기능: 페이지 이동 애니메이션
*******************************************/
    function movePg() {
        $("html, body").animate(
            {
                scrollTop: ($(window).height() as number) * pno + "px",
            },
            800,
            "easeInOutQuint",
            showEle
        );
        // 대상: gnb메뉴, 인디케이터
        gnb.eq(pno).addClass("on").siblings().removeClass("on");
        indic.eq(pno).addClass("on").siblings().removeClass("on");
    }
    // 등장할 요소 초기화
    minfo.css({
        opacity: "0",
        transform: "translate(-50%, 50%)",
        transition: ".6s ease-out",
    });
    /*******************************************
    함수명: showEle
    기능: 페이지 이동후 요소 등장하기
*******************************************/
    function showEle() {
        // .minfo 페이지별 등장하기
        pg.eq(pno)
            .find(".minfo")
            .css({
                opacity: "1",
                transform: "translate(-50%, -50%)",
            })
            .parents(".page")
            .siblings()
            .find(".minfo")
            .css({
                opacity: "0",
                transform: "translate(-50%, 50%)",
                transition: ".6s ease-out",
            });
    }
    // 최초호출
    setTimeout(showEle, 1000);
} // AutoScroll 생성자 함수

export default AutoScroll;