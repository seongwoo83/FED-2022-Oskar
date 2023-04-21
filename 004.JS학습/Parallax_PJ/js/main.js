window.addEventListener("DOMContentLoaded", loadFn);


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

    // 7. 스크롤 이벤트함수 만들기
    window.addEventListener("scroll", ()=>{
        //   테스트 - 3번째 텍스트 위치값
        console.log(retVal());
    })
}

 