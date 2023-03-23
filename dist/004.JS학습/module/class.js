"use strict";
/**********************************************
[ JS 클래스란? ]

1. ES6버전에서 JS 클래스가 도입됨!
2. JS 클래스는 JS 객체용 템플릿이다!
3. JS 클래스는 객체가 아니다! 함수의 일종이다!
4. JS 객체를 위한 템플릿이다!
5. 클래스는 엄격모드("use strict")에서 사용된다!
(만약 엄격모드를 설정하지 않으면 class를 사용하는
JS는 자동으로 엄격모드로 적용된다!)
____________________________________

(참고: 엄격모드란 JS를 좀더 엄격하게 문법적용을
하도록 지정하는 방법이다!)
-> https://www.w3schools.com/js/js_strict.asp
예) 선언없이 사용하는 변수에 에러처리
______________________________________

((클래스 구문))

class ClassName {
    constructor(){...}
}

-> 기본적으로 클래스안에
constructor() 메서드를 필수로 생성함!
객체의 속성을 셋팅하는 역할을 한다!
-> 일명 속성셋팅 메서드라고도 함!!
-> 공식명칭은 생성자 메서드!!!

************************************

((클래스 메서드))

class ClassName {
    constructor(){...}
    method_1(){...}
    method_2(){...}
    method_3(){...}
}

-> 메서드를 추가해서 만들 경우
constructor() 메서드 아래에 하나씩 생성한다!
______________________________________

클래스로 생성할 객체모델:

(constructor()메서드 안에 구현)
1. 속성5가지
- 포스터, 제목, 개요, 감독, 출연, 문구

(메서드를 constructor()아래쪽에 생성)
2. 메서드 1가지
- 실행할 메서드

{
    포스터:"",
    제목:"",
    개요:"",
    감독:"",
    출연:"",
    문구:"",
    함수:function(){코드}
}

**********************************************/
/* 클래스로 객체 생성 템플릿 만들기 */
class MovieInfo {
    constructor(pos, tit, sum, dir, act, des) {
        this.포스터 = pos;
        this.제목 = tit;
        this.개요 = sum;
        this.감독 = dir;
        this.출연 = act;
        this.문구 = des;
    }
    // 내가 만들고자 하는 메서드는 아래에 따로 생성해준다
    메서드(msg) {
        //msg 응원메시지 전달 변수
        return `영화 ${this.제목}의 감독님 이름은 ${this.감독}입니다,
        나의 응원은 ${msg}`;
    }
} /* ######### clss########## */
// 클래스는 함수와 달리 호이스팅이 불가능함
// 만들고 아래에서 호출 가능
// 클래스의 데이터형?
console.log(typeof MovieInfo);
document.write("<h1>JS5-6.1.JS클래스</h1>");
//영화정보 배열
const mi = [];
//1. 생성자 함수로 객체 만들기
mi[0] = new MovieInfo("https://movie-phinf.pstatic.net/20230216_8/16765083584990ol68_JPEG/movie_image.jpg?type=m203_290_2", "앤트맨과 와스프: 퀀텀매니아", "액션", "페이튼 리드", "폴 러드(스캇), 에반젤린 릴리(호프)", "사랑해 땅콩");
mi[1] = new MovieInfo("https://movie-phinf.pstatic.net/20221215_185/1671091761840XXpCR_JPEG/movie_image.jpg?type=m203_290_2", "아바타: 물의 길", "액션, 모험, SF, 스릴러", "제임스 카메론", "조 샐다나(네이티리), 샘 워싱턴(제이크 설리),", "아들엔 아들이야");
// 2. 생성자 함수로 만든 객체 확인하기
console.log("mi[0] 할당객체: ", mi[0]);
console.log("mi[1] 할당객체: ", mi[1]);
//3.  만들어진 객체 화면에 출력 : 객체는 for in 문 사용
// 객체가 담긴 mi 배열은 for of문 사용
// html 변수
let hcode = "";
for (let x of mi) {
    hcode += `<ul>`;
    hcode += `
                    <li><h2>제목: ${x.제목}</h2></li>
                    <li><img src="${x.포스터}" alt="${x.제목}포스터"></li>
                `;
    hcode += "</ul>";
    //메서드 찍어보기                
    console.log(x.메서드("대단합니다"));
}
document.write(hcode);
