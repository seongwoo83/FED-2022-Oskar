window.addEventListener("DOMContentLoaded", () => {
    startSS();
    /* 만약 스크롤바를 직접 드래그할 경우 mouseup(즉, 스크롤바를 놓는경우)이벤트 발생시 Y축 스크로위치를 pos 전역변수에 업데이트 한다 */
    window.addEventListener("mouseup", () => {
        pos = window.scrollY;
    });
});
export {};
