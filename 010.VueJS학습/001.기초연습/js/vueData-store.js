//  제이슨 데이터 처리를 위해 제이슨 불러오기

/************************************
    import jsnData from "./goods.json";
    일반 JS호출과 같은 방식으로 제이슨 파일을 호출하면
    아래와 같은 MIME 전송형식 type 에러가 발생한다.
    _________________________________________________________
    ** Failed to load module script: Expected a JavaScript module script 
        but the server responded with a MIME type of "application/json". 
        Strict MIME type checking is enforced for module scripts per HTML spec.
    ---------------------------------------------------------------------------------

    ((해결방법))
    import 변수 from 제이슨파일경로 assert{type:"json"}

    assert{type:"json"} -> import시 형식을 지정해주는 객체
    이것으로 제이슨 형식을 맞춰서 전송타입 오류를 없앰
************************************/
import jsnData from "./goods.json" assert{type:"json"};

const store = new Vuex.Store({
    // (1) 데이터 세팅구역
    state:{
        items:{}
    }, 
    // (2) 데이터 변경 메서드 구역 : 호출시 commit()사용
    mutations:{
        // 제이슨 데이터 속성 변수 업데이트하기
        setData(st, pm){ //st- state 변수, pm- 전달변수
            // state구역의 item변수에 제이슨 데이터 담기
            st.items = pm;
            console.log("뮤테", pm);
        }
    },
    // (3) 백엔드 관련 코딩 비동기처리 메서드 구역 : 호출시 dispatch()사용
    actions:{
        // 제이슨 데이터 로드하기 메서드
        initData({commit}){ // actions 메서드 전달값으로  {commit}을 사용하면 mutations 구역으로 바로 commit 사용가능
            // 제이슨 데이터 변수에 할당
            const result = jsnData;
            console.log("액션",result);

            // state의 items변수 변경 메서드 호출
            // mutations의 메서드 호출은 -> commit('메서드명', 전달변수)
            commit('setData', result);
            // this.commit('setData',result) --> 전달변수로 {commit}을 사용하지 않아도 됨

        }
    }
})
export default store;