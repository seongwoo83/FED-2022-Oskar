"use strict";
window.addEventListener("DOMContentLoaded", () => {
    /* 구현내용: 내부링크 클릭하여 index페이지 이동시 */
    /* 파라미터로구문하여 메인페이지 애니메이션 중지 */
    /* 1. 파라미터 읽어오기 */
    let pm = location.href;
    /* 2. 파라미터 유무로 분기하기 */
    /* 물음표 존재여브로 애니메이션 실행가부 결정 */
    if (pm.indexOf("?") !== -1) {
        /* 파라미터 잘라서 값만 추출 */
        pm = pm.split("?")[1].split("=")[1];
        console.log(pm);
        /* pm값이 "m"이면 애니메이션 중지 */
        if (pm === "m") {
            /* body의 클래스를 제거함 */
            document.body.classList.remove("on");
        }
    }
});
