// 쇼핑몰 갤러리 JS - small.js


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
                        <span> EFGH 쇼핑몰 </span><br/>Shopping Mall
                    </strong>
                `,
}); ///////전역 컴포넌트 1

// Vue Instance 생성하기 : 반드시 컴포넌트 아래에서 생성
makeVue(".tit");

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
            gprice: this.insComma((Math.ceil(Math.random()*12300) * this.haha)) + `원`,
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
Vue.component("win-comp",{
    template:`
        <!-- 큰이미지 배경박스 -->
        <div id="bgbx">
            <!-- 오른쪽버튼 -->
            <a href="#" class="abtn rb">
                <span class="ir">오른쪽버튼</span>
            </a>
            <!-- 왼쪽버튼 -->
            <a href="#" class="abtn lb">
                <span class="ir">왼쪽버튼</span>
            </a>
            <!-- 닫기버튼 -->
            <a href="#" class="cbtn">
                <span class="ir">닫기버튼</span>
            </a>
            
            <!-- 큰이미지 박스 -->
            <div id="imbx">
                <!-- 큰 이미지 -->
                <img src="img_gallery/50.jpg" alt="큰 이미지">
                <!-- 이미지 설명 -->
                <h4></h4>
            </div>
        </div>
    `
});
// win-comp Vue 인스턴스 생성하기
new Vue({
    el:"#pbg",
    // DOM이 모두 로딩된 후 실행 구역
    mounted:function(){
        const regex = /[^0-9]/g;
        // 제이쿼리 기능구현
        // 1. 갤러리 리스트 클릭시 큰 이미지 박스 보이기
        // 대상: .grid>div
        $(".grid>div").on("click",function(e){
            e.preventDefault();
            let isrc = $(this).find("img").attr("src");
            let isrcNum = parseInt($(this).find("img").attr("src").replace(regex, ""));
            // 1) 클릭된 이미지 경로 읽어오기
            // 2) 클릭된 이미지 경로를 큰 이미지에 src로 넣기
            $("#imbx img").attr("src", isrc)
            $("#bgbx").fadeIn();
            $(".abtn").on("click",function(e){
                e.preventDefault();
                if($(this).index()===0){
                    isrcNum++;
                    if(isrcNum === 51) isrcNum=1;
                }else{
                    isrcNum--;
                    if(isrcNum === 0) isrcNum = 50;
                }
                $("#imbx img").attr("src",`img_gallery/${isrcNum}.jpg`);
                
            })
        })
        $(".cbtn").on("click",function(e){
            e.preventDefault();
            $("#bgbx").fadeOut();
        })
    }
})