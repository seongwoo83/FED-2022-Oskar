"use strict";
// 데이터 처리하기 위한 JS
Object.defineProperty(exports, "__esModule", { value: true });
exports.personInfo = exports.sTitle = exports.mTitle = void 0;
// 1. 중제목 데이터
const mTitle = "모듈을 이용한 구현";
exports.mTitle = mTitle;
// 2. 소제목 데이터
const sTitle = "이것은 리액트의 기초입니다.";
exports.sTitle = sTitle;
// 3. 사람데이터
const personInfo = [
    ["준현", 23],
    ["정희", 33],
    ["성락", 45],
    ["진경", 22]
];
exports.personInfo = personInfo;
/*****************************************
    export 형식:
    1. export{변수, 변수, 변수}
    -> 여러개의 변수를 내보낼 경우 사용
    2. export default 변수;
    -> 단일한 변수를 내보낼 경우 사용
    -> default 단 하나의 변수만 내보내는 형식 제한
*****************************************/ 
