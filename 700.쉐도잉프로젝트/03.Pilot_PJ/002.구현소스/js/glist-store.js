// 서브페이지 뷰엑스 스토어 세팅 JS -  store.js

// 전체상품 불러오기
import gdata from "./gdsData/glist-items.js";

const store = new Vuex.Store({
    state: {
        // 서브데이터 셋업
        // 전체 상품 정보 전역화
        gdata: gdata,
        // 필터 데이터용 배열 변수
        chkarr: [true, true, true],
        // 필터 데이터용 배열 입력값 변수
        selnm:["","",""],
    },
    // state 데이터 변경 메서드 구역
    mutations: {
        // 체크박스 체크시 처리 메서드
        resCheck(dt){
            console.log(dt.chkarr);
            // 3개의 체크박스 상태배열 변수값에 따라 실제 조건에 들어갈 cat명을 넣어줌
            dt.chkarr.forEach((v, i) => {
                if(v){
                    dt.selnm[i] = i == 0? "men" : (i == 1? "women" : "style") ;   
                }else{ // 체크박스 체크안됨
                    // 무조건 빈값을 할당
                    dt.selnm[i] = "";
                }
            });
        }
    },
});

export default store;
