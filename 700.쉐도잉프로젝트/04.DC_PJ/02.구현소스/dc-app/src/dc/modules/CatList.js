import $ from 'jquery';
import '../css/catlist.css'

function jqfn(){
    $(()=>{

    });
}
function CatList(props){
    
    let sdt = props.dt;


    return(
        <>
            {/* 모듈코드 */}
            <ul className='clist'>
                {
                    sdt.map((v,i)=>{
                        return(
                            <li key={i}>
                                <img src={v.tmsrc} alt={v.cname} />
                                <h3>{v.cname}</h3>
                            </li>
                        )
                    })
                }
            </ul>
            {jqfn()}
        </>
    );
}

export default CatList;