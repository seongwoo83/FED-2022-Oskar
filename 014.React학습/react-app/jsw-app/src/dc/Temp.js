import $ from 'jquery';
import './css/temp.css'

function jqfn(){
    $(()=>{

    });
}
function Temp(){
    return(
        <>
            {/* 모듈코드 */}
            {jqfn()}
        </>
    );
}

export default Temp;