"use strict";
// 옷소매 갤러리 JS - main.js
///////////////// 로딩구역 ///////////////////////
window.addEventListener("DOMContentLoaded", () => {
    console.log("로딩완료!");
    const gbx = document.querySelector(".gbx");
    /* *****************************************
        함수명: goSlide
        기능: 이동방향에 따른 요소 이동하기
    ******************************************/
    let prot = 0;
    const goSlide = (dir) => {
        /* 0. 중복클릭 방지하기 */
        /* 여러번 클릭 금지 변수: 0일때는 허용, 1일때는 불허용 */
        if (prot)
            return;
        prot = 1;
        // console.log("나는 들어왔어");
        setTimeout(() => {
            prot = 0;
        }, 400); /* //////////////// */
        /* 1. 호출확인 */
        console.log(dir);
        /* 2. 대상선정 */
        /* 이동대상: .gbx>div */
        let tg = gbx === null || gbx === void 0 ? void 0 : gbx.querySelectorAll("div");
        /* 3. 분기하기 */
        if (dir) {
            /* 3-1 오른쪽 버튼 클릭시 */
            gbx === null || gbx === void 0 ? void 0 : gbx.appendChild(tg[0]);
        }
        else {
            /* 3-2 왼쪽 버튼 클릭시 */
            gbx === null || gbx === void 0 ? void 0 : gbx.insertBefore(tg[tg.length - 1], tg[0]);
        }
    };
    /*  오른쪽 버튼 클릭시 */
    const rbtn = document.querySelector(".rb");
    rbtn === null || rbtn === void 0 ? void 0 : rbtn.addEventListener("click", () => {
        goSlide(1);
        clearAuto();
    });
    /*  왼쪽 버튼 클릭시 */
    const lbtn = document.querySelector(".lb");
    lbtn === null || lbtn === void 0 ? void 0 : lbtn.addEventListener("click", () => {
        goSlide(0);
        clearAuto();
    });
    /* 인터벌 함수 멈추기위한 변수 */
    let autoI;
    /* 타임아웃 함수 지우기위한 변수 */
    let autoT;
    /**
     * 함수명: autoSlide
     * 기능: 인터벌 함수로 슬라이드 함수 호출
     */
    function autoSlide() {
        autoI = setInterval(() => goSlide(1), 3000);
    }
    /* 자동넘김 최초호출 */
    autoSlide();
    /**
     * 함수명: clearAuto
     * 기능: 인터벌함수 지우고 다시세팅
     */
    function clearAuto() {
        /* 1. 인터벌 지우기 */
        clearInterval(autoI);
        /* 2. 타임아웃도 지우지 않으면 쌓여서 타임아웃 쓰나미 실행*/
        clearTimeout(autoT);
        /* 2. 잠시 후 다시 작동하도록 타임아웃 */
        autoT = setTimeout(autoSlide, 5000);
    }
}); ///////////// 로딩구역 //////////////////////
/////////////////////////////////////////////////
