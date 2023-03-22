/* 보그 PJ 링크시스템 JS - linksys.js */
window.addEventListener("DOMContentLoaded", linkFn);
function linkFn() {
    console.log("링크 로딩완료");
    /* 1. 링크대상 설정 */
    /* 1) GNB : .gnb a */
    const gnb = document.querySelectorAll(".gnb a");
    /* 2) 로고 : .logo a */
    const logo = document.querySelector(".logo a");
    /* 2. 클릭이벤트 설정 */
    /* (1) gnb 링크 */
    for (let x of gnb) {
        x.onclick = (e) => {
            /* 0) 클릭 이동기능 막기 */
            e.preventDefault();
            /* 1) 클릭된 a요소 텍스트 읽고 텍스트 변경하기 */
            let atxt = x.innerText.toLowerCase().trim();
            /* toLowerCase() -> 소문자변환 */
            /* 참고) toUpperCase() -> 대문자변환 */
            /* trim() -> 앞뒤공백제거 */
            /* 2) 서브페이지 이동하기 */
            if (atxt !== "search")
                location.href = "category.html?cat=" + encodeURIComponent(atxt);
        };
    }
    /* (2) 로고 클릭설정 */
    logo.onclick = (e) => {
        e.preventDefault();
        /* 홈으로 이동하기 */
        location.href = "index.html";
    };
}
export {};
