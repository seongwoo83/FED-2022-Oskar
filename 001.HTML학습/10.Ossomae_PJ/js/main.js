"use strict";
// 옷소매 갤러리 JS - main.js
///////////////// 로딩구역 ///////////////////////
window.addEventListener("DOMContentLoaded", () => {
    const gbx = document.querySelector(".gbx");
    console.log("로딩완료!");
    document.querySelector(".rb").onclick = () => {
        console.log("오른쪽");
        let tg = gbx.querySelectorAll("div");
        gbx.appendChild(tg[0]);
    };
    document.querySelector(".lb").onclick = () => {
        console.log("왼쪽");
        let tg = gbx.querySelectorAll("div");
        gbx.insertBefore(tg[tg.length - 1], tg[0]);
    };
}); ///////////// 로딩구역 //////////////////////
/////////////////////////////////////////////////
