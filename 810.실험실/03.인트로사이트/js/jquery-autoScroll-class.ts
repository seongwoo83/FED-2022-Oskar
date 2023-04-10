// 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll-class.js
// 로딩구역 없이 메서드로 구현함


/*****************************************
    [ 클래스로 묶어서 export해준다 ]
    - 변경사항들
    1. 공용 변수는  constructor에 this키워드로 등록함

    2. 모든 함수는 메서드형태로 변경함
        function 이름 (){} -> 이름 (){}

    3. 서로다른 메서드에서 클래스 내부 다른 메서드를 호출할때
    this키워드를 사용하여 호출함

    4. 이벤트 등록시 addEventListener(이벤트명,함수)
    함수일때는 함수명만 쓰면 등록 되었으나 클래스는 함수가 아닌 메서드이므로
    이것은 익명함수 구역을 만들고 함수를 호출하는 방식으로 this키워드를 사용한
    메서드 호출을 해야 호출됨

*****************************************/
class AutoScroll {
    // 생성자 메서드( 최초 실행 구역이 되기도 함 )
    pno: number;
    pg: JQuery<HTMLElement>;
    pgcnt: number;
    prot: any[];
    gnb: JQuery<HTMLElement>;
    indic: JQuery<HTMLElement>;
    minfo: JQuery<HTMLElement>;
    sc_speed: number;
    easing: string;
    moveThis: any;
    constructor() {
        /******************************************
            대상 변수할당하기
        ******************************************/
        // 전체 페이지번호
        this.pno = 0;
        // 페이지 요소
        this.pg = $(".page");
        // 전체 페이지개수
        this.pgcnt = this.pg.length;
        // console.log("페이지개수:", this.pgcnt, this.pg);
        // 광실행금지변수
        this.prot = [];
        // 광스크롤금지
        this.prot[0] = 0;
        // 광클 초기값
        this.prot[1] = 0;
        // THIS.GNB 메뉴 li
        this.gnb = $(".gnb li");
        // this.indic 메뉴 li
        this.indic = $(".indic li");
        // 각 페이지별 등장요소
        this.minfo = $(".minfo");
        // this.** -> 인스턴스 생성시 접근하여 변경가능한 속성 2가지 선정
        // 이동시간
        this.sc_speed = 700;
        // 이징값
        this.easing = "easeInOutQuint";
        // 최초로 호출할 메서드도 여기서 호출
        this.initPg();
    }
    /********************************
        메서드명: initPg
        기능: 페이지 초기세팅하기
    ********************************/
   initPg(){
    /******************************************
        이벤트 등록하기
    ******************************************/
    // 윈도우 휠이벤트 발생시
    $(window).on("wheel", ()=>this.wheelFn());
    // THIS.GNB메뉴 클릭시 : 대상 - .this.gnb a
    $(".gnb a").click(()=>this.chgMenu(event));
    // 인디케이터 클릭시 : 대상 - .this.indic a
    $(".indic a").click(()=>this.chgMenu(event));
    // 새로고침시 스크롤위치 캐싱 변경하기(맨위로!)
    $("html,body").animate({ scrollTop: "0px" });
   }
     




        /****************************************
            메서드명: wheelFn
            기능: 마우스휠 이벤트 발생시 호출됨
            -> 한페이지씩 자동스크롤 기능
        ****************************************/
        wheelFn() {
            // 광휠금지
            if (this.prot[0])
                return;
            this.chkCrazy(0);
            console.log("휠~~~~~~!");
            // 1.휠방향 알아내기
            // @ts-ignore
            let delta = event?.wheelDelta;
            console.log(delta);
            // 2. 방향에 따른 페이지번호 증감
            if (delta < 0) {
                this.pno++;
                if (this.pno === this.pgcnt)
                    this.pno = this.pgcnt - 1;
                // 마지막 페이지번호에 고정!
            } //// if /////
            else {
                this.pno--;
                if (this.pno === -1)
                    this.pno = 0;
                // 첫페이지번호에 고정!
            } //// else ////
            console.log(this.pno);
            // 3. 스크롤 이동하기 + 메뉴에 클래스"on"넣기
            this.movePg();
        }; /////////////// wheelFn 메서드 ///////////////

        /********************************************
            메서드명: chgMenu
            기능: 메뉴 클릭시 메뉴변경과 페이지이동
        ********************************************/
        chgMenu(e:any) {
            // 0. 광클금지
            if (this.prot[1])
                return;
            this.chkCrazy(1);
            // 1. 클릭된 a요소의 부모 li 순번을 구함 === this.pno
            let idx = $(e.currentTarget).parent().index();
            console.log("나,클릭?", this, e.currentTarget, idx);
            // 2. 전역페이지번호에 순번 업데이트
            this.pno = idx;
            // 3. 페이지이동 + 메뉴에 클래스"on"넣기
            this.moveThis.pg();
        } ////////// chgMenu 메서드 ///////////////////




        /********************************************
            메서드명: chkCrazy
            기능: 광적동작 체크하여 제어리턴
        ********************************************/
        chkCrazy (seq : number) {
            // seq 관리변수 순번
            this.prot[seq] = 1;
            setTimeout(() => (this.prot[seq] = 0), this.sc_speed);
            // 생성시 세팅가능한 이동시간(이동시간동안 막기)
        } //////// chkCrazy메서드 //////////////




        /********************************************
            메서드명: moveThis.pg
            기능: 페이지이동 애니메이션
        ********************************************/
        movePg () {
            // 대상: html,body -> 두개를 모두 잡아야 공통적으로 적용됨!
            $("html,body").animate({
                scrollTop: $(window).height() as number * this.pno + "px",
            }, this.sc_speed, this.easing);
            // 대상: THIS.GNB메뉴 , 인디케이터 메뉴
            this.gnb.eq(this.pno).addClass("on").siblings().removeClass("on");
            this.indic.eq(this.pno).addClass("on").siblings().removeClass("on");
        }///////////////// movePg ////////////////


        // 등장할 요소 초기화 /////
        // this.minfo.css({
        //     opacity: 0,
        //     transform: "translate(-50%,50%)",
        //     transition: ".3s ease-out",
        // }); ///////// css //////
        /********************************************
            메서드명: showEle
            기능: 페이지이동후 요소 등장하기
        ********************************************/
        // this.showEle = () => {
        //     // .this.minfo 페이지별 등장하기!
        //     this.pg.eq(this.pno).find(".this.minfo").css({
        //         opacity: 1,
        //         transform: "translate(-50%,-50%)",
        //     }) ///////// css //////
        //     // 다른페이지 초기화
        //     .parents(".page").siblings().find(".this.minfo")
        //     .css({
        //         opacity: 0,
        //         transform: "translate(-50%,50%)",
        //         transition: ".3s ease-out",
        //     }); ///////// css //////
        // } /////////// showEle 메서드 ///////////////////
        // 등장액션메서드 최초호출 ///
        // setTimeout(showEle, 1000);
       
} //////// AutoScroll 생성자메서드 ////////////
// 클래스 내보내기 ////
export default AutoScroll;
