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
            if (save) {
                /* 
                    [ 기존 데이터 구조에 컬럼 추가하기 ]
                    dt.gdata의 데이터 구조는
                    {
                        idx:"1",
                    cat:"men",
                    ginfo:[]
                    }
                    ->여기에 num 항목을 추가하여 개수 데이터를 입력함
                    {
                        idx:"1",
                    cat:"men",
                    ginfo:[],
                    num: 1
                    }
                    -> 기존 객체에 속성 추가

                    객체변수.새항목 = 값
                    -> dt.gdata[pm].num = 값

                */

                // 배열뒤에 밀어넣기 메서드 : push(값)
                // 넣기 전에 num 항목 추가하기
                dt.gdata[pm].num = $("#sum").val();
                // 추가 후 데이터 넣기
                org.push(dt.gdata[pm]);
                // 객체를 문자형으로 변환후 로컬스토리지에 반영
                localStorage.setItem("cart", JSON.stringify(org));
                console.log("반영후:", localStorage.getItem("cart"));

                // 카트애니메이션 후 버튼을 등장시켜 카트리스트까지 연동
                this.commit("cartAni", { cnt: org.length, opt: 1 });
            }
        },

        clearData() {
            localStorage.removeItem("cart");
        },

        cartAni(dt, pm) {
            //pm.cnt / pm.opt
            // cnt - 카트아이템 개수
            // opt - css값 옵션
            // opt 0 - 오른쪽 위 작게 / opt 1 - 정중앙 크게
            console.log("카트애니", pm);

            $("#mycart").remove();

            $("body").append(`
                <img id="mycart" src="./images/mycart.gif"
                title="${pm.cnt}개의 상품이 카트에 있습니다">
            `);

            // 초기 CSS 세팅 값 배열
            let icss = [
                {
                    tv: "5%",
                    lv: "80%",
                    wd: "50px",
                },
                {
                    tv: "50%",
                    lv: "50%",
                    wd: "370px",
                },
            ];

            console.log("top:", icss[pm.opt].tv, "left:", icss[pm.opt].lv, "width:", icss[pm.opt].wd);

            $("#mycart")
                .css({
                    position: "fixed",
                    top: icss[pm.opt].tv,
                    left: icss[pm.opt].lv,
                    width: icss[pm.opt].wd,
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
                    store.commit("bindData", "-60vw");
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
            store.commit("bindData", "0");

            if (org.length == 0) {
                $("#mycart").remove();
                $("#cartlist").remove();
                // 로컬 데이터 지우기
                localStorage.removeItem("cart");
            } else {
                $("#mycart").attr("title", org.length + "개의 상품이 있습니다.");
            }
        },

        // 리스트 바인딩 메서드
        bindData(dt, pm) {
            //pm - 카트박스 right 값 전달
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
            const chx = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let rec = org.map(
                (v, i) => `
                            <tr>
                                <!-- 상품 이미지 -->
                                <td style="text-align:center">
                                <img  src="${"images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"}" style="width:50px" alt="item">
                                </td>
                                <!-- 번호 -->
                                <td style="text-align:center">${i + 1}</td>
                                <!-- 상품명 -->
                                <td style="text-align:center">${v.ginfo[1]}</td>
                                <!-- 상품코드 -->
                                <td style="text-align:center">${v.ginfo[2]}</td>
                                <!-- 단가 -->
                                <td style="text-align:center">${v.ginfo[3]}</td>
                                <!-- 수량 -->
                                <td style="text-align:center">${v.num}</td>
                                <!-- 합계 -->
                                <td style="text-align:center">${chx(v.ginfo[3].trim().replaceAll(",", "").replace("원", "") * v.num) + "원"}</td>
                                <!-- 삭제 -->
                                <td style="text-align:center">
                                <button class="cfn" data-idx="${v.idx}">×</button>
                                </td>
                            </tr>
                `
            );
            let hcode = "";
            rec.forEach((v) => {
                hcode += v;
            });
            // rec.join("")
            // array.join(구분자)
            // -> 배열을 구분자로 구분해서 한 문자열로 만들어준다.
            // 구분자를 빈 문자열로 넣으면 사이 구분자 없이 합쳐짐.
            // 구분자를 생략하면 기본값(",") 로 구분되어 합쳐짐

            // 총합계 구하기
            let total = 0;
            // 단가 숫자만 남기기
            const pnum = (x) => x.trim().replaceAll(",", "").replace("원", "");

            org.forEach((v, i) => {
                total += pnum(v.ginfo[3]) * v.num;
            });

            // 선생님 방법
            /* 
                total = org.map(v=> pnum(v.ginfo[3]) * v.num );
                let temp = 0:
                total.forEach(v=>temp+=v);
                total = temp;
            */

            // 생성된 카트리스트에 테이블 넣기
            $("#cartlist")
                .html(
                    `
                <a href="#" class="cbtn cbtn2"><span class="ir">×</span></a>
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
                    ${rec.join("")}
                    <tr>
                        <td colspan="6" style="text-align:right">
                            총 합계 : 
                        </td>
                        <td style="text-align:center">${chx(total)}원</td>
                        <td></td>
                    </tr>
                </table>
            `
                )
                .css({
                    position: "fixed",
                    top: 0,
                    right: pm, //-"60vw"
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

        setBtn(dt, pm) {
            // DOM모두 로딩보장 후 세팅
            // jQuery 로딩구역에 넣기
            $(() => {
                // 세자리 마다 ,넣는 함수
                const chx = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                $(".chg_num img").on("click", function () {
                    // 0. 수량표시 요소
                    let sum = $("#sum");

                    // 1. 이미지 alt속성겂 얻기
                    let ialt = $(this).attr("alt");
                    console.log("ialt: ", ialt);
                    // 2.  증가 / 감소 처리하기
                    if (ialt == "증가") {
                        sum.val(Number(sum.val()) + 1);
                    } else {
                        sum.val(Number(sum.val()) - 1);
                    }
                    // 0이면 1로 고정
                    if (sum.val() == 0) sum.val(1);

                    // 3. 기본금액 * 개수
                    let cnum = $("#gprice").text().trim().replaceAll(",", "").replace("원", "") * sum.val();
                    console.log("cnum: ", cnum);

                    // 4. 출력하기
                    $("#total").text(chx(cnum) + "원");
                });
            });
        },
    },
});

export default store;
