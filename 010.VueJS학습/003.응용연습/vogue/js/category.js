/* 보그 PJ 카테고리 페이지 JS - category.js */

/* 넘어온 url받기 pm -> parameter*/
let pm = location.href;
/* location.href가 이퀄 오른쪽에 있으면 url주소 읽어옴 */

// 만약 메뉴를 클릭하여 파라미터가 없는 경우 물음표로 구분하여 없으면 돌려보냄
if(pm.indexOf("?") === -1){
    location.href = "index.html";
}

/* 문자열 잘라서 값 읽어오기 -> 물음표로 잘라서 두 번째 값 -> 이퀄로 잘라서 두 번째 값*/
pm = pm.split("?")[1].split("=")[1];
/* pm값 특수문자 복원하기 */
pm = decodeURIComponent(pm);
console.log(pm);

$(()=>{
    console.log("로딩완료");

    // Vue JS 데어터 바인딩
    new Vue({
        // 대상은 메인 컨텐츠 영역
        el:"#cont",
        data:{
            items:{}, // json 데이터 루트에 맞춤
            // parameter로 넘어온 값을 경로값과 비교하기 위해 Vue JS 데이터 변수로 세팅함
            catName: pm.replace(" & ", "-")
        },
        mounted:function(){
            axios.get("./js/mdata.json").then(x => this.items = x);
            $("title").prepend(pm + " ");
        }
    });////////////Vue

    // gnb메뉴 SPA를 위한 재정의하기 
    // -> Vue JS  인스턴스를 생성하면 대상요소가 기존 JS의 모든 기능이 초기화하여 작동되지 않음
    new Vue({
        // 대상선정
        el: "#gnb",
        data:{

        },
        methods:{
            // 메뉴변경하기
            chgMenu(){
                console.log("나야나");
            }
        }
    });

})