// 뷰 라우터 인스턴스 설정파일 - glist-router.js

// 라우터 템플릿 만들기
let Glist = {
    template: `<div class="trip router">필터</div>`,
};
let Paging = {
    template: `<div class="trip router">페이징</div>`,
};
let More = {
    template: `<div class="trip router">더보기</div>`,
};
// this.$route.params.cls
// this는 현재 라우터를 사용하는 뷰 인스턴스 자신
// $route는 현재 연결된 라우트 정보 객체

// 라우터 옵션값 넣기
// let routes = [{},{}]
const router = new VueRouter({
    routes : [
        // 1. 필터 리스트
        {
            path: "/glist",
            component: Glist,
        },
        // 2. 페이징 리스트
        {
            path: "/paging",
            component: Paging,
        },
        // 3. 더보기 리스트
        {
            path: "/more",
            component: More,
        },
    ]
})

export default router;
