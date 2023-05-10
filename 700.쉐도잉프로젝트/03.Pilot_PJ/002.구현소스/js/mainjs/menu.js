// 메뉴관련 기능 JS - menu.js
function menuFn() {
    // 메인페이지
    // 메뉴바 버튼 클릭시 전체메뉴 보이기
    $(".ham").on("click", function () {
        // 메뉴바 버튼 클래스 변경
        $(this).toggleClass("on");
        // 전체 메뉴 보이기
        $(".mbox").fadeToggle(400);

        // 햄버거 버튼에 클래스 on 이 있으면 재생/ 없으면 정지
        let isOn = $(this).is(".on");
        console.log($(this).is(".on"));
        // 메뉴 배경 동영상 재생
        if (isOn) {
            $(".bgm").get(0).play();
        } else {
            $(".bgm").get(0).pause();
        }
    });
}
export default menuFn;
