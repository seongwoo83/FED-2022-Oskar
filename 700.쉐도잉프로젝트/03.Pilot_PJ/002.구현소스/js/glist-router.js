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

// v-for에 기술된 v-if 조건에 사이범위를 넣고 스토어 변수로 컨트롤 한다.
let Paging = {
    template: `
    <section>
        <!-- 상품 리스트 박스 -->
        <div class="grid">
            <div v-for="(v, i) in $store.state.gdata" v-if="v.idx>=1+$store.state.pnum && v.idx<= 10+$store.state.pnum">
                [{{v.idx}}]<img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'">
                <aside>
                    <h2>{{v.ginfo[1]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
        <!-- 페이징 표시구역 -->
        <div id="paging">
        <a href="#" @click.prevent="$store.commit('updatePaging', 0)">
            1
        </a> | 
        <a href="#" @click.prevent="$store.commit('updatePaging', 10)">
            2
        </a> | 
        <a href="#" @click.prevent="$store.commit('updatePaging', 20)">
            3
        </a>
        </div>
    </section>
    `,
};
let More = {
    template: `
    <section>
        <!-- 상품 리스트 박스 -->
        <div class="grid">
            <div v-for="(v, i) in $store.state.gdata" v-if="v.idx>=1+$store.state.pnum && v.idx<= 10+$store.state.mnum">
                [{{v.idx}}]<img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'">
                <aside>
                    <h2>{{v.ginfo[1]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
        <!-- 더보기 버튼 표시구역 -->
        <div id="more" v-if="$store.state.mbtn">
            <button class="more" @click.prevent="$store.commit('updateMore', 10)" >MORE</button>
        </div>
    </section>
    `,
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
