import $ from 'jquery';
import '../css/search.css'
import CatList from './CatList';
import cat_data from '../data/cat';
import { useEffect, useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function jqfn(){
    $(()=>{

    });
}
function Search(props){

    //  데이터 선택하기
    // ->데이터 정렬을 반영하기 위해 정렬상태값을 같이 설정함
    // 데이터구성: [배열 데이터, 정렬상태값]
    // 정렬 상태값: 0 - 오름차순, 1 - 내림차순, 2 - 정렬 전
    // 데이터 정렬만 변경될 경우 배열 데이터가 변경되지 않은 것으로 
    // Hook 상태관리에서 인식함
    let [sdt, setSdt] = useState([cat_data, 2]);
    // sdt[0] -> 배열데이터만 가져갈 경우 0번째로 선택함
    //  데이터  건수
    let [tot, setTot] =useState(cat_data.length)

    // 데이터 검색 함수
    const schList = ()=>{
        let inp  = document.querySelector("#schin");
        // 1.검색어 읽기
        let keyword = inp.value;
        // 2. 검색어 입력확인
        if(keyword.trim().replace(" ","") === ""){
            // 입력창으로 다시 보내기
            inp.focus();
            inp.value="";
            return;
        }
        console.log('keyword: ', keyword);

        // 3. 데이터 검색하기
        // 배열값 다중검색 메서드 -> filter()
        // eslint-disable-next-line array-callback-return
        let newList = cat_data.filter(v=>{
            if(v.cname.toLowerCase().indexOf(keyword) !== -1){
                return true;
            }
        })
        console.log(newList);

        // 4. 검색결과 리스트 업데이트 하기
        setSdt([newList, 2]);
        setTot(newList.length)


    }

    // 입력창에서 엔터키를 누르면 검색함수 호출
    const enterKey = (e)=>{
        if(e.key=== "Enter") schList();
    }

    cat_data.sort((x,y)=>{
        return  x.cname === y.cname ? 0  : x.cname > y.cname ? 1: -1;
    })


    // 리스트 정렬 변경함수
    const sortList = (e)=>{
        // 1. 선택옵션 값
        let opt = e.target.value;
        // 임시 변수
        let temp = sdt[0];
        // 2. 옵션에 따른 정렬반영하기
        temp.sort((x,y)=>{
            if(opt==="1"){
                return x.cname===y.cname ? 0 : x.cname > y.cname ? -1 : 1;
            }else{
                return x.cname===y.cname ? 0 : x.cname > y.cname ? 1 : -1;
            }
        })
        // if(opt === "1"){
        //     temp.sort((x,y)=>x.cname==y.cname ? 0 : x.cname > y.cname ? -1 : 1);
        // }else{
        //     temp.sort((x,y)=>x.cname==y.cname ? 0 : x.cname > y.cname ? 1 : -1);
        // }
        console.log("정렬후",temp);
        setSdt([temp, Number(opt)]);
    }

    // 체크박스 요소
    let chkele = document.querySelectorAll(".chkhdn");

    const chkSearch = (e) =>{
        // 1. 체크바스 아이디 : 검색항목의 값(alignment)
        let cid = e.target.id;
        // 2. 체크박스 체크여부 : checked(true/false)
        let checked = e.target.checked;
        // 3. 체크박스 체크여부에 따른 분기
        // 체크여부가  true일 떄, 해당 검색어로 검색하기

        // 임시변수 : 기존 입력된 데이터 가져옴
        let temp = sdt[0];
        // 결과 집합 변수
        let newList = [];
        //  체크박스 체크개수 세기
        let num = 0;
        chkele.forEach(v=>{
            if(v.checked) num++
        })

        // 
        
        if(checked){  // 체크박스 true 일때
            //  현재 데이터 변수에 담기
            // eslint-disable-next-line array-callback-return
            let nowdt = cat_data.filter(v=>{
                if(v.alignment === cid) return true;
            })

            // 체크개수가 1 초과일때 배열 합치기
            if(num > 1){ // 스프레드 연산자 사용([...])
                newList = [...temp,  ...nowdt];
            }else{
                newList = nowdt;
            }
        }else{  // 체크박스가  false 일때 데이터 지우기
            // splice로 삭제시 일반 for문으로 --처리해야함
            for(let i = 0; i<temp.length; i++){
                // 조건은 체크박스 풀린 값
                if(temp[i].alignment === cid){
                    // 배열 지우기 메서드 : splice(순번, 갯수)
                    temp.splice(i, 1);
                    // 중요! splice로 지우면 배열항목 자체가 삭제되므로 for문 돌 떄 개수가 줄어든다
                    // 따라서 다음번호를 지울 때 ++을 --처리 필수
                    i--;

                    // delete temp[i]  ->> 값만 지우기 때문에 undefined 처리 됨
                    // 따라서 리스트 처리시 에러가 발생함
                    // 이경우 꼭 배열 주소 전체를 삭제하는 splice를 사용해야함.
                }
            }
            // 삭제처리된 temp를 결과에 넣기
            newList = temp;
        }

        // 4. 검색결과 리스트 업데이트하기
        // Hook 데이터 변수 + 데이터 건수 업데이트
        setSdt([newList], 2);
        setTot(newList.length)
    }

    // 검색어가 있으면 검색함수 호출하기
    // 검색함수는 검색어 입력창으로부터 검색어를 가져가므로
    // 넘어온 검색어는 검색입력창에 넣은 후 검색함수를 호출한다
    const linkSearch=()=>{
        console.log("링크 검색어", props.skw);
        if(props.skw != ""){

            // 검색창 원상복구하기
            document.querySelector(".searchingGnb").style.display="none";

            document.querySelector(".searchingGnb+a").style.opacity = "1";




            document.querySelector(".searching input").value = props.skw;
        }
    }
    // 검색어가 있을 때 검색함수의 호출은 페이지로딩 후
    // 체크해주는  useEffect 를 사용한다.
    useEffect(linkSearch);
    return(
        <>
            {/* 모듈코드 */}
            <section className="schbx">
                {/* 1. 옵션선택박스 */}
                <div className="schopt">
                    {/* 검색박스 */}
                    <div className="searching">
                        {/* 검색버튼 돋보기아이콘 */}
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="schbtn"
                            title="Open search"
                            onClick={schList}
                        />
                        {/* 입력창 */}
                        <input
                            id="schin"
                            type="text"
                            placeholder="Filter by Keyword"
                            onKeyUp={enterKey}
                        />
                    </div>
                    {/* 체크박스구역 */}
                    <div className="chkbx">
                        <ul>
                            <li>
                                <h2>
                                    ALIGNMENT
                                    <span className="spbtn">
                                        ＋
                                    </span>
                                </h2>
                                {/* 체크박스리스트 */}
                                <ol>
                                    <li>
                                        Heroes
                                        <input 
                                        type="checkbox"
                                        id="hero"
                                        className="chkhdn"
                                        onChange={chkSearch} 
                                        />
                                        <label
                                        htmlFor="hero"
                                        className="chklb"></label>
                                    </li>
                                    <li>
                                        It's Complicated
                                        <input 
                                        type="checkbox"
                                        id="comp"
                                        className="chkhdn"
                                        onChange={chkSearch} 
                                        />
                                        <label
                                        htmlFor="comp"
                                        className="chklb"></label>
                                    </li>
                                    <li>
                                        Villiains
                                        <input 
                                        type="checkbox"
                                        id="villain"
                                        className="chkhdn"
                                        onChange={chkSearch} 
                                        />
                                        <label
                                        htmlFor="villain"
                                        className="chklb"></label>
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 2. 결과리스트박스 */}
                <div className="listbx">
                    {/* 결과타이틀 */}
                    <h2 className="restit">BROWSE CHARACTERS({tot})</h2>
                    {/* 정렬선택박스 */}
                    <aside className="sortbx">
                        <select className="sel" name="sel" id="sel" onChange={sortList}>
                            <option value="0">A-Z</option>
                            <option value="1">Z-A</option>
                        </select>
                    </aside>
                    {/* 캐릭터 리스트 컴포넌트 
                전달속성 dt - 리스트 데이터 */}
                    <CatList dt={sdt[0]} />
                </div>
            </section>
            {jqfn()}
        </>
    );
}

export default Search;