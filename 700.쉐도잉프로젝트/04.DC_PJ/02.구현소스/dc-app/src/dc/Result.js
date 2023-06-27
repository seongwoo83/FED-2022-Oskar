import $ from 'jquery';
import './css/result.css'
import Search from './modules/Search';
import { useLocation } from 'react-router-dom';

function jqfn(){
    $(()=>{

    });
}
function Result(){
    const loc = useLocation();
    const kw = loc.state.keyword;
    console.log(kw);
    return(
        <>
            {/* 모듈코드 */}
            <h2>Search Result</h2>
            <Search skw={kw}/>
            {jqfn()}
        </>
    );
}

export default Result;