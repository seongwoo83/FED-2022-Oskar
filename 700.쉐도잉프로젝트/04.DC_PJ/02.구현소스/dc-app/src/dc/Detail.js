import $ from 'jquery';
import './css/detail.css'
import { useLocation } from 'react-router-dom';
import Ban from './modules/ban';

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
    let facts = loc.state.facts;
    facts = facts.split("^");
    return(
        <>
            {/* 모듈코드 */}
            <Ban cat={cname} />
            <div className='detail'>
                <div className='descbx'>
                    <h2>{cname}</h2>
                    <div className='cdesc'>
                        {
                            cdesc.map((v,i)=><p key={i}>{v}</p>)
                        }
                    </div>
                </div>
                <div className='facts'>
                    <div>
                        <h3>CHARACTER FACTS</h3>
                        <table>
                            <tbody>
                                {
                                    facts.map((v,i)=>{
                                        return(
                                            <tr key={i}>
                                                <th>{v.split(":")[0]}:</th>
                                                <td>{v.split(":")[1]}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {jqfn()}
        </>
    );
}

export default Detail;