const store = new Vuex.Store({
    // (1) 데이터 세팅구역
    state:{

    },
    // (2) 데이터 변경 메서드 구역 : 호출시 commit()사용
    mutations:{
        
    },
    // (3) 백엔드 관련 코딩 비동기처리 메서드 구역 : 호출시 dispatch()사용
    actions:{
        myAct(헝, 벙){
            console.log("나의 액션", 헝, 벙);
        }
    }
})
export default store;