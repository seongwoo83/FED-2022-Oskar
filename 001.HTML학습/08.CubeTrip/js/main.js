// 큐브트립 메인 JS ///////////////////////

/** 
 *  TODO [ 구현 요구사항 ]
 *  - 도시별 메뉴버튼을 클릭시 해당도시의 데이터를 큐브회전 후 도시와 매칭하여 정보를 화면에 출력함
 * 
 */


/************************ 로딩구역 ************************/
window.addEventListener("DOMContentLoaded", loadFn);

//########### 로드함수 ##############
function loadFn() {
    console.log("로딩완료");
    
    /* ⁡⁢⁣⁢1. 대상선정⁡ */
        /* ⁡⁣⁣⁢1-1 이벤트 대상: .city a⁡ */
        const menu = document.querySelectorAll(".city a");
        /* ⁡⁣⁣⁢1-2 변경대상1: .cube⁡ */
        const cube = document.querySelector(".cube");
        /* ⁡⁣⁣⁢1-3 변경대상2: .cbx⁡ */
        const cbx = document.querySelector(".cbx");
        /* ⁡⁣⁣⁢1-4 변경대상3: .cname⁡ */
        const cname = document.querySelector(".cname");
        /* ⁡⁣⁣⁢1-5 변경대상4: .ci⁡⁣⁣⁢nfo⁡⁡ */
        const cinfo = document.querySelector(".cinfo");

    /* ⁡⁢⁣⁢2. 메뉴에 클릭이벤트 설정하기⁡ */
    /* for of 문 */
    for(let x of menu){
        /* 1. 클릭이벤트 설정 */
        x.onclick = ()=>{
            /* ⁡⁣⁣⁢0) 도시 정보 박스 숨기기 ⁡⁣⁣⁢(트랜지션 없애기)⁡⁡*/
            cbx.style.opacity = 0;
            cbx.style.transition = "none";
            /* 도시정보 스크롤 생길경우 내려놓고 다른도시 가면 스크롤 위치가 내려가있기 떄문에 맨위로 세팅하기 */
            cinfo.scrollTo(0,0);

            /* ⁡⁣⁣⁢1) 메뉴 텍스트 읽기⁡ */
            let mtxt = x.innerText;
            
            /* ⁡⁣⁣⁢2) 회전값 세팅하기⁡ */
            /* 회전값 변수 */
            let setval;
            switch(mtxt){
                case "출발": setval = "rotateX(0deg) rotateY(0deg)"; break;
                case "서울": setval = "rotateX(-90deg) rotateY(-360deg)"; break;
                case "런던": setval = "rotateX(360deg) rotateY(-90deg)"; break;
                case "베를린": setval = "rotateX(-360deg) rotateY(90deg)"; break;
                case "파리": setval = "rotateX(720deg) rotateY(-180deg)"; break;
                case "뉴욕": setval = "rotateX(450deg) rotateY(360deg)"; break;
                default: setval = "rotateX(0deg) rotateY(0deg)";
            }
            
            /* ⁡⁣⁣⁢3) 회전값 적용하기⁡ */
            cube.style.transform = setval;
            cube.style.transition = "transform 1.5s ease-in-out";

            /* ⁡⁢⁣⁢만약 "출발"을 클릭한 경우 아래 코드 실행 안하기⁡ */
            if(mtxt === "출발")return; //return키워드는 함수를 빠져나감

            /* ⁡⁣⁣⁢4. 도시 정보 세팅하기⁡ */
            /* data.js에 세팅된 객체의 속성값이 메뉴의 도시명과 같다. 따라서 이 속성명으로 값을 가져와서 .cbx에 출력함 */
            /* 변경대상1: .cname - 도시명 */
            cname.innerText = mtxt;
            /* 변경대상2: .cinfo - 도시정보 */
            cinfo.innerText = city[mtxt];

            /* ⁡⁣⁣⁢5. 도시 정보 박스 보이기⁡ */
            /* 대상: .cbx */
            /* 변경내용: 큐브 1.5초간 회전후 도시 정보 박스 보여야 함 */

            setTimeout(() => {
                cbx.style.opacity = 1;
                cbx.style.transition = "opacity .8s ease-in-out";
            }, 1500);
        };
    }
}/************************ 로딩구역 ************************/



