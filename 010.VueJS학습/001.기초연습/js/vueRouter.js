//뷰라우터를 위한 뷰 인스턴스 생성 JS  - vueRouter.js

import router from "./router.js";

const linkData = {
    세계여행사: { path: "/trip" },
    세계먹거리: { path: "/foods" },
    피자: { name: "umsik", params: { item: "피자", cls: "pizza" } },
    파스타: { name: "umsik", params: { item: "파스타", cls: "pasta" } },
    똠양꿍: { name: "umsik", params: { item: "똠양꿍", cls: "ddom" } },
};
// 하위메뉴 구조화 데이터 객체
const linkData2 = {
    세계여행사: { link: { path: "/trip" }, menu: [] },
    세계먹거리: {
        link: { path: "/foods" },
        menu: {
            피자: { name: "umsik", params: { item: "피자", cls: "pizza" } },
            파스타: { name: "umsik", params: { item: "파스타", cls: "pasta" } },
            똠양꿍: { name: "umsik", params: { item: "똠양꿍", cls: "ddom" } },
        },
    },
};
// 뷰 인스턴스 생성하기
new Vue({
    el: "#app",
    router, // 라우터를 인스턴스에 등록 필수
    // 데이터 영역
    data: {
        linkData: linkData2, //하위메뉴 구조 데이터로 변경
    },
    // 마운트구역
    mounted:function(){
        this.$router.push('/trip')
        // $router 라우터 전체객체
        // push(경로) -> 강제로 경로이동하기
    }
});
