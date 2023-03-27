// 2023캘린더
// 모듈 불러오기 : import
import MakeDallyeok from "./calendar.js";
//  생성자 함수를 인스턴스로 호출하기
// 인스턴스 생성이란 특정 메모리 구역에 모듈을 로딩시켜서 개별화 기능을 적용되게 함
// 우리가 만든 달력 생성자 함수에서 전달값을 받는것은?
// 달력을 넣을 요소의 선택자 정보임
// 달력 넣을 요소: .calbx
let calbx = new MakeDallyeok(".calbx");
// 초기화 함수를 호출함
calbx.initDallyeok();
// 다른 요소에 달력 추가 생성하기
let calbx2 = new MakeDallyeok(".calbx2");
calbx2.initDallyeok();
// 다음달 달력 호출하기
// calbx2.nextCal();
// 제이쿼리 라이브러리를 html페이지 상단에 호출 후 사용
$(".myipt").on("click", function () {
    console.log(this);
    // 해당 박스 달력 보이기
    $(this).next().find(".calender").show();
});
