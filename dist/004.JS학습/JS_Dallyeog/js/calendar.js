"use strict";
function MakeDallyeok() {
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);
    // 1. 변수 세팅
    // 1-1 변경할 현재날짜 객체
    const curr_date = new Date();
    // 1-2 오늘 날짜 객체
    const today = new Date();
    // 1-3 년도 요소 .yearTit
    const yearTit = qs(".yearTit");
    // 1-4 월 요소 .monthTit
    const monthTit = qs(".monthTit");
    // 1-5 날짜 요소 .dates
    const dates = qs(".dates");
}
