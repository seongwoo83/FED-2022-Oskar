function MakeDallyeok(){

    const qs = (x :any) => document.querySelector(x);
    const qsa = (x : any) => document.querySelectorAll(x);
    
    
    // 1. 변수 세팅

    // 1-1 변경할 현재날짜 객체
    const curr_date : Date = new Date();
    // 1-2 오늘 날짜 객체
    const today : Date = new Date();
    // 1-3 년도 요소 .yearTit
    const yearTit : any = qs(".yearTit");
    // 1-4 월 요소 .monthTit
    const monthTit :any = qs(".monthTit");
    // 1-5 날짜 요소 .dates
    const dates :any = qs(".dates");

}