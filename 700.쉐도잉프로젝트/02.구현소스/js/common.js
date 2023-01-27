/* 도꺠비 PJ 공통 JS - common.js */

console.log("커몬~~!");

var ham = document.querySelector(".ham");
console.log("ham있니?",ham);

/* 요소에 이벤트 설정하기 */
ham.onclick = chgMenu;
/* <button class="ham" onclick="chgMenu()">로 설정한것과 동일함
    주의사항: = 오른쪽에 괄호를 하면 함수가 바로 실행되므로 작성X*/


/********************************************* 
    함수명: chgMenu
    기능: 전체메뉴 보이기 숨기기
*********************************************/

function chgMenu(){
    /* 1. 호출확인 */
    console.log("나야나");
    /* 2. 대상선정: .top요소*/
    var tg = document.querySelector(".top");
    /* 3. 변경내용: .top요소에 클래스 .on 넣었다 빼기 */
    tg.classList.toggle("on");
}//###############chgMenu함수###############

/*********************************************
    [ JS 클래스 컨트롤 내장객체 ]
    classList 객체
    
    -> 요소에 클래스를 넣거나 빼는 등 필요작업을 하는 객체

    ((관련 method))
    1. add(클래스명): 클래스를 추가
    2. remove(클래스명): 클래스를 제거
    3. toggle(클래스명): 클래스 추가 또는 제거
    4. contains(클래스명): 클래스있으면 true
    5. replace(이전클래스명, 변경클래스명): 특정 클래스를 다른 클래스로 변경

    -> 클래스 추가/제거시에 콤마로 구분하여 여려개의 클래스를 추가하거나 제거할 수 있음
    예) 요소.classList.add("tt", "cc", "dd");
    예) 요소.classList.remove("bb", "ee");


*********************************************/