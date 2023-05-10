// 서브페이지 뷰엑스 스토어 세팅 JS -  store.js
const store  = new Vuex.Store({
    state:{
        subData:{
            "남성":{
                // 배너 갯수
                cnt: 3,
                // 카테고리명
                cat:"men",
            },
            "여성":{
                // 배너 갯수
                cnt: 3,
                // 카테고리명
                cat:"women",
            },
            "스타일":{
                // 배너 갯수
                cnt: 5,
                // 카테고리명
                cat:"style",
            },
        },
        // 공통처리 배너갯수변수
        cnt:3,
        // 공통처리 카테고리명 변수
        cat:"men",
    },
    // state 데이터 변경 메서드 구역
    mutations:{

    }
})