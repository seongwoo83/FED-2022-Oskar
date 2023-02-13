//CGV PJ 메인페이지 JS - main.js

/* 요소 선택 함수 */
const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);





/* ############ 로드구역 ############### */
window.addEventListener("DOMContentLoaded",()=>{
    console.log("로딩완료");

    /*************************
        [ 포스터 메뉴 클릭시 클래스 주기]
        - 포스터 메뉴 클릭히 해당 li에 클래스 "on"을 주고 나머지 li는 "on"을 모두 제거하여 선택된 li만 일어서있는 CSS가 적용되게 함    
    *************************/
    /* 1. 대상선정: .mlist>ul>li -> 이벤트대상, 변동대상 일치 */
    const mlist = qsa(".mlist>ul>li");
    // console.log('mlist: ', mlist);

    /* 2. 클릭이벤트 함수설정하기 */
    for(let x of mlist){
        x.onclick= ()=>{

            /* 1) li에 클래스 초기화 */
            mlist.forEach(ele=>ele.classList.remove("on"))// ####### forEach()
            /* forEach((객체값, 순번, 객체)=>{코드}) -> 객체에서 사용될때*/
            /* forEach((요소, 순번, 객체)=>{코드}) -> 요소에서 사용될때*/
            

            /* 2) 클릭된 li에 클래스 "on"넣기 
            -classList 객체사용 
            -add()메서드 사용 
             */
            x.classList.add("on");

        }// ######### click()
    }// ########## for of
    

    /******************************************
        [ 극장가는 길 구글맵 보기 기능 ]
        - 극장가는길 박스 클릭시 구글 맵 등장
        - 구글맵박스의 닫기 버튼 클릭시 구글맵 퇴장
        -> 방법: CSS세팅된 클래스 "on"넣기/빼기
    ******************************************/
    /* 1. 대상선정 */
    /* 1-1 이벤트대상: .anibx */
    const anibx = qs(".anibx");
    /* 1-2 변경대상: .gmap */
    const gmap = qs(".gmap");

    /* 2. 버튼에 클릭이벤트 설정하기 */
    const cbtn = qs(".cbtn");
    anibx.onclick = ()=>{
        gmap.classList.toggle("on");
        anibx.classList.toggle("on");
    }; /* 구글맵 박스에 클래스 넣기/빼기 */
    cbtn.onclick = ()=>{
        gmap.classList.remove("on");
        anibx.classList.remove("on");
    };


    /* sns 링크 이동하기 */
    /* 1. 대상선정 */
    const sns = qsa(".sns a");
    /* 2. 클릭이벤트 설정 */
    sns.forEach((ele)=>{
        ele.onclick = ()=>{
            let btxt = ele.innerText;
            // console.log('btxt: ', btxt); 
            let url = "";
            switch(btxt){
                case "트위터 바로가기": url = "https://twitter.com/CGV_ID"; break
                case "인스타그램 바로가기": url = "https://www.instagram.com/cgv_korea/"; break
                case "페이스북 바로가기": url = "https://www.facebook.com/CJCGV"; break
            }
            /* 새창에서 열기 ->  window.open() */
            window.open().location.href = url;
        }
    });



})/*################## 로드구역 ##################*/