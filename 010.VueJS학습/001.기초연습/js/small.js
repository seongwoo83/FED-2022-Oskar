// 쇼핑몰 갤러리 JS - small.js

/******************************************
                [컴포넌트 데이터 전달 / 이벤트 호출]
                1. 부모자식 구분하기
                    1) 부모: 뷰 인스턴스 및 html 뷰대상요소
                        -> 뷰 대상요소 내부의 사용자 정의 태그
                    2) 자식: 뷰 컴포넌트 인스턴스
                    
                2. 부모의 변수를 자식에게 전달하기
                    1) props down: 속성으로 전달하고 props로 받기
                    2) 구현방법:
                        (1) 부모 사용자 정의 태그에 v-bind:내속성=값
                            설정한 후
                        (2) 자식 컴포넌트 인스턴스 옵션에 
                            props: [속성변수명, ..]
                            또는
                            props: {속성변수명: 자료형, ...}
                            -> 배열로 값을 세팅하면 자료형 무관, 객체로 값을 세팅하면
                                자료형 필터링
                            
                        -> 주의사항: 부모로부터 받은 데이터변수는 값을 새로 할당하여
                                            변경할 수 없다.

                3. 자식 컴포넌트에서 부모의 이벤트 호출하기
                    1)  $emit 으로 전달하고 2-1~2-3
                    on이벤트 설정으로 받음 2-4~2-5
                    2) 구현방법:
                        (1) 자식 컴포넌트 템플릿에서 
                            v-on:이벤트명=자식메서드 형태로 쓴 후
                        (2) 자식 컴포넌트 methods에 이벤트에 쓴 자식
                            메서드를 만들고
                        (3) this.$emit(부모가 만든 이벤트명)으로 전달
                        (4) 부모 태그에서 v-on:부모가만든이벤트명=부모메서드 형태로 쓴후
                        (5) 부모의 Vue 인스턴스 methods에 같은 이름의 메서드를 만들고
                            기능을 구현함
            ******************************************/

//  Vue JS  인스턴스 생성용 함수
const makeVue = (x) => {
    new Vue({
        el: x,
    });
};

// 1. 제목에 넣을 전역 컴포넌트 만들기
Vue.component("tit-comp", {
    template: `
                    <strong>
                        <span>Vue JS 컴포넌트 : </span>
                         쇼핑몰 갤러리 리스트
                    </strong>
                `,
}); ///////전역 컴포넌트 1

// Vue Instance 생성하기 : 반드시 컴포넌트 아래에서 생성
makeVue(".tit");
makeVue(".tit2");

//  숫자 증감 변수
let num = 0;
// 2. 갤러리 리스트에 넣을 전역 컴포넌트 만들기
// 여기가 '자식' 요소 임
Vue.component("list-comp", {
    // v-on:click="goPapa"로 부모이벤트 호출
    template: `
                    <div>
                        <img v-bind:src="gsrc" v-on:click="goPapa" v-on:mouseover="ovNow" alt="dress">
                        <aside>
                            <h2 v-text="gname"></h2>
                            <h3>{{gprice}}</h3>
                        </aside>
                    </div>
                    `,
    // 부모에서 v-bind:속성명=값 으로 전달한 속성변수를  props:[]/{}로 받음
    props: ["haha", "myseq", "endlet"],
    // props:{"haha" : Number}, -> 자료형이 맞음
    // props:{"haha" : String}, -> 자료형 오류 메시지 나옴
    // 컴포넌트 내부의 data 속성
    data: function () {
        return {
            gsrc: `img_gallery/${this.haha}.jpg`,
            gname: `Sofia23` + this.haha + this.endlet + "-" + (this.myseq % 2),
            gprice: this.insComma((123000 * this.haha) / 4) + `원`,
        };
    },
    //  컴포넌트 내부 메서드 세팅
    methods: {
        //  부모 이벤트 호출하기 : $emit() 메서드 사용
        goPapa() {
            // $emit(부모가 만든 이벤트명)
            this.$emit("hull");
        },
        ovNow() {
            this.$emit("gotkimchi");
        },

        //정규식함수(숫자 세자리마다 콤마해주는 기능)
        insComma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
}); //////////// 전역 컴포넌트 2

// 리스트 Vue 인스턴스 생성하기
// 여기가 '부모' 요소임
new Vue({
    el: ".grid",
    // 부모 Vue인스턴스 메서드 생성
    methods: {
        // 자식이벤트 전달후 실행 메서드
        goMsg() {
            alert("자식이 부모이벤트 전달 성공");
        },
        ovMsg() {
            console.log("오버! 오케이");
        },
    },
});
/* 
    [ 뷰JS 출력 ]
    mustache : 
    {{ expression }}문법을 사용해서 특정 변수를 그대로 렌더링한다.

    v-text : 
    특정 태그내에서 사용할 수 있으며 v-text속성을 사용해서 "텍스트"로 렌더링한다. 
    이 때 렌더링된 텍스트는 해당 태그의 자식 노드로 들어간다.

    v-html : 
    특정 태그내에서 사용할 수 있으며 v-html속성을 사용해서 "html"로 렌더링한다. 
    이 때 렌더링된 텍스트는 해당 태그의 자식 노드로 들어간다.

    v-bind : 
    특정 태그내에서 사용할 수 있으며 v-bind문법을 사용해서 vue내부의 값
    (data, props, computed, methods)들의 값을 해당 속성의 값으로 렌더링한다.
*/
