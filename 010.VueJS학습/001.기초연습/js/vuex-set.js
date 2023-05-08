// 뷰ex 스토어 구현 JS

import store from "./store.js"

// 중요!!!뷰 인스턴스에서 스토어를 사용할 수 있게 등록해줘야 함
// 등록 방법: new Vue({el:"", store, methods:{}})
//  -> 스토어 변수를 인스턴스 내부에 작성해주면 됨


/* [1] 컴포넌트 세팅하기 */
// 1. 상단영역 컴포넌트 세팅
Vue.component("top-area",{
    template:`
        <header>
            <ul class="gnb">
                <li>
                    <a href="#" v-on:click="chgData('서울')">서울</a>
                </li>
                <li>
                    <a href="#" v-on:click="chgData('부산')">부산</a>
                </li>
                <li>
                    <a href="#" v-on:click="chgData('제주')">제주</a>
                </li>
            </ul>
        </header>
    `,
    data(){
        return{}
    },
    methods:{
        // 스토어 변수 업데이트 메서드
        chgData(pm){
            console.log("업데이트",pm);
            // 이 자리에서 바로 스토어변수를 업데이트 한다
            // 1. 이미지 변수: imgsrc
            store.state.imgsrc = store.state.cityData[pm].이미지;
            // 2. 도시설명 변수: desc
            store.state.desc = store.state.cityData[pm].설명;
        }
    }
})
// 2. 메인영역 컴포넌트 세팅
Vue.component("main-area",{
    // 뷰 인스턴스 내부 속성에서 전역변수를 부를때는 $ 를 붙임
    // 예) 뷰엑스 스토어 전역변수는 $store
    // 스토어 변수 내부접근은 영역까지 모두 써준다
    // 예) store.state.imgsrc
    // 뷰엑스 스토어의 변수 store를 전역 표시 $store라고 표기해야 유효함.
    // 더 정확한 문법은 this.$store 라고 작성해야 하지만 이 파일이 일반 JS에서 실행되므로
    // 변수 할당된 뷰 인스턴스 영역안에서 실행되므로 인스턴스 자신인 this를 쓰지 않아도
    // 자동적으로 this.$로 처리된다.
        template:`
        <main>
            <img v-bind:src="$store.state.imgsrc" alt="지역이미지">
            <p v-text="$store.state.desc"></p>
        </main>
    `,
    data(){
        return{}
    },
    methods:{

    }
})
// 3.하단영역 컴포넌트 세팅
Vue.component("info-area",{
    template:`
        <footer>
            <address>
                서울시 강남구 역삼동 119
            </address>
        </footer>
    `,
    data(){
        return{}
    },
    methods:{

    }
})


/* [2] 뷰 인스턴스 생성하기 */
new Vue({
    el:"#app",
    store,
    data:{
        // 변수:값
    },
    methods:{
        // 메서드(){}
    },
    created(){
        // 스토어에 있는 initSet  메서드는 어떻게 호출 하나?
        // 스토어 호출 메서드
        // store.commit("메서드명", 파라미터 값)
        // 1. 메서드명은 반드시 문자형으로 입력함
        // 2. 파라미터는 단일값 또는 객체형식으로 입력함
        // 인스턴스 내부 부를 때 $ 표시 없음
        // store.commit("initSet", "https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg");
        store.commit("initSet", {
            url:"https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg",
            txt:"도시소개에 오신 것을 환영합니다."
        });
        // actions메서드 호출하기: dispatch("메서드명", 전달변수)
        store.dispatch("myAct", "나야나");
    },
    // 데이터 세팅은 언제 하면 좋을까?
    // created? mounted?
    // DOM에 직접 관여하는 데이터가 아니고 순수 데이터일 때는 처음 뷰 인스턴스가 생성된 후인 created 메서드 구역에 세팅하자
    mounted(){
        // 제이쿼리는 DOM에 직접 사용하므로 mounted구역에 작성함
        // 링크 클릭시 a에 클래스 on 주기
        $(".gnb a").on("click", function(){
            $(this).addClass("on").parent().siblings().find("a").removeClass("on")
            showBx();
        });
        function showBx(){
            $("main img").css({opacity:0}).stop().delay(500).fadeTo(500,1).siblings().css({opacity:0}).stop().delay(1000).fadeTo(500,1);
        }
    }
})