// 뷰엑스 스토어 - 전역 뷰 데이터 저장소

/*****************************************
    [ Vuex  Store -뷰엑스 스토어란? ]
    1. 데이터와 데이터상태를 한번에 관리하는 확장 라이브러리이다.
    2. 스토어에서 관리되는 데이터는 리액티브 데이터이다
        (reacitve data - 양방향 동기화 데이터)
    3. 컴포넌트 구조 상태와 상관없이 사용하는 곳에서 변경한 내용이
        동기화 되어 자연스러운 업데이트가 이루어짐
    
        [ 뷰엑스 스토어 기본구조 ]
        1. state(상태): 변수선언 및 할당구역(인스턴스에서 data구역과 비슷)
        2. mutations(돌연변이): 변수의 데이터를 변경하는 메서드구역
            => 뷰 인스턴스에서 methods와 유사
        3. actions(활동): 비동기 처리 메서드 구역

        [ 뷰엑스 스토어 처리순서 ]
        1. actions -> 2. mutations -> state
            - 흐름 : 먼저 비동기 메서드 처리 후, 일반 메서드 처리결과를 state변수에 반영함
        (참고: 뷰엑스 관리흐름도 https://docs.google.com/document/d/1xT3IMlWO_kY7pJqNJSDpI4IPe6BtpfoYq9r5M5_YiRE/edit)


            예)
                new Vuex.Store({
                    state:{
                        변수: 값
                    },
                    mutations:{
                        메서드(state){}  -> 메서드 내부에서 state에 세팅된 변수 사용가능
                    }, 
                    actions:{
                        메서드(){}
                    }
                })
        ___________________________
        [ 뷰엑스 스토어 버전이슈 ]
        - 일반적으로 뷰JS버전이 2.x 버전이면 뷰엑스는 3.x버전을 사용함
            (최신 뷰는 3.x버전이므로 뷰엑스는 4.x버전을 사용함)
        -> 메이저 버전 숫자가 뷰보다 하나 크다
            (주의: webpack 템플릿을 사용한 SPA 구축환경에서 이 버전이 맞지 않으면 뷰엑스 스토어에서 에러가 발생함)

        - 추가 정보가 있음
*****************************************/

/* ******************************** 뷰엑스 스토어를 활용한 변수 세팅하기 ********************************/
// 1. 뷰엑스 스토어 인스턴스를 생성한다
const store = new Vuex.Store({
    // (1) 데이터 세팅구역
    state:{
        // 도시 데이터 셋업
        cityData:{
            "서울":{
                이미지:`https://www.shutterstock.com/image-photo/songpagu-seoul-south-korea-september-260nw-2094838786.jpg`,
                설명:`대한민국의 수도인 서울을 지방자치단체인 특별시로 부르는 명칭이다. 한반도 중앙에 있으며, 한강을 사이에 두고 남북으로 펼쳐져 있다. 북쪽 끝은 도봉구 도봉동, 동쪽 끝은 강동구 상일동, 남쪽 끝은 서초구 원지동, 서쪽 끝은 강서구 오곡동이다. 시청은 중구 을지로1가(태평로1가 31)에 있다.`
            },
            "부산":{
                이미지:`https://imagescdn.gettyimagesbank.com/500/201901/jv11336724.jpg`,
                설명:`대한민국 제2의 도시이자, 제1의 무역항이다. 동쪽과 남쪽은 바다에 면하고, 서쪽은 김해시 장유동과 창원시 진해구, 북쪽은 양산시 물금읍과 김해시 대동면, 동쪽은 울산광역시 서생면·온양읍에 접한다. 대한민국 남동단의 관문으로 서울특별시에서 남동쪽으로 약 450km, 대한해협을 끼고 일본 시모노세키[下關]와 약 250km 떨어져 있다. 1군 15구로 이루어져 있으며, 면적은 765.94㎢이다. 시청 소재지는 부산광역시 연제구 연산5동 1000번지이다.`
            },
            "제주":{
                이미지:`https://www.jejusori.net/news/photo/202211/409902_416608_4312.jpg`,
                설명:`한국·중국·일본 등 극동 지역의 중앙부에 있어 지정학적으로도 중요하며, 도 전체가 바다로 둘러싸였다. 수리적(數理的)으로는 동경 126°08'∼126°58', 북위 33°06'∼34°00'에 위치한다. 북단은 북위 34°00'의 제주시 추자면 대서리이며, 남단은 북위 33°06'의 서귀포시 대정읍 마라도다. 한국 최남단에 있는 도로서, 제주도를 포함해 9개의 유인도와 55개의 무인도로 이루어졌다. 이 가운데 유인도는 우도·상추자도·하추자도·비양도·횡간도·추포도·가파도·마라도이다. 남북 간의 거리가 약 31㎞, 동서간의 거리가 약 73㎞로 동서로 가로놓인 모양이다. 러시아·중국 등의 대륙과 일본·동남아 등지를 연결하는 요충지이며, 천혜의 자연경관이 수려한 세계적인 휴양관광지다.`
            },
        },
        // 이미지정보 셋업변수
        imgsrc:"",
        // 도시설명정보 셋업변수
        desc:"",
    },
    // (2) 데이터 변경 메서드 구역
    mutations:{
        // 초기 데이터 셋업 메서드
        initSet(state, param){
            console.log("데이터변경! 초기화");
            // 파라미터가 객체일 경우(데이터가 다수일때)
            
            // 이미지 데이터 셋업
            state.imgsrc = param.url;
            // 이미지 설명 셋업
            state.desc = param.txt;
        },
    }
})
export default store;