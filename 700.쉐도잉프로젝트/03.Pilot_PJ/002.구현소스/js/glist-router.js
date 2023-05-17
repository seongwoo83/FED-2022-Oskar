// 뷰 라우터 인스턴스 설정파일 - glist-router.js

// 라우터 템플릿 만들기
let Glist = {
    template: `
    <section>
        <!-- 필터 옵션 체크박스 구역 -->
        <div id="optbx">
            <label for="men">남성</label>
            <input type="checkbox" id="men" v-model="$store.state.chkarr[0]" @change="$store.commit('resCheck')">
            <label for="women">여성</label>
            <input type="checkbox" id="women" v-model="$store.state.chkarr[1]" @change="$store.commit('resCheck')">
            <label for="style">스타일</label>
            <input type="checkbox" id="style" v-model="$store.state.chkarr[2]" @change="$store.commit('resCheck')">
        </div>

        <!-- 상품 리스트 박스 -->
        <div class="grid">
            <div v-for="(v, i) in $store.state.gdata" v-if="v.cat==$store.state.selnm[0] || v.cat==$store.state.selnm[1] || v.cat ==$store.state.selnm[2] ">
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'">
                <aside>
                    <h2>{{v.ginfo[1]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
    </section>
    `,
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
