$(window).on("DOMContentLoaded",loadFn)
// window.addEventListener("DOMContentLoaded", loadFn);

// []{}
function loadFn(){
    // 1. 부드러운 스크롤
    startSS();
    
    // 2. 화면높이값 : 등장요소의 시작값이 이것임
    const winH = $(window).height();

    // 3. 패럴렉스 수치범위 : 움직일 값 설정
    const setH1 = 100;
    const setH2 = 200;

    // 6.패럴렉스 대상선정
    const tg1 = $(".txt");
    const tg2 = $(".icon");

    // 7. 패럴렉스 이동함수
    const moveEl = (elpos, ele, setH)=>{
        // 전달값: elpos = 위치값/ ele = 요소/ setH = 정한범위수
        // 패럴렉스 범위 : 윈도우 높이값 ~0까지
        // 화면에서 완전히 사라질 때 범위는 0이 아니고 요소의 -높이 값이다
        if(elpos < winH && elpos > 0 ){
            // 1) 위치이동값 계산
            let x = setH - (elpos * setH) / winH;
            // console.log("x", -x);

            // 2. 해당요소에 위치이동 css반영
            $(ele).css({
                transform: `translateY(${-x}px)`
            })
        }
    }

    // 제이쿼리로 getBoundingClientRect().top 값 만들기
    // 요소위치값 - 현재스크롤 위치값
    const retVal = (elpos, scTop)=> elpos - scTop;


    // 8. 스크롤 이벤트함수 만들기
    $(window).on("scroll", ()=>{
        let scTop = $(this).scrollTop();

        // 대상1: 글자박스 패럴렉스호출
        tg1.each((idx,ele)=>moveEl(retVal($(ele).offset().top, scTop), ele, setH2));

        // 대상2: 아이콘 패럴렉스호출
        tg2.each((idx,ele)=>moveEl(retVal($(ele).offset().top, scTop), ele, setH1));
        

            // 대상요소의 transform Y축이동
            // 위치이동의 계산원리
            // -> 윈도우화면 : 위치값 = 정한 범위 : 실제이동값
            // -> 윈도우가 1000px : 500px = 200px : x
            // 실제 이동값 = 위치값*정한범위 / 윈도우화면 
            // x = elpos * setH2 / winH
        //  -> 이동수치는 0부터 서서히 증가해야 하므로 정한범위에서 뺴준다
    })
    $(window).on("mouseup keyup", ()=>{
        pos = $(this).scrollTop();
    })

    $("html, body").animate({
        scrollTop:"0"
    }, 200, ()=>{
        pos = $(this).scrollTop();
    })
}