/* 보그 PJ 카테고리 페이지 JS - category.js */

/* 넘어온 url받기 pm -> parameter*/
let pm = location.href;
/* location.href가 이퀄 오른쪽에 있으면 url주소 읽어옴 */
/* 문자열 잘라서 값 읽어오기 -> 물음표로 잘라서 두 번째 값 -> 이퀄로 잘라서 두 번째 값*/
pm = pm.split("?")[1].split("=")[1];
/* pm값 특수문자 복원하기 */
pm = decodeURIComponent(pm);
console.log(pm);

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn(){
    console.log("로딩완료");

    /* 1. 변경대상선정 */
    /* 1) 서브타이틀 */
    const stit = document.querySelector(".stit");
    /* 2) 서브메뉴 */
    const lnb = document.querySelector(".lnb");
    /* 3) 컨텐츠 상위박스 */
    const cont = document.querySelector(".cont");
    /* 4) title 요소(타이틀 내용에 카테고리명 추가) */
    const titag = document.querySelector(".title");
    
    /* 2. 메뉴데이터(sinfo 변수) 객체에서 카테고리값 선택하기 */
    const mdata = sinfo[pm];
    
    /* 3. 대상에 변경 적용하기 */
    /* 1) 카테고리 페이지 타이틀 넣기 */
    /* 대상: .stit -> stit변수 */
    stit.innerText = mdata["제목"];
    /* 2) lnb 메뉴 넣기 */
    /* 3) 컨텐츠박스에 pm과 같은 이름의 클래스 넣기*/
    cont.classList.add(pm.replace(" & ", "-")); /* '&' 있으면 '-'로 바꿈
     */
}