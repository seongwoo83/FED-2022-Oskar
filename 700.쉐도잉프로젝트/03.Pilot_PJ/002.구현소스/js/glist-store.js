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
        selnm: ["", "", ""],

        // 페이징용 변수
        pnum: 0,

        // 더보기용 변수
        mnum: 0,
        // 더보기 버튼 상태값 변수
        mbtn: true,
    },
    // state 데이터 변경 메서드 구역
    mutations: {
        // 체크박스 체크시 처리 메서드
        resCheck(dt) {
            // console.log(dt.chkarr);
            // 3개의 체크박스 상태배열 변수값에 따라 실제 조건에 들어갈 cat명을 넣어줌
            dt.chkarr.forEach((v, i) => {
                if (v) {
                    dt.selnm[i] = i == 0 ? "men" : i == 1 ? "women" : "style";
                } else {
                    // 체크박스 체크안됨
                    // 무조건 빈값을 할당
                    dt.selnm[i] = "";
                }
            });
        },

        // 페이징 변수 업데이트 메서드
        updatePaging(dt, pm) {
            dt.pnum = pm;
        },

        // 더보기 변수 업데이트 메서드
        updateMore(dt, pm) {
            dt.mnum += pm;
            // 업데이트 후 더보기 버튼 없애기
            if (dt.mnum + 10 > gdata.length) {
                dt.mbtn = false;
            }
        },

        // 장바구니 데이터 업데이트 메서드
        setData(dt, pm) {
            if (localStorage.getItem("cart") == null) {
                localStorage.setItem("cart", "[]");
            }

            // 로컬스토리지 객체데이터 가져오기
            // 입력된 데이터는 문자형 객체이므로
            // 다시 파싱하여 원래 객체로 복원한다!
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            // console.log("변환객체:", org);

            // 이미 선택한 상품일 경우 거르기
            let save = true;
            org.forEach((v) => {
                // 같은 데이터인지 비교
                if (v.idx == dt.gdata[pm].idx) {
                    alert("이미 선택한 상품입니다.");
                    save = false;
                }
            });
            if (save == true) {
                // 배열뒤에 밀어넣기 메서드 : push(값)
                org.push(dt.gdata[pm]);
                // 객체를 문자형으로 변환후 로컬스토리지에 반영
                localStorage.setItem("cart", JSON.stringify(org));
                console.log("반영후:", localStorage.getItem("cart"));

                // 카트애니메이션 후 버튼을 등장시켜 카트리스트까지 연동
                this.commit("cartAni", org.length);
            }
        },

        clearData() {
            localStorage.removeItem("cart");
        },

        cartAni(dt, pm) {
            console.log("카트애니", pm);

            $("#mycart").remove();

            $("body").append(`
                <img id="mycart" src="./images/mycart.gif"
                title="${pm}개의 상품이 카트에 있습니다">
            `);

            $("#mycart")
                .css({
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    zIndex: "99999",
                })
                .delay(3000)
                .animate(
                    {
                        top: "5%",
                        left: "80%",
                        width: "50px",
                    },
                    1000,
                    "easeInExpo"
                )
                .on("click", function () {
                    if ($("#cartlist").length == 0) {
                        // body에 카트리스트 요소 넣기
                        $("body").append(`
                        <section id="cartlist"></section>
                    `);
                    }

                    // 로컬 데이터로 텡블 레코드 태그 구성하기
                    let org = localStorage.getItem("cart");
                    org = JSON.parse(org);

                    // 데이터를 이용하여 리스트 태그 만들기
                    // forEach((값, 순번)=>{})
                    // map((값, 순번)=>{})
                    // 차이는 map은 리턴값으로 처리할경우
                    // 값을 자동으로 대입연산처리함
                    /* 
                    [ forEach 메서드는 변수를 선언후 
                        대입연산처리하여 값을 모아야함]

                    let rec = "";
                    org.forEach((v,i)=>{
                        rec += `<li>${v}</li>`;
                    })
                    ____________________________
                    반면...
                    [ map 메서드는 변수에 직접할당해도
                        리턴값을 대입연산처리해줌!]

                    let rec = org.map((v,i)=> `<li>${v}</li>`)
                */

                    let rec = org.map(
                        (v, i) => `
                                    <tr>
                                        <!-- 상품 이미지 -->
                                        <td>
                                            <img  src="${"images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"}" style="width:50px" alt="item">
                                        </td>
                                        <!-- 번호 -->
                                        <td>${i + 1}</td>
                                        <!-- 상품명 -->
                                        <td>${v.ginfo[1]}</td>
                                        <!-- 상품코드 -->
                                        <td>${v.ginfo[2]}</td>
                                        <!-- 단가 -->
                                        <td>${v.ginfo[3]}</td>
                                        <!-- 수량 -->
                                        <td></td>
                                        <!-- 합계 -->
                                        <td>${v.ginfo[3]}</td>
                                        <!-- 삭제 -->
                                        <td>
                                            <button class="cfn" data-idx="${v.idx}">×</button>
                                        </td>
                                    </tr>
                            `
                    );

                    let hcode = "";
                    rec.forEach((v) => {
                        hcode += v;
                    });

                    // 생성된 카트리스트에 테이블 넣기
                    $("#cartlist")
                        .html(
                            `
                    <a href="#" class="cbtn cbtn2"></a>
                    <table>
                        <caption>
                            <h1>카트 리스트</h1>
                        </caption>
                        <tr>
                            <th>상품</th>
                            <th>번호</th>
                            <th>상품명</th>
                            <th>상품코드</th>
                            <th>단가</th>
                            <th>수량</th>
                            <th>합계</th>
                            <th>삭제</th>
                        </tr>
                        ${hcode}
                    </table>
                `
                        )
                        .css({
                            position: "fixed",
                            top: 0,
                            right: "-60vw",
                            width: "60vw",
                            height: "100vh",
                            backgroundColor: "rgba(255, 255, 255, .8)",
                            zIndex: "999999",
                        })
                        .animate(
                            {
                                right: "0",
                            },
                            600,
                            "easeOutQuint"
                        )
                        .find("table")
                        .css({
                            width: "90%",
                            margin: "50px auto",
                            fontSize: "14px",
                            borderTop: "2px solid #222",
                            borderBottom: "2px solid #222",
                            borderCollapse: "collapse",
                        })
                        .find("td")
                        .css({
                            padding: "10px 0",
                            borderTop: "1px solid #555",
                            textAlign: "center",
                        })
                        .parents("table")
                        .find("th")
                        .css({
                            padding: "15px 0",
                            backgroundColor: "#e5e5e5",
                            fontSize: "16px",
                        })
                        .parents("table")
                        .find("caption")
                        .css({
                            padding: "20px 0",
                            textDecoration: "underline",
                            textDecorationStyle: "wavy",
                        });

                    $(".cbtn2").on("click", function () {
                        $("#cartlist").animate(
                            {
                                right: "-60vw",
                            },
                            600,
                            "easeOutQuint"
                        );
                    });

                    // 삭제버튼 처리 연결하기
                    $(".cfn").on("click", function () {
                        store.commit("delRec", $(this).attr("data-idx"));
                    });
                });
        },

        // 카트아이템 삭제 메서드
        delRec(dt, pm) {
            console.log("아이템 삭제", pm);
            // 로컬 스토리지 데이터 읽기
            // 로컬 스토리지 데이터 파싱
            let org = [];
            org = localStorage.getItem("cart");
            org = JSON.parse(org);
            console.log(org.typeOf);
            // 삭제 아이템 찾아 지우기 : splice() 메서드 사용
            org.forEach((v, i) => {
                if (v.idx == pm) {
                    if (confirm("지우시겠습니까?")) {
                        org.splice(i, 1);
                    }
                }
            });
            // 로컬 스토리지 문자화하여 넣기
            localStorage.setItem("cart", JSON.stringify(org));
            console.log("반영후:", localStorage.getItem("cart"));
            // 리스트 갱신하기
            store.commit("bindData");

            if (org.length == 0) {
                $("#mycart").remove();
                $("#cartlist").remove();
            } else {
                $("#mycart").attr("title", org.length + "개의 상품이 있습니다.");
            }
        },

        // 리스트 바인딩 메서드
        bindData(dt, pm) {
            // 로컬 데이터로 텡블 레코드 태그 구성하기
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);

            // 데이터를 이용하여 리스트 태그 만들기
            // forEach((값, 순번)=>{})
            // map((값, 순번)=>{})
            // 차이는 map은 리턴값으로 처리할경우
            // 값을 자동으로 대입연산처리함
            /* 
                [ forEach 메서드는 변수를 선언후 
                    대입연산처리하여 값을 모아야함]

                let rec = "";
                org.forEach((v,i)=>{
                    rec += `<li>${v}</li>`;
                })
                ____________________________
                반면...
                [ map 메서드는 변수에 직접할당해도
                    리턴값을 대입연산처리해줌!]

                let rec = org.map((v,i)=> `<li>${v}</li>`)
            */

            let rec = org.map(
                (v, i) => `
                            <tr>
                                <!-- 상품 이미지 -->
                                <td>
                                <img  src="${"images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"}" style="width:50px" alt="item">
                                </td>
                                <!-- 번호 -->
                                <td>${i + 1}</td>
                                <!-- 상품명 -->
                                <td>${v.ginfo[1]}</td>
                                <!-- 상품코드 -->
                                <td>${v.ginfo[2]}</td>
                                <!-- 단가 -->
                                <td>${v.ginfo[3]}</td>
                                <!-- 수량 -->
                                <td></td>
                                <!-- 합계 -->
                                <td>${v.ginfo[3]}</td>
                                <!-- 삭제 -->
                                <td>
                                <button class="cfn" data-idx="${v.idx}">×</button>
                                </td>
                            </tr>
                `
            );
            let hcode = "";
            rec.forEach((v) => {
                hcode += v;
            });

            // 생성된 카트리스트에 테이블 넣기
            $("#cartlist")
                .html(
                    `
                <a href="#" class="cbtn cbtn2"></a>
                <table>
                    <caption>
                        <h1>카트 리스트</h1>
                    </caption>
                    <tr>
                        <th>상품</th>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>상품코드</th>
                        <th>단가</th>
                        <th>수량</th>
                        <th>합계</th>
                        <th>삭제</th>
                    </tr>
                    ${hcode}
                </table>
            `
                )
                .css({
                    position: "fixed",
                    top: 0,
                    right: "-60vw",
                    width: "60vw",
                    height: "100vh",
                    backgroundColor: "rgba(255, 255, 255, .8)",
                    zIndex: "999999",
                })
                .animate(
                    {
                        right: "0",
                    },
                    600,
                    "easeOutQuint"
                )
                .find("table")
                .css({
                    width: "90%",
                    margin: "50px auto",
                    fontSize: "14px",
                    borderTop: "2px solid #222",
                    borderBottom: "2px solid #222",
                    borderCollapse: "collapse",
                })
                .find("td")
                .css({
                    padding: "10px 0",
                    borderTop: "1px solid #555",
                    textAlign: "center",
                })
                .parents("table")
                .find("th")
                .css({
                    padding: "15px 0",
                    backgroundColor: "#e5e5e5",
                    fontSize: "16px",
                })
                .parents("table")
                .find("caption")
                .css({
                    padding: "20px 0",
                    textDecoration: "underline",
                    textDecorationStyle: "wavy",
                });

            $(".cbtn2").on("click", function () {
                $("#cartlist").animate(
                    {
                        right: "-60vw",
                    },
                    600,
                    "easeOutQuint"
                );
            });

            // 삭제버튼 처리 연결하기
            $(".cfn").on("click", function () {
                store.commit("delRec", $(this).attr("data-idx"));
            });
        },
    },
});

export default store;
