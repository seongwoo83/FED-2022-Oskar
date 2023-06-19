import $ from 'jquery';
import './css/detail.css'
import { useLocation } from 'react-router-dom';

// 라우터 파라미터값 받아서 데이터 처리

function jqfn(){
    $(()=>{

    });
}
function Detail(props){
    /* 라우터 전달값을 받기위한 useLocation 생성하기' */
    const loc = useLocation();
    const cname = loc.state.cname;
    let cdesc = loc.state.cdesc;
    cdesc = cdesc.split("^");
    const facts = loc.state.facts;
    return(
        <>
            {/* 모듈코드 */}
            <h2>나는 {cname}상세 페이지</h2>
            <div className='cdesc'>
                {
                    cdesc.map(v=><p>{v}</p>)
                }
            </div>
            <div className='facts'>
                <h3>CHARACTER FACTS</h3>
                {facts}
            </div>
            {jqfn()}
        </>
    );
}

export default Detail;