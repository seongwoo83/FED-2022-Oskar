// 쇼핑몰 배너 JS - 03.페이드효과 //

// 로딩후 loadFn함수 호출 //////////
window.addEventListener("DOMContentLoaded", loadFn);

/******************************************** 
 * 
    [ 페이드 효과 슬라이드 기능정의 ]
    -> 슬라이드 순번에 대한 전역변수를 사용한다!

    1. 오른쪽 버튼클릭시 다음 순번슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨위로 설정해준다!(트랜지션적용)
    ->나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽버튼은 이전순번이 나오며 위와 동일

    3. 끝번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번표시

********************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩후 이벤트설정 및 슬라이드 기능
******************************************/
function loadFn() {
    console.log("로딩완료");

    /* 슬라이드 번호변수 */
    let snum = 0;
    
    /* 1. 대상선정 */
    /* 1-1 이벤트 대상: .abtn */
    const abtn = document.querySelectorAll(".abtn");
    // console.log('abtn: ', abtn);
    /* 1-2 변경 대상: #slide */
    const slide = document.querySelectorAll("#slide>li");
    /* 1-3 불릿: .indic li */
    const indic = document.querySelectorAll(".indic li");
    
    /* 슬라이드 갯수 */
    let scnt = slide.length;
    console.log("슬개수: ", scnt);
    
    let prot = 0;
    /* 2. 슬라이드 변경함수 만들기 */
    const goSlide = (seq) => {

        if(prot) return;
        prot = 1;
        // console.log("나는 들어왔어");
        setTimeout(() => {
            prot = 0;
        }, 400);/* //////////////// */

        console.log("슬고우", seq);
        /* 1) 방향에 따른 분기 */
        /* 1-1) 오른쪽 버튼 클릭시: seq===1일때 */
        if(seq){
            /* 슬라이드 번호 증가 */
            snum++;
            console.log("오른", snum);
        }else{
            /* 슬라이드 번호 감소 */
            snum--;
            console.log("왼", snum);
        }

        /* 2) 한계값 체크 */
        //처음이전 -> 끝
        if(snum === -1) snum = scnt-1;
        //끝다음 -> 처음
        else if(snum === scnt) snum = 0;
        /* 3) 이동하기 해당순번 슬라이드 li애 클래스 "on" 넣기*/
        /* 이동대상: slide */
        chgSlide(slide)

        chgSlide(indic)

    };
    /* 3. 대상에 이벤트 설정하기 */
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            goSlide(idx);
            clearAuto();
        };
    });
    /* 인터벌 함수 멈추기위한 변수 */
    let autoI;
    /* 타임아웃 함수 지우기위한 변수 */
    let autoT; 
    
    /** 
     * 함수명: autoSlide
     * 기능: 인터벌 함수로 슬라이드 함수 호출
     */
    function autoSlide(){
        autoI = setInterval(() => goSlide(1), 3000);
    }

    /* 자동넘김 최초호출 */
    autoSlide();

    /** 
     * 함수명: clearAuto
     * 기능: 인터벌함수 지우고 다시세팅
     */
    function clearAuto(){
        /* 1. 인터벌 지우기 */
        clearInterval(autoI);
        /* 2. 타임아웃도 지우지 않으면 쌓여서 타임아웃 쓰나미 실행*/
        clearTimeout(autoT);
        /* 2. 잠시 후 다시 작동하도록 타임아웃 */
        autoT = setTimeout(autoSlide, 5000);
    }
    /* 불릿 클릭시 슬라이드이동하기 */
    indic.forEach((ele, idx)=>{
        ele.onclick = ()=>{
            /* 전역변수 snum 업데이트하기 -> 불릿순번===슬라이드 순번 */
            snum = idx;
            chgSlide(indic);
            chgSlide(slide);
            clearAuto();
        };
    });

    function chgSlide(obj){
        obj.forEach(ele=>ele.classList.remove("on"));
        obj[snum].classList.add("on");
    }



}

 /////////////// loadFn 함수 //////////////