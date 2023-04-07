// 메인 페이지 JS

// 자동스크롤 불러오기
import AutoScroll from "../../../dist/810.실험실/03.인트로사이트/js/jquery-autoScroll.js"

// 자동스크롤 인스턴스 생성
const autoSc = new AutoScroll();


// 스크롤 속도변경

console.log('기존 속도', autoSc.sc_speed);
autoSc.sc_speed = 500;
console.log('변경 속도', autoSc.sc_speed);
// 이징변경
console.log("기존 이징", autoSc.easing);
autoSc.easing = "easeOutExpo";
console.log("변경 이징", autoSc.easing);

