window.addEventListener("DOMContentLoaded", setBan);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(.slide)
    4. 기능 설계:
        -> left 이동의 기준값이 -220% 인것이 포인트
        (이유: 2장의 슬라이드가 앞에 나가있음. 잘라내는 것이 숨겨져야 함)

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -330%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -220%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

function setBan(){
    /* 1. 호출확인 */
    console.log("배너야");

    /* 2. 대상선정: .bancont */
    const  bancont = document.querySelector(".bancont");

    /* 3. 태그 구성하기 */
    /* 태그 변수 */
    let hcode = `<ul class="slide">`;

    for(let i = 1; i <= 13; i++){
        hcode += `
            <li>
                <img src="./nav06/img_nav06/ban${i}.png" alt="배너 이미지">
            </li>
        `;
    }
    hcode +=`</ul>`;
    bancont.innerHTML = hcode;

    /*  슬라이드 기본기능 구현 */

    let slist = document.querySelectorAll(".slide li");
    const abtn = document.querySelectorAll(".abtn");
    const slide = document.querySelector(".slide");
    const indic = document.querySelectorAll(".indic li");

    slist.forEach((ele, idx) => {
        ele.setAttribute("data-seq", idx);
    });

    let prot = 0;

    const goSlide = (seq) => {
        if (prot) return;
        prot = 1;
        setTimeout(() => {
            prot = 0;
        }, 400);
        let clist = slide.querySelectorAll("li");
        if (seq) {
            slide.style.left = "-360%";
            slide.style.transition = ".4s ease-in-out";
            clist.forEach((ele) => ele.classList.remove("on"));
            setTimeout(() => {
                slide.appendChild(clist[0]);
                clist[3].classList.add("on");
                slide.style.transition = "none";
                slide.style.left = "-240%";
            }, 400);
        } else {
            slide.insertBefore(clist[clist.length - 1], clist[0]);
            clist.forEach((ele) => ele.classList.remove("on"));
            slide.style.left = "-360%";
            slide.style.transition = "none";
            setTimeout(() => {
                slide.style.left = "-240%";
                slide.style.transition = ".4s ease-in-out ";
            }, 0);
            setTimeout(() => {
                clist[2].classList.add("on");
            }, 400);
        }

        clist = slide.querySelectorAll("li");
        let cseq = clist[seq].getAttribute("data-seq");

        for (let x of indic) x.classList.remove("on");

        indic[cseq].classList.add("on");
    };

    abtn.forEach((ele, idx) => {
        ele.onclick = (e) => {
            e.preventDefault();
            // clearAuto();
            goSlide(idx);
        };
    });

    let autoI;
    let autoT;

    function autoSlide() {
        autoI = setInterval(() => goSlide(1), 3000);
    }

    // autoSlide();

    function clearAuto() {
        clearInterval(autoI);
        clearTimeout(autoT);
        autoT = setTimeout(autoSlide, 5000);
    }
}
