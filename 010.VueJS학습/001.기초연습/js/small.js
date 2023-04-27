// 쇼핑몰 갤러리 JS - small.js

import hcode from "./hcode.js";
//  Vue JS  인스턴스 생성용 함수
const makeVue = (x) => {
    new Vue({
        el: x,
    });
};

// 1. 제목에 넣을 전역 컴포넌트 만들기
Vue.component("tit-comp", {
    template: hcode.tit,
}); ///////전역 컴포넌트 1

// Vue Instance 생성하기 : 반드시 컴포넌트 아래에서 생성
makeVue(".tit");

//  숫자 증감 변수
let num = Math.random() * 52000;
// 2. 갤러리 리스트에 넣을 전역 컴포넌트 만들기
// 여기가 '자식' 요소 임
Vue.component("list-comp", {
    // v-on:click="goPapa"로 부모이벤트 호출
    template: hcode.list,
    // 부모에서 v-bind:속성명=값 으로 전달한 속성변수를  props:[]/{}로 받음
    props: ["haha", "myseq", "endlet"],
    // props:{"haha" : Number}, -> 자료형이 맞음
    // props:{"haha" : String}, -> 자료형 오류 메시지 나옴
    // 컴포넌트 내부의 data 속성
    data: function () {
        return {
            // 1.상품 이미지 경로
            gsrc: `img_gallery/${this.haha}.jpg`,
            // 2. 상품명
            gname: `Sofia23` + this.haha + this.endlet + "-" + (this.myseq % 2),
            // 3. 단위가격(원가격)
            gprice: this.insComma(Math.ceil(num) * this.haha) + `원`,
            // 4. 할인가격: 30% 할인된가격(0.7)
            sale: this.insComma(Math.round(Math.ceil(num) * this.haha * 0.7)) + `원`,
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
            // alert("자식이 부모이벤트 전달 성공");
        },
        ovMsg() {
            // console.log("오버! 오케이");
        },
    },
});

// 큰 이미지 보기 배경박스 컴포넌트
Vue.component("win-comp", {
    template: hcode.big,
});
// win-comp Vue 인스턴스 생성하기
new Vue({
    el: "#pbg",
    // DOM이 모두 로딩된 후 실행 구역
    mounted: function () {
        
        // 공유번호변수
        let nowNum = 1;
        
        // 1. 갤러리 리스트 클릭시 큰이미지박스 보이기
        $(".grid>div").click(function (e) {
            console.log(this);
            // 1. 클릭된 이미지 경로 읽어오기
            let isrc = $(this).find("img").attr("src");

            // 2. 클릭된 이미지 경로를 큰 이미지에 src로 넣기
            $(".gimg img").attr("src", isrc);
            
            // 3. 큰이미지박스 보이기
            $("#bgbx").show();
            
            // 4. 다음/이전 이미지 변경을 위한 data-num속성읽기
            nowNum = $(this).attr("data-num");
            console.log("현재이미지번호:", nowNum);

            // 5. 상품명 읽어오기
            setVal();
        }); /////////// click ////////
        
        // 상품명/가격 등 데이터 읽어오기 세팅 함수
        function setVal(){
            const tg = $(`.grid>div[data-num=${nowNum}]`);
            // 5-1 상품명/가격 큰 박스에 넣기
            $("#gtit, #gcode").text(tg.find("h2").text());
            $("#gprice,  #total").text(tg.find("h3").text());
        }
        
        
        // 2. 닫기버튼 클릭시 큰이미지박스 숨기기
        $(".cbtn").click(function (e) {
            e.preventDefault();
            // 큰이미지박스 숨기기
            $("#bgbx").hide();
        }); /////////// click /////////
        
        // 3. 이전/다음버튼 클릭시 이미지변경하기
        $(".abtn").click(function (e) {
            // 1. 기본이동막기
            e.preventDefault();
            // 2. 오른쪽버튼 여부
            let isB = $(this).is(".rb");

            // 3. 분기하기
            if (isB) {
                // 오른쪽버튼
                nowNum++;
                setVal();
                if (nowNum === 51) nowNum = 1;
            } else {
                // 왼쪽버튼
                nowNum--;
                setVal();
                if (nowNum === 0) nowNum = 50;
            }
            
            console.log("변경된nowNum:", nowNum);
            
            // 4. 큰 이미지 변경하기
            $(".gimg img").attr("src", `img_gallery/${nowNum}.jpg`);
        }); ////////// click ////////////


        // const regex = /[^0-9]/g;
        // // 제이쿼리 기능구현
        // // 1. 갤러리 리스트 클릭시 큰 이미지 박스 보이기
        // // 대상: .grid>div
        // $(".grid>div").on("click", function (e) {
        //     e.preventDefault();
        //     let isrc = $(this).find("img").attr("src");
        //     let isrcNum = parseInt($(this).find("img").attr("src").replace(regex, ""));
        //     // 1) 클릭된 이미지 경로 읽어오기
        //     // 2) 클릭된 이미지 경로를 큰 이미지에 src로 넣기
        //     $(".gimg img").attr("src", isrc);
        //     $("#bgbx").fadeIn();
        //     $(".abtn").on("click", function (e) {
        //         e.preventDefault();
        //         if ($(this).index() === 0) {
        //             isrcNum++;
        //             if (isrcNum === 51) isrcNum = 1;
        //         } else {
        //             isrcNum--;
        //             if (isrcNum === 0) isrcNum = 50;
        //         }
        //         $(".gimg img").attr("src", `img_gallery/${isrcNum}.jpg`);
        //     });
        // });
        // $(".cbtn").on("click", function (e) {
        //     e.preventDefault();
        //     $("#bgbx").fadeOut();
        // });
        // [ 제이쿼리 기능구현 ]
    },
});
