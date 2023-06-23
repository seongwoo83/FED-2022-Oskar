import $ from 'jquery';
import '../css/search.css'
import CatList from './CatList';
import cat_data from '../data/cat';
import { useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function jqfn(){
    $(()=>{

    });
}
function Search(){

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


    return(
        <>
            {/* 모듈코드 */}
            <section className='schbx'>
                <div className='schopt'>
                    <div className='searching'>
                        <FontAwesomeIcon icon={faSearch} fade className='schbtn' title='Open Search' onClick={schList}/>
                        <input id='schin' type='text' placeholder='Filter by Keyword' onKeyDown={enterKey}/>
                    </div>
                </div>
                <div className='listbx'>
                    <h2 className='restit'>
                        BROWSE CHARACTERS({tot})
                    </h2>
                    <aside className='sortbx'>
                        <select className='sel' name='sel' id='sel' onChange={sortList}>
                            <option value="0">A-Z</option>
                            <option value="1">Z-A</option>
                        </select>
                    </aside>
                    <CatList dt={sdt[0]}/>
                </div>
            </section>
            {jqfn()}
        </>
    );
}

export default Search;