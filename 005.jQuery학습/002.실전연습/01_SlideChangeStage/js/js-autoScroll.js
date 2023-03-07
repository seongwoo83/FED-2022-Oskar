/* JS로 구현한 자동페이지 휠  - js-autoScroll.js */

/* 새로고침시 스크롤 위치 캐싱 무시하고 맨위로 이동 */
/* scrollTo(가로, 세로) -> 위치 이동 메서드 */
setTimeout(() => {
    window.scrollTo(0, 0);
}, 100);

window.addEventListener("DOMContentLoaded",  loadFn);

function loadFn(){
    console.log("로딩완료");

    /************************************
        [ 휠 이벤트를 이용한 페이지 이동 컨트롤하기 ]
        -> 휠 이벤트명: wheel
        (예전에는 mousewheel 이벤트가 사용됨 - 공식적으로 폐기됨)

        1. 사용법
            1) 이벤트속성에 함수를 할당
                요소.onwheel = 함수;
            2) 브라우저 이벤트에 등록함
                요소.addEventListener("wheel", 함수, {옵션})

        2. 포인트
            1) 기존 휠이동 기능은 정지함
            -> event.preventDefault();
            2) 휠방향을 알아내야 기능과 매칭가능
            -> event.wheelDelta (휠 방향속성)
            3) 페이지 번호를 전역적으로 사용함
            -> 예) let pgnum = 0;

        3. 휠 이벤트 대상
            1) 전체 스크롤바인 경우 : window
            2) 개별박스인 경우: 선택요소

        4. scroll 이벤트와 wheel 이벤트 비교
            1) 공통점 : 스크롤되는 페이지의 위치이동
            2) 차이점 : 마우스 휠의 동작에만 반응하는 이벤트는 wheel, 스크롤바의 이동에 반응하는 이벤트는 scroll

    _______________________________________________________________ 

    [ addEventListener 메서드의 옵션 ]
    
    기존 addEventListener의 3번째 파라미터로 캡쳐링/버블링 여부를 
        제어할 수 있는 부분이 EventListenerOptions이라는 객체형태의 
        추가 옵션을 받을수 있음

        EventListenerOptions 사용 전
        document.addEventListener('touchstart', handler, false);

        EventListenerOptions 사용 후
        document.addEventListener("touchstart", handler, {
            capture: false,
            once: false,
            passive: false
        });

        ※ 현재 크롬에서 지원하는 EventListenerOptions 옵션은 다음과 같다.

        (1) capture: 이벤트 캡쳐링 적용 여부. 크롬 49부터 지원
        (2) once: 이벤트를 한번만 호출하고 해제되는 옵션. 크롬 55부터 지원
        (3) passive: 스크롤 성능 향상을 위한 옵션으로 true일 경우, 
                스크롤을 위해 블록되는 것을 방지함. 이 경우, 
                preventDefault를 사용할 수 없음. 크롬 51부터 지원
                이 중, passive 속성은 성능향상을 위해, 
                브라우저의 기능을 프로그래밍으로 제어할수 있음
                -> 최근 업데이트된 브라우저는 passive기본값이 true로 세팅되므로 
                    window, document, body 이 세가지 객체에 대해 스크롤 막기 기능을 비활성화 하였음
                    따라서  기본기능을 막고자 하면 passive: false로 기능을 활성화 해야함


    ************************************/
    
    
    /* 0. 변수 설정하기 */
        /* 1) 전체 페이지 변수 */
    let pgnum = 0;
        /* 2) 전체 페이지 수 */
    const pgcnt = document.querySelectorAll(".page").length;
        /* 3) 광스크롤 금지변수 */
    let prot_sc = 0; /* 0이면 광스크롤 허용, 1이면 광스크롤 금지 */
    
    
    /* 1. 전체 휠 이벤트 설정하기 */
    window.addEventListener("wheel", wheelFn,{passive: false});

    /* 2. 휠 이벤트 함수 만들기 */
    function wheelFn(e){
        /* 0) 기본 기능 멈추기 - addEventListener 옵션 passive: false 필수*/
        e.preventDefault();
        
        /* 1) 호출 확인 */
        // console.log("휠~~");

        /* 2) 휠 방향 알아내기 */
        /* 이벤트객체.wheelDelta */
        let dir = e.wheelDelta;
        console.log("방향 ",dir);
        /* 휠 내리면 마이너스(올리면 플러스) */

        /* 3) 방향에 따른 페이지번호 증감 */
        if(dir<0) {
            pgnum++;
            if(pgnum > pgcnt-1) pgnum=pgcnt-1;
        }else{
            pgnum--;
            if(pgnum<0)pgnum = 0;
        }
        
        console.log("페이지 번호: ", pgnum);

        /* 4) 페이지 이동하기 */
        window.scrollTo(0, window.innerHeight*pgnum);
    }


}