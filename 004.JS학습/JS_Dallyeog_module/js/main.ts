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
$(".myipt").on("click", function(){
    // 해당 박스 달력 보이기
    $(this).next().find(".calender").show();
})

// on(이벤트명, 함수) -> 이벤트명을 띄어쓰기로 여러개 세팅가능
$(".calender").on("mouseenter click",function(){
    $(this).find(".date").on("click",()=>{
        //  이벤트를 싸고 있는 이벤트 대상을 this로 만들고 싶을 때 화살표함수를 사용함
        let val :any = $(this).find(".dinfo").val();
        $(this).parent().prev().val(val);
        $(this).hide();

        // 두 번째 캘린더에서 날짜를 선택하면 첫 번째와 두 번째 선택 날짜 차이를 계산하여 .res에 출력함
        // 두 번째 캘린더인지 구분하기 : 캘린더 부모박스가 .calbx2인지 확인
        if($(this).parent().is(".calbx2") && $("#myinpt").val() !== 0){
            // 조건: 첫 번째 입력창이 비어있는가? (비어있지 않아야함)
            // 두 번째 캘린더 이고 첫 번째 입력창이 비어있지 않으면 실행
            //날짜 차이 계산하기 함수 호출
            let val1  = $("#myinput").val();
            let val2 = $("#myinput2").val();
            // 대상: #myinput, #myinput2
            // 함수는 생성자 함수 안에 있음
            //  new 키워드로 인스턴스를 생성한 변수하위로 접근가능
            // 이 함수는 결과를 리턴하므로 변수에 담는다.
            let res = calbx2.getDateDiff(val1, val2);

            $(".res").text(res);
        }        
    })
})