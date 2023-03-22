"use strict";
window.addEventListener('DOMContentLoaded', () => {
    /*****************************
     * 리턴함수세팅구역
    *****************************/
    /* 요소선택 함수 */
    const q = x => {
        /* 리턴요소 변수 */
        let rv = document.querySelectorAll(x);
        /* 요소 갯수 체크 */
        let cnt = rv.length;
        cg(cnt + "개");
        /* 1개일 경우 첫번째만 선택해서 리턴 */
        if (cnt === 1)
            rv = rv[0];
        /* 결과 리턴하기 */
        return rv;
    };
    /* 2. 콘솔 출력함수 */
    const cg = x => console.log(x);
    // 3. 등장액션 대상 위치값 리턴함수/////
    const retVal = ele => ele.getBoundingClientRect().top;
    /*########################################*/
    /***************************************
        스크롤 등장 액션 기능구현하기
    ***************************************/
    /* 대상: .scAct */
    const scAct = q(".scAct");
    /* 상단메뉴 대상: #top */
    const topA = q("#top");
    /* 위로가기버튼 대상: .tbtn */
    const tbtn = q(".tbtn");
    /* 화면높이값의 2/3 구하기 */
    const hv = window.innerHeight * 2 / 3;
    /* 현재 스크롤 위치변수 */
    let scTop;
    /* 스크롤 이벤트 세팅하기 */
    window.addEventListener("scroll", () => {
        /* 현재 스크롤 위치 */
        scTop = window.scrollY;
        cg(scTop);
        /* 상단메뉴 슬림메뉴 적용하기 */
        if (scTop >= 100) {
            topA.classList.add("on");
        }
        else {
            topA.classList.remove("on");
        }
        if (scTop >= 300) {
            tbtn.classList.add("on");
        }
        else {
            tbtn.classList.remove("on");
        }
        /* 값확인하기 */
        // cg("박스1: "+retVal(scAct[0]));
        /* 스크롤 등장 요소 갯수만큼 for문으로 돌리기 */
        for (let x of scAct)
            showIt(x);
        // showIt(x)
    });
    /* 클래스 넣기 함수 만들기 */
    const showIt = x => {
        /* 대상요소에 현재스크롤 위치 */
        let xval = retVal(x);
        /* 구간적용 검사하기 */
        /* 0보다 크고 화면의 2/3보다 작은 구조 */
        if (xval < hv && xval > 0) {
            /* 해당요소에 클래스 넣기 */
            x.classList.add("on");
        }
        /* 되돌리기(on제거)는 else문에 구현가능함 */
        // else{
        //     x.classList.remove("on");
        // }
    };
    /* 상단이동버튼(.tbtn) 클릭시 상단이동하기 */
    /* 부드러운 스크롤 pos스크롤 위치값 업데이트 필요 */
    tbtn.onclick = (e) => {
        e.preventDefault();
        /* 부드러운 스크롤 전역변수를 0으로 설정하여 최상단으로 이동 */
        pos = 0;
        /* 위치 이동하기 */
        window.scrollTo(0, 0);
    };
});
