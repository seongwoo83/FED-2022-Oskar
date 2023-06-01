// 리스트 페이지 JS

// [ json 파일 데이터 로컬 스토리지에 넣기 ]
// 1. 변수에 json파일 문자화 하여 불러오기
let jsn = JSON.stringify(mydata);
// console.log(jsn);

// 2. 로컬 스토리지 변수를 설정하여 할당하기
localStorage.setItem("bdata", jsn);
// console.log(localStorage.getItem("bdata"));

// 3. 로컬 스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1 로컬 스토리지 데이터 파싱하기
let bdata = JSON.parse(localStorage.getItem("bdata"));
// console.log(bdata);

// 3-2 게시판 리스트 생성하기
// 데이터 순서: 번호, 글제목, 글쓴이, 작성일, 조회수

// 페이징 번호
// let pgnum = 1;
// 페이지 단위
// let pgblock = 10;
// 시작번호 생성
// -> (pgnum-1)*pgblock
// 끝번호 생성
// -> pgnum*pgblock

/************************************
    함수명: bindList
    기능: 페이지별 리스트를 생성하여 바인딩함
************************************/
function bindList(pgnum, pgblock){
    // 1. 반복문으로 코드 작성
    let blist ="";
    for (let i = (pgnum - 1) * pgblock; i < pgnum * pgblock; i++) {
        // 마지막 번호 한계값 조건으로 마지막 페이지 데이터 존재하는 데이터까지만 바인딩하기
        if(i< bdata.length){
            blist += `
                <tr>
                    <td>${bdata[i]["idx"]}</td>
                    <td>
                        <a href="view.html?idx=${bdata[i]["idx"]}">${bdata[i]["tit"]}</a>
                        </td>
                    <td>${bdata[i]["writer"]}</td>
                    <td>${bdata[i]["date"]}</td>
                    <td>${bdata[i]["cnt"]}</td>
                </tr>
            `;
        }
    }
    // 2 반복문으로 작성한 코드 리스트에 넣기
    $("#board tbody").html(blist);

    // 3. 페이징 블록 만들기
    // 3-1 전체 페이지 번호수 계산하기
    // 전체 레코드수 / 페이지 단위수 + (나머지 있으면 한페이지 더)
    let pgtotal= Math.floor(bdata.length / pgblock);
    let pgadd = bdata.length % pgblock;
    // 페이징 코드 변수
    let pgcode = "";

    // 3-2 페이징 코드 만들기
    if(pgadd!=0) pgtotal++;

    for(let i =1; i<=pgtotal; i++){
        pgcode += pgnum == i?  `<b>${i}</b>` : `<a href="#">${i}</a>`

        if(i != pgtotal) pgcode += ` | `;
    };

    // 3-3 페이징 코드 넣기
    $(".paging").html(pgcode)

    // 3-5 이벤트 링크 생성하기
    $(".paging a").on("click",function(e){
        e.preventDefault();
        bindList($(this).text(), 9);
    })
}
// console.log(blist);
$(() => {
    // 최초 리스트 호출
    bindList(1,9);
});
