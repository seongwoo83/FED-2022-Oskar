// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

// 메인페이지
// 메뉴바 버튼 클릭시 전체메뉴 보이기
$(".ham").on("click",function(){
    // 메뉴바 버튼 클래스 변경
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);
})