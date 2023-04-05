// 로딩구역 없이 함수로 구현함

/*****************************************
    대상 변수 할당하기
*****************************************/
// 전체 페이지 번호
let pno : number = 0;
// 페이지 요소
const pg = $(".page");
// 전체 페이지 개수
const pgcnt = $(".page").length;
// console.log('pgcnt: ', pgcnt);
// 광실행 금지 변수
let prot:any[] = [];

/*****************************************
    이벤트 등록하기
*****************************************/
// 윈도우 휠 이벤트 발생시
$(window).on("wheel", wheelFn);


/*****************************************
    함수명: wheelFn
    기능: 마우스 휠 이벤트 발생시 호출됨
    -> 한페이지씩 자동 스크롤 기능
*****************************************/

function wheelFn(e: any){

    // 광휠 금지
    if(prot[0]) return;
    prot[0]=1;
    setTimeout(() => { prot[0] = 0 }, 800);

    console.log("휠 이벤트");
    // 1. 휠 방향 알아내기
    let delta  = e.wheelDelta;

    if(delta<0){
        pno++;
        if(pno === pgcnt) pno = pgcnt -1;
    }else{
        pno--;
        if(pno === -1) pno = 0;
    }
    console.log(pno);

    // 3. 스크롤 이동하기
    // 대상:  html, body -> 두 개를 모두 잡아야 공통적으로 적용됨
    $("html, body").animate({
        scrollTop: ($(window).height() as number * pno)+"px"
    },800, "easeOutBounce")

}