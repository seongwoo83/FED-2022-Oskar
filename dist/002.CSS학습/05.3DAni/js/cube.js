"use strict";
/** 큐브 애니 JS */
/**
 *  [ 구현내용 ]
 *  - "돌아" 버튼을 클릭하면 멈춰있던 큐브가 회전함. 이때 버튼이 "멈춰"버튼으로 변경되어 있음.
 *  - "멈춰" 버튼을 클릭하면 회전하던 큐브가 멈춤. 이때 버튼이 "돌아"버튼으로 변경되어 있음.
 */
/******************** 로드구역 ********************/
window.addEventListener("DOMContentLoaded", () => {
    console.log("로딩완료");
    /* 1. 대상선정 */
    /* 1-1 이벤트 대상: .btngo */
    const btngo = document.querySelector(".btngo");
    /* 1-2 변경대상: .cube */
    const cube = document.querySelector(".cube");
    /* 2. 버튼 클릭 이벤트 설정 */
    btngo.onclick = () => {
        /* 큐브에 class .on 넣기 */
        cube.classList.toggle("on");
        /* toggle()메서드는 지정한 클래스가 있으면 빼고 없으면 넣는 메서드임 */
        /* 현재 큐브에 "on" 클래스가 있는지 여부 검사 */
        let isOn = cube.classList.contains("on");
        console.log(isOn);
        /* 버튼 텍스트 변경하기 */
        btngo.innerText = isOn ? "멈춰!" : "돌아";
        /* 삼항 연산자 사용(조건연산자) */
    };
}); /********************* 로드구역 *********************/
