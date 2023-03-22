// 모듈 연습 메인 JS

//로딩구역 없이..=> script 태그에 defer속성 사용하거나
// type="module" 사용할 경우 로딩구역 없어도 요소등 가져올 수 있음

// 모듈화 JS파일 import하기
// import { mTitle, sTitle } from "./textData.js";

//별칭 사용하기
import { mTitle as mTit, sTitle as sTit, personInfo as pInfo} from "./textData.js";

/*******************************************************
    [ import 형식 ]
    import 전달변수 from 파일경로;
    -> 반드시 가져올 모듈 JS에서 export를 해줘야함
    -> from뒤에 경로는 반드시 상대경로일 경우 같은 위치일지라도 "./" 표시를 꼭 해야함
    (/,  ./, ../ 표시 필수) 
    -> 모듈구성은 반드시 서버 형식으로 열어야 작동함
    (http://..) Live Server로 열기 때문에 볼 수 있음
    -> 로컬파일로 열면 작동하지 않음

    [ import 시 변수명 변경하기 : 별칭 사용하기 ]
    import { 전달변수 as 별칭} from 파일경로;
    예) import { mymymy as my} from 파일경로;
    -> 별칭 사용이유: 단순변경요구, 같은이름 변수 피하기


_________________________________________________
    [ 모듈화를 위한 구성 ]
    1. 데이터 처리하기위한 JS
    -> textData.js
    2. 구체적인 데이터 구성 처리를 위한 JS
    -> msgFormat.js
*******************************************************/

// 1. 타이틀 출력박스
const tpart : any= document.querySelector(".tpart");
// 2. 내용 츌력박스
const demo : any= document.querySelector("#demo");

console.log(tpart, demo);

// 3. 제목넣기
tpart.innerHTML =  `
    <h2>${mTit}</h2>
    <h3>${sTit}</h3>
`;