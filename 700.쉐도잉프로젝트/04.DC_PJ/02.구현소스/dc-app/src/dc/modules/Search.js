import $ from 'jquery';
import '../css/search.css'
import CatList from './CatList';
import cat_data from '../data/cat';
import { useState } from 'react';

function jqfn(){
    $(()=>{

    });
}
function Search(){

        //  데이터 선택하기
    let [sdt, setSdt] = useState(cat_data);


    return(
        <>
            {/* 모듈코드 */}
            <section className='schbx'>
                <div className='schopt'>

                </div>
                <div className='listbx'>
                    <h2 className='restit'>
                        BROWSE CHARACTERS
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