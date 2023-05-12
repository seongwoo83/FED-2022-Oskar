import store from "./vueData-store.js";

// 컴포넌트 생성하기
Vue.component("my-comp",{
    template:`
    <div class="grid">
        <div v-for="(v,i) in $store.state.items.data">
            <img v-bind:src="'./img_gallery/'+ v.idx + '.jpg'" alt="dress">
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
        axios.get("./js/data.json").then( x => store.state.items = x)
    }
})