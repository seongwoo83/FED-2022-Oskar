"use strict";
$(() => {
    console.log("로딩완료");
    // 1. 대상선정
    // 1-1. 버튼 : .act button
    const abtn = $(".act button");
    // 1-2. 퍼센트원: .btns
    const btns = $(".btns");
    //  1-2. 진행바: .lbar
    const bar = $(".lbar");
    // 2. 이벤트 설정
    // 2-1. 첫번째 버튼(팽수1) - 퍼센트 원
    // .one(이벤트명, 함수) -> 이벤트를 한 번 만 적용함
    abtn.first().one("click", () => {
        progFn(0, 49);
        progFn(1, 63);
        progFn(2, 98);
        progFn(3, 77);
    });
    // 2-2 두번째 버튼(팽수2) - 진행 바
    abtn.last().one("click", () => {
        // 바 텍스트
        const btxt = bar.prev().find("b");
        // 숫자 변수
        let num = 0;
        const progBar = () => {
            num++;
            btxt.text(num);
            // 바 width 증가
            bar.css({ width: num + "%" });
            if (num < 100) {
                setTimeout(() => {
                    progBar();
                }, 30);
            }
        };
        progBar();
    });
    /***********************************************
     함수명: progFn
     기능: 퍼센트 증가에 따른 숫자, 그래프변경
     ***********************************************/
    function progFn(seq, perc) {
        // 해당순번의 숫자요소
        let ptxt = btns.eq(seq).find(".ptxt");
        // 퍼센트 증가
        //  개별 숫자 텍스트 읽어오기
        // 변경할 숫자변수
        let num = Number(ptxt.text());
        num++;
        ptxt.text(num);
        // 계산하기
        let calc = (300 * (100 - num)) / 100;
        // 계산법 : 전체옵션값 X (100-현재퍼센트)/100
        // 100-현재퍼센트 한 이유는 300에서 숫자가 0으로 작아져야 하기 때문
        // 첫번째 퍼센트원 진행하기
        btns.eq(seq).find("circle").css({
            strokeDashoffset: calc + "%"
        });
        // 첫번째 퍼센트원 숫자
        // 재귀호출하기 : 기준 수 보다 작을 때 까지
        // 기준수의 숫자가 원하는 %가 된다
        if (num < perc) {
            setTimeout(() => progFn(seq, perc), 30);
        }
    }
});
