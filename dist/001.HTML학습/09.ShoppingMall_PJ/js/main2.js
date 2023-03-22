// 쇼핑몰 배너 JS - 02.세로방향 배너 슬라이드 //
// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);
/*****************************************************
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 아래 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 top값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!!
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 top값을 0으로 변경한다!

        (2) 위 버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 top값을
            -100%로 변경한다.
            그 후 top값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/
/******************************************
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
    console.log("로딩완료");
    /* 슬라이드 li리스트 */
    let slist = document.querySelectorAll("#slide li");
    /* 잘라내기로 li순번이 뒤섞이므로 불릿변경 매칭을 위한 고유순번을 사용자 정의 속성(data-)으로 만들어줌 */
    slist.forEach((ele, idx) => {
        /* data- 사용자 정의 속성 만들어 넣기 */
        ele.setAttribute("data-seq", idx);
    });
    /* 1. 대상선정 */
    /* 1-1 이벤트 대상: .abtn */
    const abtn = document.querySelectorAll(".abtn");
    // console.log('abtn: ', abtn);
    /* 1-2 변경 대상: #slide */
    const slide = document.querySelector("#slide");
    /* 1-3 불릿: .indic li */
    const indic = document.querySelectorAll(".indic li");
    /* 여러번 클릭 금지 변수: 0일때는 허용, 1일때는 불허용 */
    let prot = 0;
    /* 2. 슬라이드 변경함수 만들기 */
    const goSlide = (seq) => {
        // console.log("슬고우", seq);
        // console.log("못들어갔어");
        /* 여러번 클릭 금지설정하기 */
        if (prot)
            return;
        prot = 1;
        // console.log("나는 들어왔어");
        setTimeout(() => {
            prot = 0;
        }, 400); /* //////////////// */
        let clist = slide.querySelectorAll("li");
        /* 1) 방향에 따른 분기 */
        /* 1-1) 오른쪽 버튼 클릭시: seq===1일때 */
        if (seq) {
            // console.log("오른");
            slide.style.top = "-100%";
            slide.style.transition = "top .4s ease-in-out";
            /* 슬라이드 이동후 */
            setTimeout(() => {
                slide.appendChild(clist[0]);
                slide.style.transition = "none";
                slide.style.top = "0";
            }, 400); /* //////////////// */
        }
        else {
            // console.log("왼");
            slide.insertBefore(clist[clist.length - 1], clist[0]);
            slide.style.top = "-100%";
            slide.style.transition = "none";
            /* 동일속성인 top가 같은 코딩처리공간에 있기 때문에 동시에 일어나는 것처럼 보임
            이것을 분리해야 효과가 있음 */
            setTimeout(() => {
                slide.style.top = "0";
                slide.style.transition = "top .3s ease-in-out";
            }, 0); /* //////////////// */
        } /* //////////////// */
        /* 2) 불릿 설정하기 */
        /* 2-1) 해당 순번에 불릿 색 입히기 */
        /* 현재 배너리스트 업데이트 */
        clist = slide.querySelectorAll("li");
        /* 2-2) 방향별 읽어올 슬라이드 순번으로 "data-seq"값을 읽어옴 */
        let cseq = clist[seq].getAttribute("data-seq");
        /* 오른쪽 클릭시 두번째 슬라이드, 왼쪽 클릭시 첫번째 슬라이드 순번 가져와야함 */
        /* 2-3) 불릿 초기화 */
        for (let x of indic)
            x.classList.remove("on");
        /* 2-4) 읽어온 슬라이드 순번의 불릿에 클래스 "on"넣기 */
        indic[cseq].classList.add("on");
    }; /* //////////////////// */
    /* 3. 대상에 이벤트 설정하기 */
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            /* 1) 인터벌지우기 함수 호출 */
            clearAuto();
            /* 2) 슬라이드함수 호출 */
            goSlide(idx);
        };
    });
    /* 자동 넘김 설정하기 */
    /* 일정 시간간격 넘어가기 -> setInterval함수 */
    /* 인터벌함수 함수 전달값 사용 예 - 타임아웃함수 역시 동일 */
    /* 1. 함수에 전달값이 없으면 함수명만 사용가능 */
    // setInterval(goSlide(1), 3000);
    /* 2. 전달값이 있다면 익명함수구역에 코딩 */
    // setInterval(function(){goSlide(1)}, 3000);
    /* 3. 화살표함수 사용가능 */
    // setInterval(()=>{goSlide(1)}, 3000);
    /* 4. 화살표함수에서 중괄호 생략 */
    // setInterval(()=>goSlide(1), 3000);
    /* 인터벌 함수 멈추기위한 변수 */
    let autoI;
    /* 타임아웃 함수 지우기위한 변수 */
    let autoT;
    /**
     * 함수명: autoSlide
     * 기능: 인터벌 함수로 슬라이드 함수 호출
     */
    function autoSlide() {
        autoI = setInterval(() => goSlide(1), 3000);
    }
    /* 자동넘김 최초호출 */
    autoSlide();
    /**
     * 함수명: clearAuto
     * 기능: 인터벌함수 지우고 다시세팅
     */
    function clearAuto() {
        /* 1. 인터벌 지우기 */
        clearInterval(autoI);
        /* 2. 타임아웃도 지우지 않으면 쌓여서 타임아웃 쓰나미 실행*/
        clearTimeout(autoT);
        /* 2. 잠시 후 다시 작동하도록 타임아웃 */
        setTimeout(autoSlide, 5000);
    }
}
export {};
//////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
