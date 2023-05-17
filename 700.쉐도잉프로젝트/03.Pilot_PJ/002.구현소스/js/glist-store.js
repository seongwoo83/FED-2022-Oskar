// 서브페이지 뷰엑스 스토어 세팅 JS -  store.js

// 전체상품 불러오기
import gdata from "./gdsData/glist-items.js";

const store = new Vuex.Store({
    state: {
        // 서브데이터 셋업
        // 전체 상품 정보 전역화
        gdata: gdata,
    },
    // state 데이터 변경 메서드 구역
    mutations: {

    },
});

export default store;
