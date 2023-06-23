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
    let [sdt, setSdt] = useState(cat_data);
    //  데이터  건수
    let [tot, setTot] =useState(cat_data.length)

    // 데이터 검색 함수
    const schList = ()=>{
        let inp  = document.querySelector("#schin");
        let keyword = inp.value;
        // 1.검색어 읽기
    }


    return(
        <>
            {/* 모듈코드 */}
            <section className='schbx'>
                <div className='schopt'>
                    <div className='searching'>
                        <FontAwesomeIcon icon={faSearch} fade className='schbtn' title='Open Search' onClick={schList}/>
                        <input id='schin' type='text' placeholder='Filter by Keyword' />
                    </div>
                </div>
                <div className='listbx'>
                    <h2 className='restit'>
                        BROWSE CHARACTERS({tot})
                    </h2>
                    <aside className='sortbx'>

                    </aside>
                    <CatList dt={sdt}/>
                </div>
            </section>
            {jqfn()}
        </>
    );
}

export default Search;