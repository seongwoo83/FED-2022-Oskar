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
let num = Math.ceil(Math.random()*38000);
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
            // 3. 단위가격(원가격 화면 표시용)
            gprice: this.insComma(num * this.haha) + `원`,
            // 4. 단위가격(숫자만: data-price 속성에 넣음)
            orgprice: num * this.haha,
            // 4. 할인가격: 30% 할인된가격(0.7)
            sale: this.insComma(Math.round(num * this.haha * 0.7)) + `원`,
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
        // 세일표시 리턴 메서드
        condiRet(){
            return this.haha%3 == 0;
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
        // 공유가격변수
        let orgprice = 0;
        
        // 1. 갤러리 리스트 클릭시 큰이미지박스 보이기
        $(".grid>div").on("click", function (e) {
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
            // 5-1 상품명 큰 박스에 넣기
            // 6.가격변경 세팅을 위한 원가격 세팅
            orgprice = tg.find("h3>span:first").attr("data-price");
            
            // 세일 적용일 경우 세일가격으로 업데이트
            if(tg.find("h3>span:first").is(".del")){
                orgprice = Math.round(orgprice * 0.7);
            }
            console.log(orgprice);
            $("#gtit, #gcode").text(tg.find("h2").text());
            // 5-2 상품가격 큰 박스에 넣기
            // 세일인 경우와 아닌경우 나누기
            if(tg.find("h3 span").hasClass("del")){
                $("#gprice,  #total").html(`<small>30% 세일! =></small>`+ insComma(orgprice) + "원"
                // tg.find(".sale").text()
                );
            }else{
                $("#gprice,  #total").text(insComma(orgprice) + "원"
                    // tg.find("h3").text()
                    );
            }
        }

        //정규식함수(숫자 세자리마다 콤마해주는 기능)
        function insComma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        
        // 2. 닫기버튼 클릭시 큰이미지박스 숨기기
        $(".cbtn").on("click", function (e) {
            e.preventDefault();
            // 큰이미지박스 숨기기
            $("#bgbx").hide();
        }); /////////// click /////////
        
        // 3. 이전/다음버튼 클릭시 이미지변경하기
        $(".abtn").on("click", function (e) {
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

        // [수량 증감 버튼 클릭시 데이터 반영하기]
        // 대상: .chg_num img
        // 변경대상: input#sum
        const sum = $("input#sum");
        $(".chg_num img").on("click", function(){
            // 1. 클릭된 버튼 구분하기
            let isB  = $(this).attr("alt");
            console.log("버튼 구분: ", isB);
            // 2. 현재값 읽어오기
            let isV = Number(sum.val());
            console.log("현재값: ", isV);
            // 3. 분기하기
            if(isB === "증가"){
                isV++;
                sum.val(isV);
            }else{
                isV--;
                if(isV === 0) isV = 1;
                sum.val(isV);
            }

        })




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
    },
});
