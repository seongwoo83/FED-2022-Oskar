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
        store.commit('resCheck');
        menuFn();
        $("#logo").click(() => (location.href = "index.html"));
    }
})