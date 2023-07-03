import $ from "jquery";
import "./css/board.css";
import { useEffect, useState } from "react";
import orgdata from './data/data.json'

// 컴포넌트에서 json 데이터를 할당하지 않고 반드시 밖에서 할당해야 함
// 초기데이터 처리는 로컬스토리지 "bdata"가 있으면 로컬스토리지 데이터를 가져오고
// 없으면 제이슨 데이터를 사용하여 초기화 함

let org;
if(localStorage.getItem("bdata")){
    org = JSON.parse(localStorage.getItem('bdata'));
}else{
    org = orgdata;
}

org.sort((x,y)=>{
    return Number(x.idx) === Number(y.idx)? 0 : Number(x.idx) > Number(y.idx)? -1 : 1;
})

function jqfn() {
    $(() => {});
}
function Board() {

// [ json 파일 데이터 로컬 스토리지에 넣기 ]
// 1. 변수에 json파일 문자화 하여 불러오기
// 실시간 데이터 변경관리를 Hook변수화 하여 처리함
const [jsn, setJsn] = useState(org)

// 2. 로컬 스토리지 변수를 설정하여 할당하기
// localStorage.setItem("bdata", JSON.stringify(jsn));
// console.log(localStorage.getItem("bdata"));

// 3. 로컬 스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1 로컬 스토리지 데이터 파싱하기
// let bdata = JSON.parse(localStorage.getItem("bdata"));
// console.log(bdata);

// 3-2 게시판 리스트 생성하기
// 데이터 순서: 번호, 글제목, 글쓴이, 작성일, 조회수

// 페이징 번호
// let pgnum = 1;
// 페이지 단위
let pgblock = 9;
// 시작번호 생성
// -> (pgnum-1)*pgblock
// 끝번호 생성
// -> pgnum*pgblock

/************************************
    함수명: bindList
    기능: 페이지별 리스트를 생성하여 바인딩함
************************************/
function bindList(pgnum) {
    // 1. 반복문으로 코드 작성
    let blist = "";
    let totnum = jsn.length;

    jsn.sort((x,y)=>{
        return Number(x.idx)===Number(y.idx)? 0 : Number(x.idx)>Number(y.idx)? -1 : 1;
    })

    for (let i = (pgnum - 1) * pgblock; i < pgnum * pgblock; i++) {
        // 마지막 번호 한계값 조건으로 마지막 페이지 데이터 존재하는 데이터까지만 바인딩하기
        if (i < totnum) {
            blist += `
                <tr>
                    <td>${i+1}</td>
                    <td>
                        <a href="view.html?idx=${jsn[i]["idx"]}">${jsn[i]["tit"]}</a>
                        </td>
                    <td>${jsn[i]["writer"]}</td>
                    <td>${jsn[i]["date"]}</td>
                    <td>${jsn[i]["cnt"]}</td>
                </tr>
            `;
        }
    }
    // 2 반복문으로 작성한 코드 리스트에 넣기
    $("#board tbody").html(blist);

    // 3. 페이징 블록 만들기
    // 3-1 전체 페이지 번호수 계산하기
    // 전체 레코드수 / 페이지 단위수 + (나머지 있으면 한페이지 더)
    let pgtotal = Math.floor(jsn.length / pgblock);
    let pgadd = jsn.length % pgblock;
    // 페이징 코드 변수
    let pgcode = "";

    // 3-2 페이징 코드 만들기
    if (pgadd != 0) pgtotal++;

    for (let i = 1; i <= pgtotal; i++) {
        pgcode += pgnum == i ? `<b>${i}</b>` : `<a href="#">${i}</a>`;

        if (i != pgtotal) pgcode += ` | `;
    }

    // 3-3 페이징 코드 넣기
    $(".paging").html(pgcode);

    // 3-5 이벤트 링크 생성하기
    $(".paging a").on("click", function (e) {
        e.preventDefault();
        bindList($(this).text());
    });
}
// console.log(blist);
$(() => {
    // 최초 리스트 호출
    bindList(1);
});

let [nowmem, setNowmem] = useState("");


const chkLogin = () =>{
    let chk = localStorage.getItem("minfo");
    if(chk) setLog(true);
    else setLog(false);

    if(chk){
        setNowmem(JSON.parse(chk));
        console.log('현재멤',nowmem);
    }
    

}

// 게시판 모드별 상태구분 Hook 변수 만들기
// 모드 구분 : CRUD (Create/Read/Update/Delete)
// C - 글쓰기
// R - 글읽기
// U - 글수정
// D - 글삭제
// 상태 추가: L - 글 목록
const [bdmode, setBdmode] = useState("L");

// 로그인 상태  Hook변수 
// 상태값: false - 로그아웃상태 / true - 로그인상태
const [log, setLog] = useState(false)

const chgMode = (e) =>{
    e.preventDefault();
    let txt = $(e.target).text();
    console.log("버튼", txt);
    if(txt==="Write"){
        setBdmode("C")
        $(()=>{
            $(".dtblview .name").val(nowmem.unm);
            $(".dtblview .email").val(nowmem.eml)
        })
    }else if(txt==="List"){
        setBdmode("L");
    }else if(txt ==="Submit" && bdmode==="C"){
        let tit = $(".dtblview .subject").val();
        let cont = $(".dtblview .content").val();
        if(tit.trim() === "" || cont.trim()===""){
            alert("Title and content ar required");
        }else{

            let today = new Date();
            let yy = today.getFullYear();
            let mm = today.getMonth();
            mm = mm<10?"0"+mm:mm
            let dd = today.getDate();
            dd = dd<10?"0"+dd:dd

            // 1. 원본데이터 변수할당
            let orgtemp = jsn;

            // 2.임시변수에 입력할 객체데이터 생성하기
            let temp = {
                "idx": jsn.length+1,
                "tit" : tit,
                "cont" : cont,
                "att" : "",
                "date": `${yy}-${mm}-${dd}`,
                "writer": nowmem.uid,
                "pwd": nowmem.pwd,
                "cnt" : "1"
            };

            // 3. 원본 임시변수에 데이터 push하기
            orgtemp.push(temp);

            // 4. Hook 관리변수에 최종 업데이트
            setJsn(orgtemp);

            // 5. 로컬스토리지 변수에 반영하기
            localStorage.setItem("bdata", JSON.stringify(jsn));

            console.log("반영된 데이터",localStorage.getItem("bdata"));

            // 6. 게시판 모드 업데이트("L"모드)
            setBdmode("L");
            bindList(1);


        }
    }else if(txt==="Modify"){
        setBdmode("U")
    }

    // 리스트 태그로딩구역에서 일괄호출
    // 리스트 태그가 출력되었을 때 적용됨
    $(()=>{
        bindList(1);
    })
}

    const callFn = ()=>{
        // 리스트 상태일 때만 호출
        if(bdmode === "L"){
            bindList(1)
        }
        // 로그인 상태 체크
        chkLogin();

        console.log("로그인", log, "/모드", bdmode);
    }
    useEffect(callFn,[])

    return (
        <>
            {/* 모듈코드 */}
            {/* 1 .게시판 리스트 : 게시판 모드 "L"일때 출력*/}
            {
                bdmode === "L" &&
                <table className="dtbl" id="board">
                    <caption>OPINION</caption>
                    {/* 상단 컬럼명 표시영역 */}
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Date</th>
                            <th>Hits</th>
                        </tr>
                    </thead>

                    {/* 중앙 레코드 표시부분 */}
                    <tbody>
                        <tr>
                            <td colSpan="5">There is no data</td>
                        </tr>
                    </tbody>

                    {/* 하단 페이징 표시부분 */}
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="paging">
                                {/* PHP에서 페이징을 구성하여 표시한다! */}
                            </td>
                        </tr>
                    </tfoot>
                </table>

            }

            {/* 2. 글쓰기 테이블  : 게시판 모드 "C"일때만 출력 */}
            
            {
                bdmode === "C" &&
                <table className="dtblview">
                <caption>OPINION</caption>
                <tbody>
                    <tr>
                        <td width="100">
                            Name
                        </td>
                        <td width="650">
                            <input type="text" className="name" size="20" readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                        </td>
                        <td>
                            <input type="text" className="email" size="40" readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Title
                        </td>
                        <td>
                            <input type="text" className="subject" size="60" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Content
                        </td>
                        <td>
                            <textarea className="content" cols="60" rows="10"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            }

            <br />
            <table className="dtbl btngrp">
                <tbody>
                <tr>
                    <td>
                        {
                            /* 글목록 모드 */
                            bdmode === "L" &&
                            <>
                                <button onClick={chgMode}>
                                    <a href="#">Write</a>
                                </button>
                            </>
                        }
                        {
                            /* 글쓰기 모드 */
                            bdmode === "C" &&
                            <>
                                <button onClick={chgMode}>
                                    <a href="list.php">Submit</a>
                                </button>
                                <button onClick={chgMode}>
                                    <a href="write.php">List</a>
                                </button>
                            </>
                        }
                        {
                            /* 수정 모드 */
                            bdmode === "U" &&
                            <>
                                <button onClick={chgMode}>
                                    <a href="list.php">Submit</a>
                                </button>
                                <button onClick={chgMode}>
                                    <a href="write.php">Delete</a>
                                </button>
                                <button onClick={chgMode}>
                                    <a href="write.php">List</a>
                                </button>
                            </>
                        }
                        {
                            /* 읽기 모드 */
                            bdmode === "R" &&
                            <>
                                <button onClick={chgMode}>
                                    <a href="list.php">List</a>
                                </button>
                                <button onClick={chgMode}>
                                    <a href="write.php">Modify</a>
                                </button>
                            </>
                        }
                    </td>
                </tr>
                </tbody>
            </table>
            {jqfn()}
        </>
    );
}

export default Board;

/* 게시판 기능정의 */
/* 
    1. 글쓰기 버튼은 로그인 한 경우에만 노출
    2. 글쓰기 한 후 저장할 떄 로그인한 계정으로 저장
    3. 글보기 모드에서 글 수정버튼은 해당 글쓴이일 때만 노출
    4. 수정모드에서 삭제버튼은 확인 후 글쓴이일 경우에만 가능
*/

/* 페이지별 기능버튼 */
/* 
    1. 목록: 글쓰기(로그인 후) / 글보기는 제목 클릭시
    2. 글보기 : 글수정 / 글삭제(해당계정일 때) / 목록버튼
    3. 글수정: 글수정확인 / 글삭제(해당계정일 때) / 목록버튼
*/