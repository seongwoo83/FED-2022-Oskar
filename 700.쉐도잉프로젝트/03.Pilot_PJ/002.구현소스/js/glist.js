// 전체 리스트 페이지 JS

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-glist.js";
// 전체 리스트용 라우터 JS 가져오기
import router from "./glist-router.js";

// 뷰엑스 스토어 JS 가져오기
import store from "./glist-store.js";

// 1. 뷰 템플릿 만들기
//###### 상단영역 메뉴 뷰 템플릿 셋팅하기 #######
// Vue.component(내가지은요소명,{옵션})
Vue.component("top-comp", {
    template: comData.tarea,
    methods: {},
}); ////////// 상단영역 Vue component //////////

//###### 하단영역 메뉴 뷰 템플릿 셋팅하기 #######
Vue.component("foot-comp", {
    template: comData.barea,
}); ////////// 하단영역 Vue component //////////

// 2. 뷰 인스턴스 생성하기
new Vue({
    el:".wrap",
    store,
    router,
    mounted(){
        // 라우터 강제 실행하기
        this.$router.push('/glist');
        // push(실행할 vue router 경로)
        
        // 최초 체크박스 메서드 실행해야 리스트 나옴!
        store.commit('resCheck');
        menuFn();
        $("#logo").click(() => (location.href = "index.html"));

        // 페이지 로딩 시 로컬 데이터 cart에 데이터가 있으면 카트 이미지 버튼 보여주기
        if(localStorage.getItem("cart") != null){
            // null이 아닌 경우에 length를 체크 하여 0이 아니면  cart 버튼 출력하기
            if(localStorage.getItem("cart").length != 0){
                let org = localStorage.getItem("cart");
                org = JSON.parse(org);
    
                // 카트버튼 애니 메서드 호출
                store.commit('cartAni', {cnt: org.length, opt: 0});
                // 애니메서드 파라미터
                // cnt - 카트아이템 개수
                // opt - 세팅 옵션번호(초기 css값 선택 옵션) - 0( 오른쪽 위 작게 ) / 1(정중앙 크게)
            }
        }
    }
})