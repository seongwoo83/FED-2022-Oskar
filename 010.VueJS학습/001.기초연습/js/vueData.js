import store from "./vueData-store.js";

// 컴포넌트 생성하기
// 이미지 src속성 바인드시
// (v.idx > 50 ? 1 : v.idx) 문장해석
// 데이터 idx 값이 50초과이면 1을 넣고 아니면 idx데이터 넣기

// axios로 가져온 데이터는 {data:{실제 데이터}} 형식으로 한 번 더 랩핑하여 들어옴
// 따라서 이 데이터만 사용하려면 $store.state.items.data처럼  data속성까지 써주어야 사용가능함
// 반면, 뷰엑스 스토어의 actions에서 받은 제이슨 데이터는 원본 그대로 할당하여 들어오므로
// $store.state.items -> 원본 변수를 바로 사용해야 함
Vue.component("my-comp",{
    template:`
    <div class="grid">
        <div v-for="(v,i) in $store.state.items">
            <img v-bind:src="'./img_gallery/'+ (v.idx>50? 1: v.idx) + '.jpg'" alt="dress">
            <aside>
                <h2>{{v.gname}}</h2>
                <h3>{{v.gprice}}</h3>
            </aside>
        </div>
    </div>
    `,
    data:function(){
        return{
            myt:"나야나야나"
        }
    }
})
// 뷰인스턴스 생성하기
new Vue({
    el:"#app",
    store,
    data:{
        items:{}, // json 데이터 담을 변수
        myt:"나야나"
    },
    // created -> 뷰인스턴스 생성직후 실행되는 메서드 구역(가상DOM / 실제 DOM 생성전)
    created:function(){
        // axios 사용하여 제이슨 데이터 가져오기
        // axios.get(제이슨파일).then(데이터=>담을변수=데이터)
        // axios.get("./js/goods.json").then( x => store.state.items = x);

        // 뷰엑스 스토어 actions 구역 메서드 initData 호출하기
        store.dispatch('initData');

    }
})