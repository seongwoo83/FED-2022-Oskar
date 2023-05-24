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

        // 페이징용 변수
        pnum :0,

        // 더보기용 변수
        mnum:0,
        // 더보기 버튼 상태값 변수
        mbtn:true
    },
    // state 데이터 변경 메서드 구역
    mutations: {
        // 체크박스 체크시 처리 메서드
        resCheck(dt){
            // console.log(dt.chkarr);
            // 3개의 체크박스 상태배열 변수값에 따라 실제 조건에 들어갈 cat명을 넣어줌
            dt.chkarr.forEach((v, i) => {
                if(v){
                    dt.selnm[i] = i == 0? "men" : (i == 1? "women" : "style") ;   
                }else{ // 체크박스 체크안됨
                    // 무조건 빈값을 할당
                    dt.selnm[i] = "";
                }
            });
        },

        // 페이징 변수 업데이트 메서드
        updatePaging(dt, pm){
            dt.pnum = pm;
        },

        // 더보기 변수 업데이트 메서드
        updateMore(dt, pm){
            dt.mnum += pm;
            // 업데이트 후 더보기 버튼 없애기
            if(dt.mnum+10 > gdata.length){
                dt.mbtn = false
            }
        },


        // 장바구니 데이터 업데이트 메서드
        setData(dt, pm){
            if(localStorage.getItem('cart')==null){
                localStorage.setItem("cart", "[]")
            }
        
            // 로컬스토리지 객체데이터 가져오기
            // 입력된 데이터는 문자형 객체이므로
            // 다시 파싱하여 원래 객체로 복원한다!
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            // console.log("변환객체:", org);
            
            // 배열뒤에 밀어넣기 메서드 : push(값)
            org.push(
                dt.gdata[pm]
            );
            // 객체를 문자형으로 변환후 로컬스토리지에 반영
            localStorage.setItem("cart", JSON.stringify(org));
            console.log("반영후:", localStorage.getItem("cart"));

            // 카트애니메이션 후 버튼을 등장시켜 카트리스트까지 연동
            this.commit('cartAni', org.length)

        },

        cartAni(dt, pm){
            console.log('카트애니', pm);

            $("#mycart").remove();

            $("body").append(`
                <img id="mycart" src="./images/mycart.gif"
                title="${pm}개의 상품이 카트에 있습니다">
            `);

            $("#mycart").css({
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%, -50%)",
                cursor: "pointer",
                zIndex:"99999",
            }).delay(3000).animate({
                top:"5%",
                left:"80%",
                width:"50px"
            },1000, "easeInExpo").on("click", function(){
                // body에 카트리스트 요소 넣기
                $("body").append(`
                    <section id="cartlist"></section>
                `);
                // 생성된 카트리스트에 테이블 넣기
                $("#cartlist").html(`
                    <a href="#" class="cbtn cbtn2">×</a>
                    <table>
                        <caption>
                            <h1>카트 리스트</h1>
                        </caption>
                        <tr>
                            <th>번호</th>
                            <th>상품명</th>
                            <th>상품코드</th>
                            <th>단가</th>
                            <th>수량</th>
                            <th>합계</th>
                            <th>삭제</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                `)
            })




        }



    },
});

export default store;
