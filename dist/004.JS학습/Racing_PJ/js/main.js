// Racing PJ 메인 JS - main.js
/* 요소 선택함수 */
const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);
//////////////// 로드구역 /////////////////////////
window.addEventListener("DOMContentLoaded", () => {
    console.log("로딩완료!");
    /* *********************************
        [ 게임기능 정의 ]
        1. 게임룰: 거북버튼 클릭하여 거북을 왼쪽에서 오른쪽으로 이동함. 이때 토끼는 자동으로 이동하여 결승선에ㅐ 먼저 도달하는 레이서가 승리
        2. 토끼의 이동속도는 레벨로 설정함
        3. 결승선 도착은 둘중 하나가 먼저 도착할 경우 판별함수에서 결과를 화면에 출력함
        4. 포커스가 버튼에 갈 경우 마우스가 아닌 키보드 버튼으로 조작할 수 없게 함(마우스만 사용하도록 함)
        5. 기본적으로 거북이동버튼 클릭시 토끼는 자동으로 작동됨
        6. 토끼이동버튼은 토끼만 미리 작동가능
        7. 처음으로 버튼은 전체 기능 리셋
    **********************************/
    /* 1. 대상선정 */
    /* 1) 거북: #t1 */
    const t1 = qs("#t1");
    /* 2) 토끼: #r1*/
    const r1 = qs("#r1");
    /* 3) 버튼: #btns a */
    const btns = qsa("#btns a");
    /* 4) 레벨: #level */
    const level = qs("#level");
    /* 5) 메세지: #msg */
    const msg = qs("#msg");
    /* 6) 토끼, 거북 위치값 변수 */
    let r1pos = 0, t1pos = 0;
    /* 2. 이벤트 설정하기 */
    /* 대상: 버튼들 - btns변수 */
    btns.forEach((ele) => {
        /* 1) 이벤트 설정 */
        ele.onclick = e => {
            /* (0) 기본기능 막기 */
            e.preventDefault();
            /* (1) 버튼 종류확인: 버튼텍스트 */
            let btxt = ele.innerText;
            console.log(btxt);
            /* (2) 버튼별 기능분기 */
            /* (2-1) 토끼이동 */
            if (btxt === "토끼출발") {
                /* 위치이동하기 */
                goR1();
            }
            /* (2-2) 거북이동 */
            else if (btxt === "거북출발") {
                /* 거북멈춤상태값(t1Stop)이 1이면 함수 나가기 */
                if (t1Stop)
                    return;
                t1pos += 16;
                t1.style.left = (++t1pos) + "px";
                /* 거북버튼 클릭시 포커스가 들어가므로 키보드 엔터버튼 비활성화 필요 매번 포커스를 빼야함 */
                ele.blur();
                /* blur()메서드 - 포커스가 사라짐 */
                /* focus()메서드 - 포커스가 들어감 */
                goR1();
            }
            /* (2-3) 처음으로 */
            else if (btxt === "처음으로") {
                /* 브라우저 캐싱을 지우고 다시 부르기 */
                // location.replace("index.html");
                /* 현재 페이지 리로딩 */
                location.reload();
            }
        };
    });
    /* ******************************************
        함수명: goR1()
        기능: 토끼자동이동(인터벌함수)
    *******************************************/
    /* 인터벌용 함수 */
    let autoI;
    function goR1() {
        /* 할당되지 않은 변수는 undefined이고 if문에서 false 처리되므로 할당전 상태일때만 if문에 들어가게 하기 위해 '!' 연산자를 사용하면 됨 */
        if (!autoI) {
            autoI = setInterval(() => {
                r1.style.left = (++r1pos) + "px";
                whoWinner();
            }, level.value);
            /* 인터벌 시간은 선택박스의 옵션값을 읽어서 사용함 */
        }
    }
    /* ******************************************
        함수명: whoWinner();
        기능: 기준값보다 레이서 위치값이 큰경우 승자를 판별하여 메세지를 보여줌
    *******************************************/
    let t1Stop = 0; /* 거북 멈춤값 1이면 머머묾ㅁ 횢ㄴㅂ */
    function whoWinner() {
        /* 1) 토끼 / 거북의 위치값이 기준값 이상일때 */
        /*  기준값: 650px*/
        if (r1pos >= 650 || t1pos >= 650) {
            /* 거북멈춤 상태값(t1Stop=1)이면 함수 나가기 */
            /* (1) 토끼 멈추기 */
            clearInterval(autoI);
            /* (2) 거북 멈추기 */
            t1Stop = 1;
            /* (3) 승자판별후 메시지 보여주기 */
            if (r1pos > t1pos)
                msg.innerText = msgtxt.토끼[rnum];
            else if (r1pos < t1pos)
                msg.innerText = msgtxt.거북[rnum];
            else
                msg.innerText = "비김! 재승부!";
            /* (4) 메시지 보이기 */
            msg.style.display = "block";
            msg.style.zIndex = "101";
            /* (5) 전체 반투명 암전주기 */
            const cover = qs(".cover");
            cover.innerHTML += `<div style="position:fixed; top:0; left:0; width:100vw; height:100vh; background-color: #000; opacity:0.5; z-index:100;"></div>`;
            /* 주의사항:  body 하위에 새로운 요소를 추가하면 전체 body 직계하에에 있는 요소들에 세팅된 이벤트가 소실됨 -> DOM이 재구조화 되기 때문 */
            /* 처음부터 편성된 박스에 넣어주면 이 문제가 해결됨 */
            /* (6) 버튼 위로 올리기 */
            qs("#btns").style.zIndex = "200";
        }
    }
    /* 메시지 변수 */
    const msgtxt = {
        "토끼": ["역시, 토끼가 이겼군", "넌 안돼! 오~ 노노노! 토끼 승!", "토끼는 잠자고 가도 이겨"],
        "거북": ["넌 뭐니? 토끼야? 내가 승!", "대대로 거북이 이겼단다!", "이제 넌 어쩌니? 토끼퇴출"],
    };
    const rnum = Math.floor(Math.random() * msgtxt.토끼.length);
}); /////////// 로드구역 ///////////////////////////
export {};
