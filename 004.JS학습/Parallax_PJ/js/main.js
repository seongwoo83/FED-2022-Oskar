window.addEventListener("DOMContentLoaded", loadFn);

// []{}
function loadFn(){
    // 1. 부드러운 스크롤
    startSS();
    
    // 2. 공통 함수
    const qs = x => document.querySelector(x);
    const qsa = x => document.querySelectorAll(x);

    // 3. 등장위치 리턴 함수
    const retVal = x => x.getBoundingClientRect().top;
    // getBoundingClientRect().top -> 화에에 등장후 위로 올라가면 마이너스됨

    // 4. 화면높이값 : 등장요소의 시작값이 이것임
    const winH = window.innerHeight;

    // 5. 패럴렉스 수치범위 : 움직일 값 설정
    const setH1 = 100;
    const setH2 = 200;

    // 6.패럴렉스 대상선정
    const tg1 = qsa(".txt");
    const tg2 = qsa(".icon");

    // 7. 패럴렉스 이동함수
    const moveEl = (elpos, ele, setH)=>{
        // 전달값: elpos = 위치값/ ele = 요소/ setH = 정한범위수
        // 패럴렉스 범위 : 윈도우 높이값 ~0까지
        // 화면에서 완전히 사라질 때 범위는 0이 아니고 요소의 -높이 값이다
        if(elpos < winH && elpos > 0 ){
            // 1) 위치이동값 계산
            let x = setH - (elpos * setH) / winH;
            console.log("x", -x);

            // 2. 해당요소에 위치이동 css반영
            ele.style.cssText = `
                transform:translateY(${-x}px);
            `;
        }
    }
    // 8. 스크롤 이벤트함수 만들기
    window.addEventListener("scroll", ()=>{

        // 대상1: 글자박스 패럴렉스호출
        tg1.forEach(ele=>moveEl(retVal(ele), ele, setH2));

        // 대상2: 아이콘 패럴렉스호출
        tg2.forEach(ele=>moveEl(retVal(ele), ele, setH1));
        

            // 대상요소의 transform Y축이동
            // 위치이동의 계산원리
            // -> 윈도우화면 : 위치값 = 정한 범위 : 실제이동값
            // -> 윈도우가 1000px : 500px = 200px : x
            // 실제 이동값 = 위치값*정한범위 / 윈도우화면 
            // x = elpos * setH2 / winH
        //  -> 이동수치는 0부터 서서히 증가해야 하므로 정한범위에서 뺴준다
    })
    window.addEventListener("mouseup", ()=>{
        pos = window.scrollY;
    })
    window.addEventListener("keyup", ()=>{
        pos = window.scrollY;
    })

    
    setTimeout(() => {
        window.scrollTo(0, 0);
        pos = 0
    }, 400);

}